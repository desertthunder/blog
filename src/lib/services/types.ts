import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export type FetchFn = typeof globalThis.fetch;

export enum Constants {
	API_VERSION = '2022-11-28',
	BASE_URL = 'https://api.github.com'
}

/**
 * Github API Endpoints
 */
export enum GithubAPIEndpoints {
	ROOT = '',
	CURRENT_USER = 'user',
	GISTS = 'gists',
	REPOSITORIES = 'user/repos',
	STARRED = 'user/starred',
	STARRED_GISTS = 'gists/starred'
}

export type RepoPermissions = {
	admin: boolean;
	maintain: boolean;
	push: boolean;
	triage: boolean;
	pull: boolean;
};

export type RepoOwner = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
};

export type Repository = {
	id: number;
	node_id: string;
	name: string;
	full_name: string;
	private: boolean;
	owner: RepoOwner;
	html_url: string;
	description: string | null;
	fork: boolean;
	url: string;
	forks_url: string;
	keys_url: string;
	collaborators_url: string;
	teams_url: string;
	hooks_url: string;
	issue_events_url: string;
	events_url: string;
	assignees_url: string;
	branches_url: string;
	tags_url: string;
	blobs_url: string;
	git_tags_url: string;
	git_refs_url: string;
	trees_url: string;
	statuses_url: string;
	languages_url: string;
	stargazers_url: string;
	contributors_url: string;
	subscribers_url: string;
	subscription_url: string;
	commits_url: string;
	git_commits_url: string;
	comments_url: string;
	issue_comment_url: string;
	contents_url: string;
	compare_url: string;
	merges_url: string;
	archive_url: string;
	downloads_url: string;
	issues_url: string;
	pulls_url: string;
	milestones_url: string;
	notifications_url: string;
	labels_url: string;
	releases_url: string;
	deployments_url: string;
	created_at: string;
	updated_at: string;
	pushed_at: string;
	git_url: string;
	ssh_url: string;
	clone_url: string;
	svn_url: string;
	homepage: string | null;
	size: number;
	stargazers_count: number;
	watchers_count: number;
	language: string | null;
	has_issues: boolean;
	has_projects: boolean;
	has_downloads: boolean;
	has_wiki: boolean;
	has_pages: boolean;
	has_discussions: boolean;
	forks_count: number;
	mirror_url: string | null;
	archived: boolean;
	disabled: boolean;
	open_issues_count: number;
	license: string | null;
	allow_forking: boolean;
	is_template: boolean;
	web_commit_signoff_required: boolean;
	topics: string[];
	visibility: string;
	forks: number;
	open_issues: number;
	watchers: number;
	default_branch: string;
	permissions: RepoPermissions;
};

export type SerializedUser = Record<
	keyof Omit<
		User,
		| 'formatCreatedAt'
		| 'formatUpdatedAt'
		| 'getCreatedAtRelative'
		| 'getUpdatedAtRelative'
		| 'serialized'
	>,
	string | number | boolean | null
>;

export class User {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string | null;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	name: string | null;
	company: string | null;
	blog: string;
	location: string | null;
	email: string | null;
	hireable: boolean | null;
	bio: string | null;
	twitter_username: string | null;
	notification_email: string | null;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(data: any) {
		this.login = data.login;
		this.id = data.id;
		this.node_id = data.node_id;
		this.avatar_url = data.avatar_url;
		this.gravatar_id = data.gravatar_id || null;
		this.url = data.url;
		this.html_url = data.html_url;
		this.followers_url = data.followers_url;
		this.following_url = data.following_url;
		this.gists_url = data.gists_url;
		this.starred_url = data.starred_url;
		this.subscriptions_url = data.subscriptions_url;
		this.organizations_url = data.organizations_url;
		this.repos_url = data.repos_url;
		this.events_url = data.events_url;
		this.received_events_url = data.received_events_url;
		this.type = data.type;
		this.site_admin = data.site_admin;
		this.name = data.name || null;
		this.company = data.company || null;
		this.blog = data.blog;
		this.location = data.location || null;
		this.email = data.email || null;
		this.hireable = data.hireable || null;
		this.bio = data.bio || null;
		this.twitter_username = data.twitter_username || null;
		this.notification_email = data.notification_email || null;
		this.public_repos = data.public_repos;
		this.public_gists = data.public_gists;
		this.followers = data.followers;
		this.following = data.following;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
	}

	static formatDateString(date: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
		return dayjs(date).format(format);
	}

	static dateFromNow(date: string): string {
		return dayjs(date).fromNow();
	}

	static serialize(data: User): SerializedUser {
		return data.serialized;
	}

	get serialized(): SerializedUser {
		return {
			login: this.login,
			id: this.id,
			node_id: this.node_id,
			avatar_url: this.avatar_url,
			gravatar_id: this.gravatar_id,
			url: this.url,
			html_url: this.html_url,
			followers_url: this.followers_url,
			following_url: this.following_url,
			gists_url: this.gists_url,
			starred_url: this.starred_url,
			subscriptions_url: this.subscriptions_url,
			organizations_url: this.organizations_url,
			repos_url: this.repos_url,
			events_url: this.events_url,
			received_events_url: this.received_events_url,
			type: this.type,
			site_admin: this.site_admin,
			name: this.name,
			company: this.company,
			blog: this.blog,
			location: this.location,
			email: this.email,
			hireable: this.hireable,
			bio: this.bio,
			twitter_username: this.twitter_username,
			notification_email: this.notification_email,
			public_repos: this.public_repos,
			public_gists: this.public_gists,
			followers: this.followers,
			following: this.following,
			created_at: this.created_at,
			updated_at: this.updated_at
		};
	}

	formatCreatedAt(): string {
		return User.formatDateString(this.created_at);
	}

	formatUpdatedAt(): string {
		return User.formatDateString(this.updated_at);
	}

	getCreatedAtRelative(): string {
		return User.dateFromNow(this.created_at);
	}

	getUpdatedAtRelative(): string {
		return User.dateFromNow(this.updated_at);
	}
}
