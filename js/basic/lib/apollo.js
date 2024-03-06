import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";


const link = new ApolloLink((operation, forward) =>
forward(operation).map(response => {
  if (response.data) {
    response.data.extensions = response.extensions
  }
  return response
})
).concat(new HttpLink({
  uri: `https://diarmuid.wpengine.com/graphql`,
  useGETForQueries: true,
}),)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});
