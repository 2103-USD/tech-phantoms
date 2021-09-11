// code to build and initialize DB goes here
//(DD): Testing DB push
// Requires
const client = require("./client");
const {
    createProduct,
    createUser,
    createReview,
    createOrder,
    // other db methods
} = require("./index");

const {populateInitialData} = require('./seed_db');

async function dropTables() {
    try {
        await client.query(
            `
            DROP TABLE IF EXISTS order_products;
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS products;
        `,
            []
        );
    } catch (error) {
        throw error;
    }
}

async function buildTables() {
    try {
        await client.query(
            `
            CREATE TABLE products (
                id            SERIAL PRIMARY KEY,
                name          VARCHAR(255) NOT NULL,
                description   TEXT NOT NULL,
                price         REAL NOT NULL,
                "imageURL"    TEXT DEFAULT 'https://publicdomainpictures.net/pictures/40000/velka/school-bus-clipart.jpg' NOT NULL,
                "inStock"     INT NOT NULL DEFAULT 0,
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
                "productId"   INT NOT NULL,
                "orderId"     INT NOT NULL,
                price         REAL NOT NULL,
                quantity      INT NOT NULL DEFAULT 0,
                CONSTRAINT fk_products
                    FOREIGN KEY ("productId")
                        REFERENCES products(id),
                CONSTRAINT fk_orders
                    FOREIGN KEY ("orderId")
                        REFERENCES orders(id),
                CONSTRAINT idx_orderProducts
                    UNIQUE ( "orderId", "productId" )
            );

            CREATE TABLE reviews (
                id            SERIAL PRIMARY KEY,
                title         varchar(255) NOT NULL,
                content       TEXT NOT NULL,
                stars         INT NOT NULL,
                "userId"      INT NOT NULL,
                "productId"   INT,
                CONSTRAINT fk_users
                    FOREIGN KEY ("userId")
                        REFERENCES users(id),
                CONSTRAINT fk_products
                    FOREIGN KEY ("productId")   
                        REFERENCES products(id)
            );
        `,
            []
        );
    } catch (error) {
        throw error;
    }
}


async function BuildAndPopulateDB() {
    try {
        console.log("Dropping Tables");
        await dropTables();

        console.log("Building Tables");
        await buildTables();
        console.log("Tables Created");

        console.log("Populating Initial Data");
        await populateInitialData();
    } catch (error) {
        console.log(error);
    }
}

client
    .connect()
    .then(BuildAndPopulateDB)
    .catch(console.error)
    .finally(() => client.end());
