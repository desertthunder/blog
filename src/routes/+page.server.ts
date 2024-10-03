import { GITHUB_PERSONAL_ACCESS_TOKEN } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { GithubAPI } from '$lib';

export const load: PageServerLoad = async ({ fetch }) => {
	const data = {};

	const githubClient = GithubAPI.factory(fetch);

	githubClient.accessToken = GITHUB_PERSONAL_ACCESS_TOKEN;

	const repositories = await githubClient.getRepositories();
	const gists = await githubClient.getGists();
	const profile = await githubClient.getMyProfile();

	Object.assign(data, {
		repositories,
		gists,
		profile: profile.serialized
	});

	return {
		props: {
			data
		}
	};
};
