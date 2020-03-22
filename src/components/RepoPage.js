import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AppMaxWidth from './App/AppMaxWidth';
import { Flex, Box, Text } from './blocks';
import useFetchLatestCommits from './useFetchLatestCommits';
import RepoCommitList, { RepoPropTypes } from './RepoCommitList';

function Breadcrumbs({ repo }) {
  return (
    <Flex fontSize={5} mb={10}>
      <Link to={`/?q=${repo.orgName}`}>
        <Text typeface="link">{repo.orgName}</Text>
      </Link>
      <Text mx={1}>/</Text>
      <Text>{repo.name}</Text>
    </Flex>
  );
}

Breadcrumbs.propTypes = {
  repo: RepoPropTypes.isRequired,
};

function RepoPage() {
  const { orgName, repoName } = useParams();
  const { repo, loading } = useFetchLatestCommits(orgName, repoName);

  return (
    <AppMaxWidth>
      {loading && (
        <Box p={6}>
          <Text typeface="headerLarge" color="text.black.3">
            Loading...
          </Text>
        </Box>
      )}
      {!loading && !repo && (
        <Box p={6}>
          <Text typeface="headerLarge" color="text.black.3">
            {orgName}/{repoName} does not exist
          </Text>
        </Box>
      )}
      {repo && (
        <Flex column width="100%" py={10} px={5}>
          <Breadcrumbs repo={repo} />
          <RepoCommitList repo={repo} />
        </Flex>
      )}
    </AppMaxWidth>
  );
}

export default RepoPage;
