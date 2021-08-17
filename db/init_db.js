// code to build and initialize DB goes here
//(DD): Testing DB push
const {
  client,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

async function testFunction() {
  console.log("message");
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
