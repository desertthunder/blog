import type { LayoutLoad } from './$types';
import { GITHUB_PERSONAL_ACCESS_TOKEN } from '$env/static/private';
import { GithubGraphQL } from '$lib';
import type { PinnedRepository } from '$lib/services/github/graphql';

const ghGraphQL = GithubGraphQL.factory(GITHUB_PERSONAL_ACCESS_TOKEN);

type Data = {
	pinned: Array<PinnedRepository>;
};

export const load: LayoutLoad = async () => {
	const pinned = await ghGraphQL.getPinnedRepositories();

	const data: Data = {
		pinned
	};

	return data;
};
