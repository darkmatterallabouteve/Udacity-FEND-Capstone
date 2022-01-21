// Import the js file to test
import { getProjectData } from "../src/server/index"

describe("Testing the getProjectData functionality", () => {
    test("Testing the getProjectData() function", () => {

        expect(getProjectData).not.toBeNull
    })
});
