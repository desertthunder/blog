import { GITHUB_PERSONAL_ACCESS_TOKEN } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { GithubAPI, GithubGraphQL } from '$lib';

const ghGraphQL = GithubGraphQL.factory(GITHUB_PERSONAL_ACCESS_TOKEN);

export const load: PageServerLoad = async ({ fetch }) => {
	const data = {};

	const githubClient = GithubAPI.factory(fetch, GITHUB_PERSONAL_ACCESS_TOKEN);

	const readme = await githubClient.getProfileREADME();
	const pinned = await ghGraphQL.getPinnedRepositories();

	Object.assign(data, {
		readme,
		pinned
	});

	console.log(data);

	return {
		props: {
			data
		}
	};
};
