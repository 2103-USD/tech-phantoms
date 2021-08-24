// code to build and initialize DB goes here
//(DD): Testing DB push
const {
  client,
  createProduct,
  // other db methods
} = require("./index");

client.connect();

async function buildTables() {
  try {
    await client.query(
      `
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    `,
      []
    );

    await client.query(
      `
    CREATE TABLE products (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    description   VARCHAR(500) NOT NULL,
    price         INT NOT NULL,
    "imageURL"    TEXT DEFAULT 'https://publicdomainpictures.net/pictures/40000/velka/school-bus-clipart.jpg' NOT NULL,
    "inStock"     BOOLEAN NOT NULL DEFAULT false,
    category      VARCHAR(200) NOT NULL
   ); 

    CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    "firstName"   VARCHAR(200) NOT NULL,
    "lastName"    VARCHAR(200) NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    "imageURL"    TEXT DEFAULT 'https://image.flaticon.com/icons/png/512/1160/1160922.png' ,
    username      VARCHAR(255) UNIQUE NOT NULL,
    password      VARCHAR(255) NOT NULL,
    "isAdmin"     BOOLEAN NOT NULL DEFAULT false
    );

    CREATE TABLE orders (
    id            SERIAL PRIMARY KEY,
    status        VARCHAR(255) DEFAULT 'created',
    "userId"      INT REFERENCES users(id),
    "datePlaced"  DATE
    );

    CREATE TABLE order_products (
    id            SERIAL PRIMARY KEY,
    "productId"   INT REFERENCES products(id),
    "orderId"     INT REFERENCES orders(id),
    price         INT NOT NULL,
    quantity      INT NOT NULL DEFAULT 0
    );
    `,
      []
    );
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    await createProduct({
      name: "2021-2022 Bus Pass",
      description: "Year-long bus pass.",
      price: "150",
      imageURL: "https://image.flaticon.com/icons/png/512/1168/1168035.png",
      inStock: true,
      category: "Transportation",
    });

    await createProduct({
      name: "Lunch",
      description: "Two-week lunch pass",
      price: "20",
      imageURL:
        "https://image.freepik.com/free-vector/boxed-lunches-set_1284-22197.jpg",
      inStock: true,
      category: "Child Nutrition",
    });

    // const defaultProducts = [
    //   {
    //     name: "2021-2022 Bus Pass",
    //     description: "Year-long bus pass.",
    //     price: "150",
    //     inStock: true,
    //     category: "Transportation",
    //     imageURL: "https://image.flaticon.com/icons/png/512/1168/1168035.png",
    //   },
    //   {
    //     name: "Lunch",
    //     description: "Two-week lunch pass",
    //     price: "20",
    //     inStock: true,
    //     category: "Child Nutrition",
    //     imageURL:
    //       "https://image.freepik.com/free-vector/boxed-lunches-set_1284-22197.jpg",
    //   },
    // ];

    // const defaultUsers = [
    //   {
    //     imageURL: "https://image.flaticon.com/icons/png/512/201/201634.png",
    //     firstName: "Teacher",
    //     lastName: "School",
    //     email: "school.teacher@cajonvalley.net",
    //     username: "schoolteacher",
    //     password: "schoolteacher",
    //     isAdmin: true,
    //   },
    //   {
    //     imageURL: "https://image.flaticon.com/icons/png/512/1156/1156940.png",
    //     firstName: "Boy",
    //     lastName: "School",
    //     email: "school.boy@cajonvalley.net",
    //     username: "schoolboy",
    //     password: "schoolboy123",
    //     isAdmin: true,
    //   },
    //   {
    //     imageURL: "https://image.flaticon.com/icons/png/512/1156/1156992.png",
    //     firstName: "Girl",
    //     lastName: "School",
    //     email: "school.girl@cajonvalley.net",
    //     username: "schoolgirl",
    //     password: "schoolgirl123",
    //     isAdmin: true,
    //   },
    // ];

    // const defaultOrders = [
    //   {
    //     status: "created",
    //     userId: 1,
    //   },
    //   {
    //     status: "cancelled",
    //     userId: 2,
    //   },
    //   {
    //     status: "completed",
    //     userId: 3,
    //   },
    //   {
    //     status: "processing",
    //     userId: 1,
    //   },
    // ];
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .then(console.log("finished building tables"))
  .catch(console.error)
  .finally(() => client.end());
