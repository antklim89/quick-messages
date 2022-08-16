import { describe, expect, it } from 'vitest';
import { createRoutesGetter } from './getRoute';


const pathes = {
    test1: {
        path: '/test/:field1/:field2',
    },
    test2: {
        path: '/test/field',
    },
} as const;


const getRoute = createRoutesGetter(() => pathes);


describe('getRoute', () => {
    it('should return modified path', async () => {
        const route = getRoute('test1', { field1: 'FIELD1', field2: 'FIELD2' });

        expect(route).toEqual('/test/FIELD1/FIELD2');
    });

    it('if there are no path params in the path, the unmodified path should be returned', async () => {
        const route = getRoute('test2', {});

        expect(route).toEqual(pathes.test2.path);
    });

    it('if there are no path parameters were provided, error should be throwed', async () => {
        // @ts-expect-error testing
        expect(() => getRoute('test1', { field1: 'FIELD1' })).toThrowError('field2 param is required in path /test/:field1/:field2');
    });

    it('if there are no route name were provided, error should be throwed', async () => {
        // @ts-expect-error testing
        expect(() => getRoute('WRONG_NAME', { field1: 'FIELD1' })).toThrowError('There is no route with name WRONG_NAME');
    });
});
