import type { LayoutLoad } from './$types';
import { GITHUB_PERSONAL_ACCESS_TOKEN } from '$env/static/private';
import { GithubGraphQL } from '$lib';

const ghGraphQL = GithubGraphQL.factory(GITHUB_PERSONAL_ACCESS_TOKEN);

type Data = {
	pinned: Array<{
		name: string;
		url: string;
		topics: Array<{
			name: string;
			url: string;
		}>;
	}>;
};

export const load: LayoutLoad = async () => {
	const pinned = await ghGraphQL.getPinnedRepositories();

	const data: Data = {
		pinned
	};
	console.log(pinned);
	return data;
};
