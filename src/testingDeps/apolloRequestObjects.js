import { SEARCH_ORGANIZATIONS } from '../components/useSearchOrganizations';
import { FETCH_LATEST_COMMITS } from '../components/useFetchLatestCommits';

const mockSearchOrganizationQuery = ({ query, noData = false }) => ({
  request: {
    query: SEARCH_ORGANIZATIONS,
    variables: {
      query,
    },
  },
  result: {
    data: {
      search: {
        edges: noData
          ? []
          : [
              {
                node: {
                  login: 'Netflix',
                  location: 'Los Gatos, California',
                  membersWithRole: {
                    totalCount: 13,
                    __typename: 'OrganizationMemberConnection',
                  },
                  repositories: {
                    totalCount: 179,
                    nodes: [
                      {
                        name: 'Hystrix',
                        forks: {
                          totalCount: 3853,
                          __typename: 'RepositoryConnection',
                        },
                        stargazers: {
                          totalCount: 19284,
                          __typename: 'StargazerConnection',
                        },
                        ref: {
                          target: {
                            author: {
                              date: '2018-11-19T14:20:36-08:00',
                              __typename: 'GitActor',
                            },
                            __typename: 'Commit',
                          },
                          __typename: 'Ref',
                        },
                        __typename: 'Repository',
                      },
                    ],
                    __typename: 'RepositoryConnection',
                  },
                  __typename: 'Organization',
                },
                __typename: 'SearchResultItemEdge',
              },
            ],
        __typename: 'SearchResultItemConnection',
      },
    },
  },
});

const mockFetchCommitsQuery = ({ orgName, repoName }) => ({
  request: {
    query: FETCH_LATEST_COMMITS,
    variables: {
      orgName,
      repoName,
    },
  },
  result: {
    data: {
      repository: {
        ref: {
          target: {
            id: 'MDY6Q29tbWl0Njc2NjU1ODozY2IyMTU4OTg5NWU5ZjhmODdjZmNkYmM5ZDk2ZDlmNjNkNDhiODQ4',
            history: {
              totalCount: 2109,
              edges: [
                {
                  node: {
                    oid: '3cb21589895e9f8f87cfcdbc9d96d9f63d48b848',
                    changedFiles: 2,
                    messageHeadline:
                      'Merge pull request #1904 from Netflix/qiangdavidliu-update-hystrix-st…',
                    author: {
                      name: 'Tim Bozarth',
                      date: '2018-11-19T14:20:36-08:00',
                      avatarUrl: 'https://avatars1.githubusercontent.com/u/2118232?v=4',
                      __typename: 'GitActor',
                    },
                    __typename: 'Commit',
                  },
                  __typename: 'CommitEdge',
                },
                {
                  node: {
                    oid: 'c0aae119c00e2af24015eee8266a7882a89daa58',
                    changedFiles: 1,
                    messageHeadline: 'Update OSSMETADATA',
                    author: {
                      name: 'David Liu',
                      date: '2018-11-19T14:19:00-08:00',
                      avatarUrl: 'https://avatars1.githubusercontent.com/u/6243760?v=4',
                      __typename: 'GitActor',
                    },
                    __typename: 'Commit',
                  },
                  __typename: 'CommitEdge',
                },
              ],
              __typename: 'CommitHistoryConnection',
            },
            __typename: 'Commit',
          },
          __typename: 'Ref',
        },
        __typename: 'Repository',
      },
    },
  },
});

export { mockSearchOrganizationQuery, mockFetchCommitsQuery };
