import { GITHUB_PERSONAL_ACCESS_TOKEN } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { GithubAPI, GithubGraphQL } from '$lib';
import type { SerializedREADME } from '$lib/services/github/api';
import type { PinnedRepository } from '$lib/services/github/graphql';

const ghGraphQL = GithubGraphQL.factory(GITHUB_PERSONAL_ACCESS_TOKEN);
type Data = {
	readme: SerializedREADME;
	pinned: Array<PinnedRepository>;
};
export const load: PageServerLoad = async ({ fetch }) => {
	const githubClient = GithubAPI.factory(fetch, GITHUB_PERSONAL_ACCESS_TOKEN);

	const readme = await githubClient.getProfileREADME();
	const pinned = await ghGraphQL.getPinnedRepositories();

	const data: Data = {
		readme: readme.serialized,
		pinned
	};

	return data;
};
