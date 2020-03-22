import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import get from 'lodash/get';

export const FETCH_LATEST_COMMITS = gql`
  query searchOrganizations($repoName: String!, $orgName: String!) {
    repository(name: $repoName, owner: $orgName) {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            id
            history(first: 30) {
              totalCount
              edges {
                node {
                  oid
                  changedFiles
                  messageHeadline
                  author {
                    name
                    date
                    avatarUrl
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

export default function useFetchLatestCommits(orgName, repoName) {
  const { loading, data } = useQuery(FETCH_LATEST_COMMITS, { variables: { orgName, repoName } });

  let repo = null;

  if (!loading && data && data.repository) {
    repo = {
      orgName,
      name: repoName,
      branch: 'master',
      totalCommits: get(data, 'repository.ref.target.history.totalCount'),
      commits: get(data, 'repository.ref.target.history.edges', [])
        .filter(c => c.node)
        .map(c => ({
          id: c.node.oid,
          author: c.node.author,
          date: c.node.author.date,
          message: c.node.messageHeadline,
          numChangedFiles: c.node.changedFiles,
        })),
    };
  }

  return { loading, repo };
}
