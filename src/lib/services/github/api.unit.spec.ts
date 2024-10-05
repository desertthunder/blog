import { test, expect, describe } from 'vitest';
import { GithubAPI } from './api';
import { Constants } from '../types';

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

describe('Github API Service', () => {
  const fetch = globalThis.fetch;
  const client = GithubAPI.factory(fetch, token);

  test("getProfileREADME fetches the profile README", async () => {
    const data = await client.getProfileREADME();

    expect(data).toBeDefined();
    expect(data.markdown).to.not.contain(Constants.USERNAME);
    expect(data.markdown).to.contain('Owais');
  });
});
