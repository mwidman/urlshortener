import shortHash from 'short-hash';


export const baseUrl = 'http://localhost:5173/api/links/';

export const links = new Map();

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