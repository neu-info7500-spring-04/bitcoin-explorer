import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the GraphQL API
const httpLink = createHttpLink({
  uri: 'https://graphql.bitquery.io/',
});

// Middleware to attach the authorization token to requests
const authLink = setContext((_, { headers }) => {
  // Replace 'YOUR_API_KEY_HERE' with your actual API key
  const token = 'BQYhPGpQHJA2Dgac3Eb9ezp7zTLKxU0V';
  return {
    headers: {
      ...headers,
      'X-API-KEY': token,
    }
  };
});

// Create a temporary Apollo Client instance
const apolloClient1 = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Log the properties of the apolloClient1 instance
console.log('Apollo Client:', { ...apolloClient1 });

// Apollo Client instance
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// No need to export default apolloClient, as it's already exported as apolloClient
