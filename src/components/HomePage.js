import React, { useEffect } from 'react';
import qs from 'qs';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { Flex, Box, Text } from './blocks';
import { useDebouncedState } from '../hooks';
import AppMaxWidth from './App/AppMaxWidth';
import useSearchOrganizations from './useSearchOrganizations';
import Organization from './Organization';

const StyledHomePage = styled.div`
  display: flex;
  padding-bottom: 50px;
  flex-direction: column;

  .search-bar-header {
    top: 80px;
    width: 100%;
    padding: 10px 0;
    position: sticky;
    background-color: ${p => p.theme.colors.fill.black[1]};
  }

  input {
    width: 100%;
    height: 50px;
    font-size: 24px;
    padding: 0px 20px;
    line-height: 50px;
    position: relative;
    border-style: none;
    font-family: inherit;
    &::placeholder {
      font-size: 1.5rem;
    }
  }
`;

function HomePage() {
  const history = useHistory();
  const { search } = useLocation();

  const { q } = qs.parse(search, { ignoreQueryPrefix: true });

  const [[searchQuery, debouncedSearchQuery], setSearchQuery] = useDebouncedState(q || '', 250);

  const { org, loading, handleSearch } = useSearchOrganizations();

  useEffect(() => {
    const normalized = debouncedSearchQuery.trim().toLowerCase();
    handleSearch(normalized);
    history.replace(`/?q=${normalized}`);
  }, [history.replace, debouncedSearchQuery]);

  const handleUpdateSearch = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <StyledHomePage>
      <div className="search-bar-header">
        <AppMaxWidth>
          <input
            type="search"
            value={searchQuery}
            onChange={handleUpdateSearch}
            placeholder="Search for an organization"
          />
        </AppMaxWidth>
      </div>
      <AppMaxWidth bg="fill.white.0" width="100%" minHeight="500px">
        <Flex column>
          {loading && (
            <Box p={10}>
              <Text typeface="headerLarge" color="text.black.3">
                Loading...
              </Text>
            </Box>
          )}
          {!loading && !org && (
            <Box p={10}>
              <Text typeface="headerLarge" color="text.black.3">
                {debouncedSearchQuery
                  ? `No results found for ${debouncedSearchQuery}`
                  : 'Search for something!'}
              </Text>
            </Box>
          )}
          {org && <Organization org={org} />}
        </Flex>
      </AppMaxWidth>
    </StyledHomePage>
  );
}

export default HomePage;
