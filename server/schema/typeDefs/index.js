import { graphqlFileLoader } from "../../utils";

export default [
  graphqlFileLoader("../schema/typeDefs/base.graphql"),
  graphqlFileLoader("../schema/typeDefs/user.graphql")
];
