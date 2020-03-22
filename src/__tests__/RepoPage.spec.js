import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { Route } from 'react-router-dom';
import MockedProviders from '../testingDeps/MockedProviders';
import {
  mockFetchCommitsQuery,
  mockSearchOrganizationQuery,
} from '../testingDeps/apolloRequestObjects';
import HomePage from '../components/HomePage';
import RepoPage from '../components/RepoPage';

const renderComponent = (mockProps = {}) =>
  render(
    <MockedProviders {...mockProps}>
      <Route exact path="/" component={HomePage} />
      <Route path="/:orgName/:repoName" component={RepoPage} />
    </MockedProviders>,
  );

it(`links to the RepoPage when you click on a repo in the organization `, async () => {
  const container = renderComponent({
    initialEntries: ['/?q=netflix'], // start on the home page with a pre-loaded query
    mocks: [
      mockSearchOrganizationQuery({ query: 'netflix' }),
      mockFetchCommitsQuery({ orgName: 'Netflix', repoName: 'Hystrix' }),
    ],
  });

  await wait();

  // click the link to view the repo
  fireEvent.click(container.getByText('Hystrix'));

  await wait();

  expect(container.getByText('Latest Commits')).toBeInTheDocument();
});

it(`has a loading state`, async () => {
  const container = renderComponent({
    initialEntries: ['/XXXX/Hystrix'],
    mocks: [mockFetchCommitsQuery({ orgName: 'Netflix', repoName: 'Hystrix' })],
  });

  expect(container.getByText(/loading/i));

  await wait();
});

it(`will tell the user when that org/repo combination was a 404`, async () => {
  const container = renderComponent({
    initialEntries: ['/XXXX/Hystrix'],
    mocks: [mockFetchCommitsQuery({ orgName: 'Netflix', repoName: 'Hystrix' })],
  });

  await wait();

  expect(container.getByText(/does not exist/i));
});

it(`lists some metadata about the latest commits`, async () => {
  const container = renderComponent({
    initialEntries: ['/Netflix/Hystrix'],
    mocks: [mockFetchCommitsQuery({ orgName: 'Netflix', repoName: 'Hystrix' })],
  });

  await wait();

  expect(container.getByText('2')).toBeInTheDocument();
  expect(container.getByText('2109')).toBeInTheDocument();
});

it(`lists out the latest commits`, async () => {
  const container = renderComponent({
    initialEntries: ['/Netflix/Hystrix'],
    mocks: [mockFetchCommitsQuery({ orgName: 'Netflix', repoName: 'Hystrix' })],
  });

  await wait();

  expect(container.getByText('Tim Bozarth')).toBeInTheDocument();
  expect(container.getByText('Changed 2 files')).toBeInTheDocument();
  expect(
    container.getByText(/Merge pull request #1904 from Netflix\/qiangdavidliu-update-hystrix-st/),
  ).toBeInTheDocument();

  expect(container.getByText('David Liu')).toBeInTheDocument();
  expect(container.getByText('Update OSSMETADATA')).toBeInTheDocument();
  expect(container.getByText('Changed 1 file')).toBeInTheDocument();
});

it(`has breadcrumbs that take you back to the home page`, async () => {
  const container = renderComponent({
    initialEntries: ['/Netflix/Hystrix'],
    mocks: [
      mockSearchOrganizationQuery({ query: 'netflix', noData: true }),
      mockFetchCommitsQuery({ orgName: 'Netflix', repoName: 'Hystrix' }),
    ],
  });

  await wait();

  fireEvent.click(container.getByText('Netflix'));

  await wait();

  // home page screen
  // even though this route would take us to /?q=netflix, we're going to mock the query
  // such that it returns no search results. Just gives us something more obvious to assert on.
  expect(container.getByText(/no results/i)).toBeInTheDocument();
});
