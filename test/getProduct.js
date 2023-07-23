const { describe } = require("mocha");
const { expect } = require ("chai")
const request = require ("supertest")
const {DATA_USER} = require ('../data/dataUser')
const testData = DATA_USER

const baseURL = "https://run.mocky.io/v3"

describe("Test Suite Get detail product", () =>{
    const response = request (baseURL)
        .get('/0e2de2af-4793-4c89-af96-bdc1d52e9212')
    //Soal Nomor 1
    it('Send a GET request to retrieve the product details.', async() =>{
        expect((await response).body.message).to.equal()
    })
    //Soal Nomor 2
    it('Validate that the response has a status code of 200.', async() =>{
        expect((await response).status).to.equal(200)
    })
    //Soal Nomor 3
    it('Verify that the "name" field in the response matches the expected value "Product X".', async() =>{
        expect((await response).body.name).to.equal('Product X')
    })
    //Soal Nomor 4
    it('Check if the "price" field is a numeric value and greater than zero.', async() =>{
        expect((await response).body.price).to.be.a("number").greaterThan(0)
    })
    //Soal Nomor 5
    it('Validate that the "inventory" field is present and has a boolean value for "available".', async() =>{
        expect((await response).body).to.have.property("inventory").that.is.an("object");
        expect((await response).body.inventory).to.have.property("available").that.is.a("boolean");
    })
    //Soal Nomor 6
    it("Extract the 'quantity' value from the 'inventory' field and verify that it is a numericvalue greater than zero.", async() =>{
        expect((await response).body.inventory.quantity).to.be.a("number").greaterThan(0);
    })
    //Soal Nomor 7
    it("Verify that the 'categories' field contains at least one category and each category has an 'id' and a 'name' field.", async() =>{
        expect((await response).body).to.have.property("categories").that.is.an("array").with.length.at.least(1);
        const [firstCategory] = (await response).body.categories;
        expect( firstCategory).to.have.property("id").that.is.a("number");
        expect( firstCategory).to.have.property("name").that.is.a("string");
    })
    //Soal Nomor 8
    it("Extract the 'reviews' field and ensure it is an array containing at least one review.", async() =>{
        expect((await response).body).to.have.property("reviews").that.is.an("array").with.length.at.least(1);
    })
    //Soal Nomor 9
    it("Validate that each review in the 'reviews' field has an 'id', 'user', 'rating', and 'comment' field.", async() =>{
        (await response).body.reviews.forEach((review) => {
            expect(review).to.have.property("id").that.is.a("number");
            expect(review).to.have.property("user").that.is.a("string");
            expect(review).to.have.property("rating").that.is.a("number").greaterThan(0).lessThan(6);
            expect(review).to.have.property("comment").that.is.a("string");
          });
    });
});

// Execute the tests and log the results
(async () => {
    const Mocha = require('mocha');
    const mocha = new Mocha({ reporter: 'spec' });
  
    // Add the test file to the mocha instance
    mocha.addFile('test/getProduct.js');
  
    // Run the tests and log the results
    try {
      const failures = await new Promise((resolve, reject) => {
        mocha.run((failures) => {
          resolve(failures);
        });
      });
  
      // If there are any test failures, print the report
      if (failures > 0) {
        console.error('Test run completed with failures.');
      } else {
        console.log('All tests passed successfully!');
      }
    } catch (error) {
      console.error('Error occurred during test execution:', error);
    }
})();
  
  
  