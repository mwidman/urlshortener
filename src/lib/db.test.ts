import { beforeEach, describe, expect, test } from 'vitest';

import { baseUrl, LinkDataStore } from './db';
import shortHash from 'short-hash';


describe('LinkDataStore', () => {
    let datastore: LinkDataStore;

    beforeEach(() => {
        datastore = new LinkDataStore();
    });

    describe('createShortenedLink', () => {
        test('returns a new link when added to the datastore', async () => {
            const keyword = 'test';
            const link = 'google.com';

            const expected = `${baseUrl}${keyword}`;

            const actual = await datastore.createShortenedLink(link, keyword);
            expect(actual).to.equal(expected);
        });

        test('throws an exception when that keyword already exists', async () => {
            const keyword = 'test';
            const link = 'google.com';

            const expected = `${baseUrl}${keyword}`;

            await datastore.createShortenedLink(link, keyword);

            // Rerun with the same keyword.
            await expect(() => datastore.createShortenedLink(link, keyword)).rejects.toThrowError('You must choose a unique keyword.');
        });

        test('returns a hashed link when no keyword provided', async () => {
            const link = 'google.com';
            const hash = shortHash(link);

            const expected = `${baseUrl}${hash}`;

            const actual = await datastore.createShortenedLink(link);
            expect(actual).to.equal(expected);
        });
    });

    describe('getShortenedLink', () => {
        test('returns a previously add link', async () => {
            const keyword = 'test';
            const link = 'google.com';
            await datastore.createShortenedLink(link, keyword);

            const expected = link;

            const actual = await datastore.getShortenedLink(keyword);

            expect(actual).to.equal(expected);
        });

        test('returns undefined when that key does not exist', async () => {
            const keyword1 = 'test';
            const keyword2 = 'test2';
            const link = 'google.com';
            await datastore.createShortenedLink(link, keyword1);

            const expected = undefined;

            const actual = await datastore.getShortenedLink(keyword2);

            expect(actual).to.equal(expected);


        });
    });
});