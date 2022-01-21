// Import the js file to test
import { saveTripData } from "../src/client/js/app"
  
describe("Testing the submit functionality", () => {
    test("saveTripData", () => {

        expect(saveTripData).not.toBeNull
    })
});