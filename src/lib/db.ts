import shortHash from 'short-hash';


export const baseUrl = 'http://localhost:5173/api/links/';

export const links = new Map();

/**
 * Creates a shortened link and returns it to the user.
 * @param keyword A keyword that represents the link. If ommitted, a hash is generated instead.
 * @param link  The original link that will be associated with the key.
 * @returns 
 */
export async function createShortenedLink(keyword: string, link: string): Promise<string> {

    let key = keyword;

    if (!keyword) {
        key = shortHash(link);
    }

    console.log(key);

    
    if (links.get(key)) {
        throw Error('You must choose a unique keyword.');
    }

    links.set(key, link);

    return `${baseUrl}${key}`;
}