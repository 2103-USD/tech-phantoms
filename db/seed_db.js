// code to build and initialize DB goes here
//(DD): Testing DB push
// Requires
const client = require("./client");
const {
    createProduct,
    createUser,
    createReview,
    createOrder,
    addProductToOrder,
} = require("./index");

async function createInitialUsers() {
    try {
        const initialUsers = [
            {
                username: "guertinj",
                password: "guertinj",
                firstName: "Jonathon",
                lastName: "Guertin",
                email: "guertinj@cajonvalley.net",
                imageURL: "https://cdn-icons-png.flaticon.com/512/78/78948.png",
                isAdmin: true,
            },
            {
                username: "menezesj",
                password: "menezesj",
                firstName: "Joel",
                lastName: "Menezes",
                email: "menezesj@cajonvalley.net",
                imageURL: "https://cdn-icons-png.flaticon.com/512/78/78948.png",
                isAdmin: true,
            },
            {
                username: "veram",
                password: "veram",
                firstName: "Matthew",
                lastName: "Vera",
                email: "veram@cajonvalley.net",
                imageURL: "https://cdn-icons-png.flaticon.com/512/78/78948.png",
                isAdmin: true,
            },
            {
                username: "demedukd",
                password: "demedukd",
                firstName: "Derek",
                lastName: "Demeduk",
                email: "demedukd@cajonvalley.net",
                imageURL: "https://cdn-icons-png.flaticon.com/512/78/78948.png",
                isAdmin: true,
            },
            {
                firstName: "Teacher",
                lastName: "School",
                email: "school.teacher@cajonvalley.net",
                imageURL:
                    "https://image.flaticon.com/icons/png/512/201/201634.png",
                username: "schoolteacher",
                password: "schoolteacher",
                isAdmin: false,
            },
            {
                firstName: "Boy",
                lastName: "School",
                email: "school.boy@cajonvalley.net",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/1156/1156991.png",
                username: "schoolboy",
                password: "schoolboy123",
                isAdmin: false,
            },
            {
                firstName: "Girl",
                lastName: "School",
                email: "school.girl@cajonvalley.net",
                imageURL:
                    "https://image.flaticon.com/icons/png/512/1156/1156992.png",
                username: "schoolgirl",
                password: "schoolgirl123",
                isAdmin: false,
            },
        ];
        const createUsers = await Promise.all(initialUsers.map(createUser));

        console.log("**********USERS:");
        console.log(createUsers);
    } catch (error) {
        console.error("********ALERT: Error creating users.");
        throw error;
    }
}

async function createInitialProducts() {
    try {
        const initialProducts = [
            {
                name: "Lunch",
                description: "Two-week lunch pass",
                price: "20",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/1322/1322948.png",
                inStock: 1000,
                category: "Child Nutrition",
            },
            {
                name: "2021-2022 Bus Pass",
                description: "Year-long bus pass.",
                price: "150",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/3492/3492171.png",
                inStock: 1000,
                category: "Transportation",
            },
            {
                name: " x360 USB Board",
                description: "Chromebook Parts",
                price: "31.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/1501/1501792.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "Chromebook",
                description: "New Chromebook for use in class",
                price: "350",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/610/610021.png",
                inStock: 1000,
                category: "Technology",
            },
            {
                name: "x360 Touchpad Board",
                description: "Chromebook Parts",
                price: "28.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/1414/1414080.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 Webcam",
                description: "Chromebook Parts",
                price: "29.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/3037/3037951.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 WiFi Card",
                description: "Chromebook Parts",
                price: "21.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/3069/3069609.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 Power Board",
                description: "Chromebook Parts",
                price: "35.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/4152/4152103.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 Speakers",
                description: "Chromebook Parts",
                price: "18.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/860/860182.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 Top Case",
                description: "Chromebook Parts",
                price: "53.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/4319/4319109.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 Motherboard",
                description: "Chromebook Parts",
                price: "146.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/2422/2422536.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 Keyboard",
                description: "Chromebook Parts",
                price: "68.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/124/124125.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 LCD Screen w Frame",
                description: "Chromebook Parts",
                price: "178.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/2527/2527724.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 LCD Screen wo Frame",
                description: "Chromebook Parts",
                price: "158.00",
                imageURL: "https://cdn-icons-png.flaticon.com/128/33/33327.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 Audio Port",
                description: "Chromebook Parts",
                price: "35.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/3225/3225331.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x131e Video Cable",
                description: "Chromebook Parts",
                price: "54.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/649/649797.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x360 Bottom Case",
                description: "Chromebook Parts",
                price: "62.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/4319/4319109.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x131e Motherboard",
                description: "Chromebook Parts",
                price: "125.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/2422/2422536.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x131e Keyboard Frame",
                description: "Chromebook Parts",
                price: "34.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/159/159602.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x131e LCD Screen",
                description: "Chromebook Parts",
                price: "39.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/2527/2527724.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x131e LCD Frame",
                description: "Chromebook Parts",
                price: "26.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/2527/2527724.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x131e Keyboard",
                description: "Chromebook Parts",
                price: "36.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/483/483142.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x131e Audio Port",
                description: "Chromebook Parts",
                price: "35.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/3225/3225331.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "x131e Bottom Case",
                description: "Chromebook Parts",
                price: "70.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/4319/4319109.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "Keyboard Key",
                description: "Chromebook Parts",
                price: "18.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/3538/3538084.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "11e LCD Screen",
                description: "Chromebook Parts",
                price: "37.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/2527/2527724.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "11e Video Cable",
                description: "Chromebook Parts",
                price: "54.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/649/649797.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "11e Motherboard",
                description: "Chromebook Parts",
                price: "125.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/2422/2422536.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "11e LCD Frame",
                description: "Chromebook Parts",
                price: "34.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/2527/2527724.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "11e Bottom Case",
                description: "Chromebook Parts",
                price: "65.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/4319/4319109.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "11e Keyboard Frame",
                description: "Chromebook Parts",
                price: "59.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/159/159602.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "11e Keyboard",
                description: "Chromebook Parts",
                price: "41.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/124/124125.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "11e Audio Port",
                description: "Chromebook Parts",
                price: "35.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/512/3225/3225331.png",
                inStock: 1000,
                category: "Repair",
            },
            {
                name: "Misc Charge",
                description: "Chromebook Parts",
                price: "0.00",
                imageURL:
                    "https://cdn-icons-png.flaticon.com/128/182/182474.png",
                inStock: 0,
                category: "Chromebook",
            },
        ];
        const createProducts = await Promise.all(
            initialProducts.map(createProduct)
        );
        console.log("**********PRODUCTS:");
        console.log(createProducts);
    } catch (error) {
        console.error("**********ALERT: Error creating Products.");
    }
}

async function createInitialOrders() {
    const initialOrders = [
        {
            status: "created",
            userId: 1,
        },
        {
            status: "created",
            userId: 6,
        },
        {
            status: "created",
            userId: 7,
        },
        {
            status: "created",
            userId: 5,
        },
        {
            status: "cancelled",
            userId: 2,
        },
        {
            status: "completed",
            userId: 2,
        },
        {
            status: "completed",
            userId: 2,
        },
        {
            status: "completed",
            userId: 1,
        },
        {
            status: "completed",
            userId: 3,
        },
        {
            status: "processing",
            userId: 1,
        },
        {
            status: "completed",
            userId: 6,
        },
        {
            status: "completed",
            userId: 7,
        },
    ];
    try {
        const createOrders = await Promise.all(initialOrders.map(createOrder));
        console.log("**********ORDERS:");
        console.log(createOrders);
    } catch (error) {
        console.error("**********ALERT: Error creating orders.");
        throw error;
    }
}

async function createInitialOrderProducts() {
    const initialOrderProducts = [
        {
            productId: 4,
            orderId: 1,
            price: 350,
            quantity: 12,
        },
        {
            productId: 4,
            orderId: 2,
            price: 350,
            quantity: 1,
        },
        {
            productId: 1,
            orderId: 2,
            price: 20,
            quantity: 1,
        },
        {
            productId: 4,
            orderId: 3,
            price: 350,
            quantity: 1,
        },
        {
            productId: 4,
            orderId: 4,
            price: 350,
            quantity: 1,
        },
        {
            productId: 4,
            orderId: 5,
            price: 350,
            quantity: 1,
        },
        {
            productId: 4,
            orderId: 6,
            price: 350,
            quantity: 1,
        },
        {
            productId: 4,
            orderId: 7,
            price: 350,
            quantity: 1,
        },
        {
            productId: 4,
            orderId: 7,
            price: 350,
            quantity: 1,
        },
        {
            productId: 34,
            orderId: 11,
            price: 50,
            quantity: 1,
        },
        {
            productId: 1,
            orderId: 12,
            price: 20,
            quantity: 1,
        },
        {
            productId: 34,
            orderId: 12,
            price: 50,
            quantity: 1,
        },
        {
            productId: 1,
            orderId: 12,
            price: 20,
            quantity: 1,
        },
    ];
    try {
        const createOrdersProducts = await Promise.all(
            initialOrderProducts.map(addProductToOrder)
        );
        console.log("**********ORDER Products:");
        console.log(createOrdersProducts);
    } catch (error) {
        console.error("**********ALERT: Error creating order Items.");
        throw error;
    }
}

async function createInitialReviews() {
    const initialReviews = [
        {
            productId: 1,
            title: "Excellent Device",
            content: "Works well for all my students.",
            stars: 5,
            userId: 1,
        },
        {
            productId: 3,
            title: "Works ok",
            content: "Nothing too fancy.",
            stars: 3,
            userId: 1,
        },
        {
            productId: 3,
            title: "Excellent Device",
            content: "Works well for all my students.",
            stars: 5,
            userId: 1,
        },
    ];
    try {
        const createReviews = await Promise.all(
            initialReviews.map(createReview)
        );

        console.log("**********REVIEWS:");
        console.log(createReviews);
    } catch (error) {
        console.error("**********ALERT: Error creating reviews");
        throw error;
    }
}

async function populateInitialData() {
    try {
        console.log("Creating Users");
        await createInitialUsers();
        console.log("Creating Products");
        await createInitialProducts();
        console.log("Creating Initial Orders");
        await createInitialOrders();
        console.log("Creating Order Products");
        await createInitialOrderProducts();
        console.log("Creating Reviews");
        await createInitialReviews();
        console.log("Initial Reviews Created");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    populateInitialData,
};
