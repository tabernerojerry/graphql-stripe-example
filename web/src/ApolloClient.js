import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";

const endpointURL = "http://localhost:4000/graphql";

const client = new ApolloClient({
  link: new HttpLink({
    uri: endpointURL,
    credentials: "include"
  }),
  cache: new InMemoryCache()
});

export default client;
