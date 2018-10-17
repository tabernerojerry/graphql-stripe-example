import controller from "../../controllers";

export default {
  Query: {
    me: (_, __, { session }) => controller.user.me(session)
  },
  Mutation: {
    register: async (_, { input }) => await controller.user.register(input),

    login: async (_, { input }, { session }) =>
      await controller.user.login(input, session),

    createSubscription: async (_, { source, cclast4 }, { session }) =>
      await controller.user.createSubscription({ source, cclast4, session }),

    changeCreditCard: async (_, { source, cclast4 }, { session }) =>
      await controller.user.changeCreditCard({ source, cclast4, session }),

    cancelSubscription: async (_, __, { session }) =>
      await controller.user.cancelSubscription(session)
  }
};

// NEXT : 4
