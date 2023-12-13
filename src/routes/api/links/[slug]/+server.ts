import { error, redirect, type RequestHandler } from '@sveltejs/kit';

import { linkDataStore } from '$lib/db';

/**
 * Handle redirecting the browser to the shortened link based
 * on the `slug` portion of the URL accessed.
 *
 * @param params.slug The keyword/hash that used to create the shortened link entry.
 */
export const GET: RequestHandler = async ({ params }) => {
    const keyword: string|undefined = params.slug;

    if (keyword == undefined) {
        throw error(400, 'You must provide a link key');
    }

    const link = await linkDataStore.getShortenedLink(keyword);

    // 404 if the keyword doesn't exist in our datastore
    if (!link) {
        throw error(404, 'This link does not exist.');
    }

    throw redirect(301, link);
};