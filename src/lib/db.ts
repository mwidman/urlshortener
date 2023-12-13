import shortHash from 'short-hash';


export const baseUrl = 'http://localhost:5173/api/links/';

export class LinkDataStore {
    private links = new Map();

    /**
     * Creates a shortened link and returns it to the user.
     * @param link  The original link that will be associated with the key.
     * @param keyword (Optional) A keyword that represents the link. If ommitted, a hash is generated instead.
     * @returns 
     */
    async createShortenedLink(link: string, keyword: string = ''): Promise<string> {

        let key = keyword;

        if (!keyword) {
            key = shortHash(link);
        }

        console.log(key);

        
        if (this.links.get(key)) {
            throw Error('You must choose a unique keyword.');
        }

        this.links.set(key, link);

        return `${baseUrl}${key}`;
    }

    /**
     * Retrieves a shortened link for a given keyword/hash.
     * @param key Either the keyword or hash used to create the entry.
     */
    async getShortenedLink(key: string) {
        return this.links.get(key);
    }
}

export const linkDataStore = new LinkDataStore();