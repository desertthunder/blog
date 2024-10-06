import type { Fetch, Repository } from '../types';
import { Constants, GithubAPIEndpoints, User } from '../types';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export type SerializedREADME = Record<keyof Omit<README, 'url' | 'serialized'>, string>;

export class README {
	type: string;
	name: string;
	path: string;
	private url: string;
	html_url: string;
	download_url: string;
	html: string;
	markdown: string;

	constructor(data: Record<string, string>) {
		const markdown = atob(data.content);

		this.type = data.type;
		this.name = data.name;
		this.path = data.path;
		this.url = data.url;
		this.html_url = data.html_url;
		this.download_url = data.download_url;
		this.markdown = markdown;
		this.html = README.parse(markdown);
	}

	static parse(content: string): string {
		const markup = marked(content) as string;

		return DOMPurify.sanitize(markup);
	}

	get serialized(): SerializedREADME {
		return {
			type: this.type,
			name: this.name,
			path: this.path,
			html_url: this.html_url,
			download_url: this.download_url,
			markdown: this.markdown,
			html: this.html
		};
	}
}

export class GithubAPI {
	private declare token: string;

	fetch: Fetch;
	baseUrl: string = Constants.BASE_URL;
	username: string = Constants.USERNAME;

	private constructor(fetch: Fetch) {
		this.fetch = fetch;
	}

	static factory(fetch: Fetch, token?: string): GithubAPI {
		const api = new GithubAPI(fetch);

		if (token) {
			api.accessToken = token;
		}

		return api;
	}

	set accessToken(token: string) {
		this.token = token;
	}

	get headers(): { Authorization: string; Accept: string } {
		return {
			Authorization: `token ${this.token}`,
			Accept: `application/vnd.github.v3+json`
		};
	}

	async getAPIRoot() {
		const response = await this.fetch(`${this.baseUrl}/${GithubAPIEndpoints.ROOT}`, {
			headers: {
				Authorization: `token ${this.token}`,
				Accept: `application/vnd.github.v3+json`
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await response.json();

		return data;
	}

	async getRepositories(): Promise<Array<Repository>> {
		const response = await this.fetch(`${this.baseUrl}/${GithubAPIEndpoints.REPOSITORIES}`, {
			headers: {
				Authorization: `token ${this.token}`,
				Accept: `application/vnd.github.v3+json`
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data: Array<Repository> = await response.json();

		return data;
	}

	async getGists() {
		const response = await this.fetch(`${this.baseUrl}/${GithubAPIEndpoints.GISTS}`, {
			headers: {
				Authorization: `token ${this.token}`,
				Accept: `application/vnd.github.v3+json`
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await response.json();

		return data;
	}

	async getMyProfile(): Promise<User> {
		const response = await this.fetch(`${this.baseUrl}/${GithubAPIEndpoints.CURRENT_USER}`, {
			headers: {
				Authorization: `token ${this.token}`,
				Accept: `application/vnd.github.v3+json`
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await response.json();

		return new User(data);
	}

	async getProfileREADME(): Promise<README> {
		const headers = this.headers;

		const response = await this.fetch(
			`${this.baseUrl}/repos/${this.username}/${this.username}/contents/README.md`,
			{
				headers
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await response.json();

		return new README(data);
	}
}
