import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { Route } from 'react-router-dom';
import MockedProviders from '../testingDeps/MockedProviders';
import { mockSearchOrganizationQuery } from '../testingDeps/apolloRequestObjects';
import HomePage from '../components/HomePage';

const renderComponent = (mockProps = {}) =>
  render(
    <MockedProviders {...mockProps}>
      <Route exact path="/" component={HomePage} />
    </MockedProviders>,
  );

it(`tells you to search when there are no results`, async () => {
  const container = renderComponent();

  await wait();

  expect(container.getByText(/search for something/i)).toBeInTheDocument();
});

it(`says there are no results when you searched for an org that doesn't exist`, async () => {
  const container = renderComponent({ mocks: [mockSearchOrganizationQuery({ query: 'netflix' })] });

  const searchBar = container.getByPlaceholderText('Search for an organization');

  fireEvent.change(searchBar, { target: { value: 'netfl' } });

  expect(container.getByText(/Loading/i)).toBeInTheDocument();

  await wait();

  expect(container.queryByText('Netflix')).not.toBeInTheDocument();
  expect(container.getByText(/no results/i)).toBeInTheDocument();
});

it(`returns a result when you enter a real github org`, async () => {
  const container = renderComponent({ mocks: [mockSearchOrganizationQuery({ query: 'netflix' })] });

  const searchBar = container.getByPlaceholderText('Search for an organization');

  fireEvent.change(searchBar, { target: { value: 'netflix' } });

  expect(container.getByText(/loading/i)).toBeInTheDocument();

  await wait();

  // org metadata
  expect(container.getByText('Netflix')).toBeInTheDocument();
  expect(container.getByText('Los Gatos, California')).toBeInTheDocument();
  expect(container.getByText('13 members')).toBeInTheDocument();
  expect(container.getByText('179')).toBeInTheDocument();

  // top repo result
  expect(container.getByText('Hystrix')).toBeInTheDocument();
  expect(container.getByText('19284')).toBeInTheDocument();
  expect(container.getByText('3853')).toBeInTheDocument();
  expect(container.getByText('Last commit 1 year ago')).toBeInTheDocument();
});

it(`has a case insensitive search that ignores whitespace`, async () => {
  const container = renderComponent({ mocks: [mockSearchOrganizationQuery({ query: 'netflix' })] });

  const searchBar = container.getByPlaceholderText('Search for an organization');

  fireEvent.change(searchBar, { target: { value: '   NeTfLiX   ' } });

  await wait();

  expect(container.getByText('Netflix')).toBeInTheDocument();
});

it(`can take a query from the URL bar and search that automatically`, async () => {
  const container = renderComponent({
    initialEntries: ['/?q=netflix'],
    mocks: [mockSearchOrganizationQuery({ query: 'netflix' })],
  });

  await wait();

  expect(container.getByText('Netflix')).toBeInTheDocument();
});
