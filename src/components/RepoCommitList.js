import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format } from 'timeago.js';
import { Flex, Box, Text } from './blocks';

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 2px;
`;

const CommitLink = styled.a`
  color: ${p => p.theme.colors.text.black[2]};
  &:hover {
    text-decoration: underline;
  }
`;

const pluralizeChangedFiles = changedFiles => {
  if (changedFiles === 1) return `Changed 1 file`;
  return `Changed ${changedFiles} files`;
};

function RepoCommitListItem({ orgName, repoName, commit }) {
  return (
    <Flex
      py={4}
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid transparent"
      borderColor="fill.black.3"
    >
      <Flex width="280px" alignItems="center">
        <Avatar src={commit.author.avatarUrl} />
        <Text ml={2}>{commit.author.name}</Text>
        <Text typeface="caption" ml={3}>
          {pluralizeChangedFiles(commit.numChangedFiles)}
        </Text>
      </Flex>
      <Box textAlign="left" flexGrow={1} ml={2}>
        <CommitLink
          target="_blank"
          href={`https://github.com/${orgName}/${repoName}/commit/${commit.id}`}
        >
          {commit.message}
        </CommitLink>
      </Box>
      <Box textAlign="right">
        <Text color="text.black.2">{format(new Date(commit.date))}</Text>
      </Box>
    </Flex>
  );
}

function RepoCommitList({ repo }) {
  return (
    <Flex column bg="fill.white.0" px={8} pt={10}>
      <Flex alignItems="center" justifyContent="space-between" mb={10}>
        <Text typeface="headerLarge">Latest Commits</Text>
        <Box>
          Showing latest <Text fontWeight="semibold">{repo.commits.length}</Text> commits of{' '}
          <Text fontWeight="semibold">{repo.totalCommits}</Text> total
        </Box>
      </Flex>
      {repo.commits.map(c => (
        <RepoCommitListItem commit={c} orgName={repo.orgName} repoName={repo.name} key={c.id} />
      ))}
    </Flex>
  );
}

export const CommitPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  message: PropTypes.string,
  numChangedFiles: PropTypes.number,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
});

export const RepoPropTypes = PropTypes.shape({
  orgName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  totalCommits: PropTypes.number.isRequired,
  commits: PropTypes.arrayOf(CommitPropType).isRequired,
});

RepoCommitList.propTypes = {
  repo: RepoPropTypes.isRequired,
};

RepoCommitListItem.propTypes = {
  orgName: PropTypes.string.isRequired,
  repoName: PropTypes.string.isRequired,
  commit: CommitPropType.isRequired,
};

export default RepoCommitList;
