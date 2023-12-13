import { expect, test } from '@playwright/test';

import { baseUrl } from '../src/lib/db';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to the LinkShortener' })).toBeVisible();
});

test('api POST creates a shortened link in plain text', async ({ request }) => {
	const link = 'playwright.dev';
	const keyword = 'playwright';

	const response = await request.post(`/api/links`, {
		data: {
			link,
			keyword,
		}
	});

	expect(response.ok()).toBeTruthy;

	expect(await response.text()).toEqual(`${baseUrl}${keyword}`);
});

// Requires the above test creating the link to have been run
test('api GET redirects to the shortened link', async ({ request, page }) => {
	const keyword = 'playwright';
	const link = 'http://playwright.dev';

	const postResponse = await request.post(`/api/links`, {
		data: {
			link,
			keyword,
		}
	});

	// TODO: The baseUrl assumes a specific location which is not always correct.
	// So don't use the shortened link here until that is fixed.
	const shortenedLink = await postResponse.text();
	console.log(shortenedLink);

	const response = await request.get(`/api/links/${keyword}`);

	expect(response.url()).toEqual('http://playwright.dev/');
});
