import React from 'react';
import PropTypes from 'prop-types';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `bearer 679e020bebe20352c9bfe1ad0a0f375c21645082`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function AppLibraryProviders({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

AppLibraryProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLibraryProviders;
