import { validateUrl } from '../src/client/js/urlChecker'

describe("Testing URL validation", () => {
    test("Testing the validateUrl() function", () => {
        expect(validateUrl).toBeDefined();
    })
    test("Testing a valid URL", () => {
        expect(validateUrl('https://www.bbc.com/news/world-middle-east-57094737')).toEqual(true)
    })
    test("Testing an invalid URL", () => {
        expect(validateUrl('htd:sdfff')).toEqual(false)
    })
})