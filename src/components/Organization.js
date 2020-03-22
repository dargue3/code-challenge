import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { Flex, Box, Text } from './blocks';
import StarIcon from './StarIcon';
import ForkIcon from './ForkIcon';
import MapPinIcon from './MapPinIcon';

function OrganizationHeader({ org }) {
  return (
    <Flex
      py={6}
      px={10}
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid transparent"
      borderColor="fill.black.3"
    >
      <Flex column>
        <Text typeface="headerLarge">{org.orgName}</Text>
        <Flex alignItems="center">
          <MapPinIcon />
          <Text typeface="caption" ml={1}>
            {org.location}
          </Text>
          <Text typeface="caption" ml={5}>
            {org.totalMembers} members
          </Text>
        </Flex>
      </Flex>
      <Box>
        Showing top <Text fontWeight="semibold">{org.repos.length}</Text> of{' '}
        <Text fontWeight="semibold">{org.totalNumRepos}</Text> repos. Sorted by number of stars.
      </Box>
    </Flex>
  );
}

function RepoListItem({ org, repo }) {
  return (
    <Flex
      py={6}
      px={10}
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid transparent"
      borderColor="fill.black.3"
      key={repo.name}
    >
      <Flex column>
        <Link to={`/${org.orgName}/${repo.name}`}>
          <Text typeface="link" fontSize={5}>
            {repo.name}
          </Text>
        </Link>
        <Flex mt={4}>
          <Flex alignItems="center">
            <StarIcon />
            <Text ml={2}>{repo.totalStars}</Text>
          </Flex>
          <Flex alignItems="center" ml={10}>
            <ForkIcon />
            <Text ml={2}>{repo.totalForks}</Text>
          </Flex>
        </Flex>
      </Flex>
      {repo.lastCommit && (
        <Text color="text.black.3">Last commit {format(new Date(repo.lastCommit))}</Text>
      )}
    </Flex>
  );
}

function Organization({ org }) {
  return (
    <Flex column>
      <OrganizationHeader org={org} />
      {org.repos.map(r => (
        <RepoListItem org={org} repo={r} key={r.name} />
      ))}
    </Flex>
  );
}

const RepoPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  totalForks: PropTypes.number,
  totalStars: PropTypes.number,
  lastCommit: PropTypes.string,
});

const OrgPropTypes = PropTypes.shape({
  orgName: PropTypes.string.isRequired,
  location: PropTypes.string,
  totalMembers: PropTypes.number,
  totalNumRepos: PropTypes.number.isRequired,
  repos: PropTypes.arrayOf(RepoPropTypes).isRequired,
});

RepoListItem.propTypes = {
  org: OrgPropTypes.isRequired,
  repo: RepoPropTypes.isRequired,
};

OrganizationHeader.propTypes = {
  org: OrgPropTypes.isRequired,
};

Organization.propTypes = {
  org: OrgPropTypes.isRequired,
};

export default Organization;
