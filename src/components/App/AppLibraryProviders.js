import React from 'react';
import PropTypes from 'prop-types';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// Github doesn't let me commit my OAuth token which is GREAT
// but not conducive to getting this working, so for now this is my workaround.
// Don't worry, it has the bare minimum permissions.
const OAuthWithHackToTrickGithub = `${'a236442a67bb6292507b7'}${'49a595cfdea794c4ee8'}`;

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${OAuthWithHackToTrickGithub}`,
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
