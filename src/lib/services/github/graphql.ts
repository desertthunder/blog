// Github GraphQL HTTP client
import { Client, fetchExchange, gql } from '@urql/core';

export type PinnedRepository = {
	name: string;
	url: string;
	topics: Array<{
		name: string;
		url: string;
	}>;
};

export class GithubGraphQL {
	private constructor(private client: Client) {}

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

		return new GithubGraphQL(client);
	}

	async getPinnedRepositories(): Promise<Array<PinnedRepository>> {
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

		const pinned = response.data.viewer.pinnedItems.nodes.map((node: any) => {
			return {
				name: node.name,
				url: node.url,
				topics: node.repositoryTopics.nodes.map((topic: any) => {
					return {
						name: topic.topic.name,
						url: topic.url
					};
				})
			};
		});

		return pinned as Array<PinnedRepository>;
	}
}
