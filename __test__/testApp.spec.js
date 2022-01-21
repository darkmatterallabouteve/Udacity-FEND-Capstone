// Import the js file to test
import { saveTripData } from "../src/client/js/app"
  
describe("Testing the submit functionality", () => {
    test("Testing the saveTripData() function", () => {
        expect(saveTripData).toBeDefined();
        //expect(checkUrl(input)).toEqual(output)
    })
});