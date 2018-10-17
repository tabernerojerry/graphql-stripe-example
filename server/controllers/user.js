import bcrypt from "bcryptjs";

import model from "../models";
import { stripe } from "../config";

export default {
  me: async session => {
    if (!session.userId) {
      throw new Error("Unauthorized");
    }

    const user = await model.User.findById(session.userId);

    return user;
  },

  register: async input => {
    // Hashed Password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    await model.User.create({
      ...input,
      password: hashedPassword
    });

    return true;
  },

  login: async (input, session) => {
    const user = await model.User.findOne({ email: input.email });
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      return null;
    }

    session.userId = user._id;

    return user;
  },

  createSubscription: async ({ source, cclast4, session }) => {
    if (!session || !session.userId) {
      throw new Error("Not Authenticated!");
    }

    const user = await model.User.findById(session.userId);

    if (!user) {
      throw new Error("User not found!");
    }

    let stripeId = user.stripeId;

    // Stripe Create User Subscription
    if (!stripeId) {
      const customer = await stripe.customers.create({
        email: user.email,
        source,
        plan: process.env.STRIPE_PLAN
      });
      stripeId = customer.id;
    } else {
      // Stripe Update User Subscription
      await stripe.customers.update(stripeId, {
        source
      });

      await stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            plan: process.env.STRIPE_PLAN
          }
        ]
      });
    }

    const userPlan = {
      stripeId,
      cclast4,
      type: "paid"
    };

    const updatedUser = await model.User.findByIdAndUpdate(
      { _id: user._id },
      { $set: userPlan },
      { new: true }
    );

    return updatedUser;
  },

  changeCreditCard: async ({ source, cclast4, session }) => {
    if (!session || !session.userId) {
      throw new Error("Not Authenticated!");
    }

    const user = await model.User.findById(session.userId);

    // if no user or user no record stripeId or user type subscription is not paid. No need to update the user stripe credit card
    if (!user || !user.stripeId || user.type !== "paid") {
      throw new Error();
    }

    // Stripe Update User Credit Card
    await stripe.customers.update(user.stripeId, { source });

    const updatedUser = await model.User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: { cclast4 }
      },
      { new: true }
    );

    return updatedUser;
  },

  cancelSubscription: async session => {
    if (!session || !session.userId) {
      throw new Error("Not Authenticated!");
    }

    const user = await model.User.findById(session.userId);

    // if no user or user no record stripeId or user type subscription is not paid. No need to update the user stripe credit card
    if (!user || !user.stripeId || user.type !== "paid") {
      throw new Error();
    }

    // Retrieve user stripe account
    const stripeCustomer = await stripe.customers.retrieve(user.stripeId);

    // Get user stripe subscription
    const [subscription] = await stripeCustomer.subscriptions.data;

    // Delete user stripe subscription
    await stripe.subscriptions.del(subscription.id);

    // Delete user stripe credit card
    await stripe.customers.deleteCard(
      user.stripeId,
      stripeCustomer.default_source
    );

    // update user subscription type to DB
    const updatedUser = await model.User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: { type: "free-trials" }
        //$unset: { stripeId: "" }
      },
      { new: true }
    );

    return updatedUser;
  }
};
