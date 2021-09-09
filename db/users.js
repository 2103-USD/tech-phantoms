const bcrypt = require("bcrypt");
const client = require("./client");
const SALT_COUNT = 10;
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
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            INSERT INTO users("firstName", "lastName", email, "imageURL", username, password, "isAdmin")
            VALUES($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (username) DO NOTHING
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
        const user = await _getUserByUsername(username);
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
            SELECT 
                id,
                "firstName",
                "lastName",
                email,
                "imageURL",
                username,
                "isAdmin"
            FROM users;
            `
        );
        return users
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
            SELECT 
                id,
                "firstName",
                "lastName",
                email,
                "imageURL",
                username,
                "isAdmin"
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

//get user by username-INTERNAL
async function _getUserByUsername(username) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            SELECT 
                *
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

//get user by username
async function getUserByUsername(username) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            SELECT 
                id,
                "firstName",
                "lastName",
                email,
                "imageURL",
                username,
                "isAdmin"
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

//get user by email address
async function getUserNameByEmail(email) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            SELECT 
                id,
                "firstName",
                "lastName",
                email,
                "imageURL",
                username,
                "isAdmin"
            FROM users
            WHERE email = $1;
            `,
            [email]
        );

        return user;
    } catch (error) {
        throw error;
    }
}

// update user
async function updateUser({
    id,
    firstName,
    lastName,
    email,
    imageURL,
    username,
    password,
    isAdmin,
}) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            UPDATE users
            SET 
                "firstName" = $1, 
                "lastName" = $2, 
                email = $3, 
                "imageURL" = $4, 
                username = $5, 
                password = $6, 
                "isAdmin" = $7
            WHERE id = $8
            ON CONFLICT (username) DO NOTHING
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
                id,
            ]
        );
        return user;
    } catch (error) {
        throw error;
    }
}

// ADMINupdate user
async function updateUserByAdmin(
    id,
    firstName,
    lastName,
    email,
    username,
    isAdmin,
) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            UPDATE users
            SET 
                "firstName" = $1, 
                "lastName" = $2, 
                email = $3, 
                username = $4, 
                "isAdmin" = $5
            WHERE id = $6
            RETURNING id, "firstName", "lastName", email, username, "isAdmin";
            `,
            [
                firstName,
                lastName,
                email,
                username,
                isAdmin,
                id
            ]
        );
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
    getUserNameByEmail,
    updateUser,
    updateUserByAdmin
};
