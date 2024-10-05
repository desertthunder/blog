// Github GraphQL HTTP client
import { Client, fetchExchange, gql } from '@urql/core';

export class GithubGraphQL {
	private constructor(
		private client: Client,
		private token: string
	) {}

	static factory(token: string): GithubGraphQL {
		const client = new Client({
			url: 'https://api.github.com/graphql',
			exchanges: [fetchExchange],
			fetchOptions: () => ({
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
		});

		return new GithubGraphQL(client, token);
	}

	async getPinnedRepositories() {
		const query = gql`
			query {
				viewer {
					login
					name
					location
					pinnedItems(first: 6) {
						nodes {
							... on Repository {
								name
								url
								repositoryTopics(first: 5) {
									nodes {
										... on RepositoryTopic {
											id
											topic {
												name
											}
											url
										}
									}
								}
							}
						}
					}
				}
			}
		`;

		const response = await this.client.query(query, {}).toPromise();

		if (response.error) {
			throw new Error('Failed to fetch data');
		}

		return response.data.viewer.pinnedItems.nodes;
	}

	set accessToken(token: string) {
		this.token = token;
	}
}
