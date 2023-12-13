import { error, type RequestHandler } from "@sveltejs/kit";

import { linkDataStore } from '$lib/db';

/**
 * Handles the creation of a shortened link via a POST request. 
 * The POST body must be JSON and contain the 'link' property and optionally a 'keyword' property.
 * @param event.request The HTTP Request made to this endpoint.
 * @returns 
 */
export const POST: RequestHandler = async ({ request }) => {

    const { keyword, link } = await request.json();    

    try {
        const shortenedLink = await linkDataStore.createShortenedLink(link, keyword);
        return new Response(`${shortenedLink}`, { status: 201 });
    } catch (err) {
        console.error(err);
        // If the keyword already exists, notify the user they must choose another one
        throw error(400, err.message);
    }
}