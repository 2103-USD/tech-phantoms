import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { BASE_URL, storeCurrentUser} from "../api";

export const Register = ({ setUser }) => {
    const [form, setForm] = useState({ username: "", password: "", confirmpassword: "", firstname: "", lastname: "", email:""});

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/register`, {
                username: form.username,
                password: form.password,
            });

            setUser(res.data.user);
            storeCurrentUser(res.data.user, res.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleInput}
                    autoComplete = "username"
                />
                <label>Password</label>
                <input
                    name="password"
                    value={form.password}
                    onChange={handleInput}
                    type="password"
                    autoComplete = "new-password"
                />
                <label>Confirm Password</label>
                <input
                    name="confirmpassword"
                    value={form.password}
                    onChange={handleInput}
                    type="password"
                    autoComplete = "new-password"
                />
                <label>Email Address</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleInput}
                    type="email"
                    autoComplete = "email"
                />
                <label>First Name</label>
                <input
                    name="firstname"
                    value={form.firstname}
                    onChange={handleInput}
                    autoComplete = "given-name"
                />
                <label>Last Name</label>
                <input
                    name="lastname"
                    value={form.lastname}
                    onChange={handleInput}
                    autoComplete = "family-name"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
