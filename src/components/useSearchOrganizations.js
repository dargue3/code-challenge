import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import get from 'lodash/get';

export const SEARCH_ORGANIZATIONS = gql`
  query searchOrganizations($query: String!) {
    search(first: 1, query: $query, type: USER) {
      edges {
        node {
          ... on Organization {
            login
            location
            membersWithRole {
              totalCount
            }
            repositories(first: 20, orderBy: { field: STARGAZERS, direction: DESC }) {
              totalCount
              nodes {
                ... on Repository {
                  name
                  forks {
                    totalCount
                  }
                  stargazers {
                    totalCount
                  }
                  ref(qualifiedName: "master") {
                    target {
                      ... on Commit {
                        author {
                          date
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function useSearchOrganizations() {
  const [fireQuery, { loading, data }] = useLazyQuery(SEARCH_ORGANIZATIONS);

  const handleSearch = searchQuery => {
    fireQuery({ variables: { query: searchQuery } });
  };

  const org = get(data, 'search.edges', [])
    .filter(o => o.node.login)
    .map(o => ({
      orgName: o.node.login,
      location: o.node.location,
      totalMembers: o.node.membersWithRole.totalCount,
      totalNumRepos: get(o, 'node.repositories.totalCount', 0),
      repos: get(o, 'node.repositories.nodes', []).map(r => ({
        name: r.name,
        totalForks: r.forks.totalCount,
        totalStars: r.stargazers.totalCount,
        lastCommit: get(r, 'ref.target.author.date'),
      })),
    }))[0];

  return { org, handleSearch, loading };
}
