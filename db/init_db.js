// code to build and initialize DB goes here
//(DD): Testing DB push
// Requires
const client = require('./client');
const {
    createProduct,
    createUser,
    createReview
    // other db methods
} = require("./index");



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
        throw error
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
                "productId"   INT,
                "orderId"     INT,
                price         INT NOT NULL,
                quantity      INT NOT NULL DEFAULT 0,
                CONSTRAINT fk_products
                    FOREIGN KEY ("productId")
                        REFERENCES products(id),
                CONSTRAINT fk_orders
                    FOREIGN KEY ("orderId")
                        REFERENCES orders(id)
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
        []);
    } catch (error) {
        throw error;
    }
}

async function populateInitialData() {
  try {
        const prod1 = await createProduct({
            name: "2021-2022 Bus Pass",
            description: "Year-long bus pass.",
            price: "150",
            imageURL: "https://image.flaticon.com/icons/png/512/1168/1168035.png",
            inStock: true,
            category: "Transportation",
        });
        const prod2 = await createProduct({
            name: "Lunch",
            description: "Two-week lunch pass",
            price: "20",
            imageURL:
                "https://image.freepik.com/free-vector/boxed-lunches-set_1284-22197.jpg",
            inStock: true,
            category: "Child Nutrition",
        });
        const prod3 = await createProduct({
            name: "Chromebook",
            description: "New Chromebook for use in class",
            price: "20",
            imageURL: "https://image.freepik.com/free-vector/laptop-with-rocket_23-2147503371.jpg",
            inStock: true,
            category: "Technology",
        });
        console.log("Products Created")

        await createUser({
            firstName: "Teacher",
            lastName: "School",
            email: "school.teacher@cajonvalley.net",
            imageURL: "https://image.flaticon.com/icons/png/512/201/201634.png",
            username: "schoolteacher",
            password: "schoolteacher",
            isAdmin: true,
        }),
        await createUser({
            firstName: "Boy",
            lastName: "School",
            email: "school.boy@cajonvalley.net",
            imageURL: "https://image.flaticon.com/icons/png/512/1156/1156940.png",
            username: "schoolboy",
            password: "schoolboy123",
            isAdmin: false,
        }),
        await createUser({
            firstName: "Girl",
            lastName: "School",
            email: "school.girl@cajonvalley.net",
            imageURL: "https://image.flaticon.com/icons/png/512/1156/1156992.png",
            username: "schoolgirl",
            password: "schoolgirl123",
            isAdmin: false,
        });
        console.log("Users Created.")
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

        await createReview({
            productId: 3,
            title: "Excellent Device",
            content: "Works well for all my students.",
            stars: 5,
            userId: 1
        });
        console.log("Reviews Created.")
        
    } catch (error) {
        throw error;
    }
}

async function BuildAndPopulateDB() {
    try {
        console.log("Dropping tables")
        await dropTables();
        console.log("Creating Tables")
        await buildTables();
        console.log("Tables Made")
        await populateInitialData();
        console.log("Data Filled")
    } catch (error) {
        console.log(error)
    }
}


client.connect()
    .then(BuildAndPopulateDB)
    .catch(console.error)
    .finally(() => client.end());
