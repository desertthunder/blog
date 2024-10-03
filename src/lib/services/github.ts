import type { FetchFn, Repository } from './types';
import { Constants, GithubAPIEndpoints, User } from './types';


export class GithubAPI {
	private declare token: string;

	fetch: FetchFn;
	baseUrl: string = Constants.BASE_URL;

	private constructor(fetch: FetchFn) {
		this.fetch = fetch;
	}

    static factory(fetch: FetchFn): GithubAPI {
        return new GithubAPI(fetch);
    }

	set accessToken(token: string) {
		this.token = token;
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
}

