import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import App from '../components/App';
import AppProviders from '../components/App/AppProviders';

function MockedProviders({ mocks, initialEntries, addTypename, initialIndex, children }) {
  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <MockedProvider mocks={mocks} addTypename={addTypename}>
        <AppProviders>
          <App>{children}</App>
        </AppProviders>
      </MockedProvider>
    </MemoryRouter>
  );
}

MockedProviders.propTypes = {
  addTypename: PropTypes.bool,
  initialIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
  mocks: PropTypes.arrayOf(PropTypes.object),
  initialEntries: PropTypes.arrayOf(PropTypes.string.isRequired),
};

MockedProviders.defaultProps = {
  mocks: [],
  initialIndex: 0,
  addTypename: true,
  initialEntries: ['/'],
};

export default MockedProviders;
