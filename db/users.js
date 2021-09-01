// Requires
const client = require('./client');
const bcrypt = require("bcrypt");

//create user
async function createUser({
    firstName,
    lastName,
    email,
    imageURL,
    username,
    password,
    isAdmin,
}) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            INSERT INTO users("firstName", "lastName", email, "imageURL", username, password, "isAdmin")
            VALUES($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (username, email) DO NOTHING
            RETURNING id, "firstName", "lastName", email, "imageURL", username, "isAdmin";
            `,
            [
                firstName,
                lastName,
                email,
                imageURL,
                username,
                hashedPassword,
                isAdmin,
            ]
        );
        return user;
        //})
    } catch (error) {
        throw error;
    }
}

//get user
async function getUser({ username, password }) {
    try {
        if (!username || !password) {
            return "";
        }

        const user = await getUserByUsername(username);
        if (user) {
            const hashedPassword = user.password;
            const passwordsMatch = await bcrypt.compare(
                password,
                hashedPassword
            );

            if (passwordsMatch) {
                delete user.password;
                return user;
            }
        }
    } catch (error) {
        throw error;
    }
}

//get all users
async function getAllUsers() {
    try {
        const { rows: users } = await client.query(
            `
            SELECT "firstName", "lastName", email, "imageURL", username, "isAdmin"
            FROM users
            `,
            []
        );
    } catch (error) {
        throw error;
    }
}

//get user by id
async function getUserById(id) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            SELECT *
            FROM users
            WHERE id = $1;
            `,
            [id]
        );

        return user;
    } catch (error) {
        throw error;
    }
}

//get user by username
async function getUserByUsername(username) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            SELECT *
            FROM users
            WHERE username = $1;
            `,
            [username]
        );

        return user;
    } catch (error) {
        throw error;
    }
}

//update user
async function updateUser(user) {
    try {
        const { id, irstName, lastName, email, imageURL, isAdmin}
        const {rows: [user]} = await client.query(
            `
            UPDATE users
            SET "firstName" = $2, "lastName" = $3, email = $4, "imageURL" = $5,
                "isAdmin" = $6
            where id = $1
            RETURNING *;
            `,
            [id, firstName, lastName, email, imageURL, isAdmin]
        )
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    updateUser,
};
