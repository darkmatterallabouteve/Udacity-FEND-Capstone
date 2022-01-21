// Import the js file to test
import { getGeoNamesData } from "../src/server/index"

describe("Testing the getGeoNamesData functionality", () => {
    test("Testing the getGeoNamesData() function", () => {
        expect(getGeoNamesData).toBeDefined();
        //        expect(checkUrl(input)).toEqual(output)
    })
});
