import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginExistingUser } from "../api";
import "./style.css";

export const Login = ({ setUser }) => {
    const [form, setForm] = useState({ username: "", password: "" });

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginExistingUser( {
                username: form.username,
                password: form.password,
            });
            setUser(res.user)
            history.push("/")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Login</h1>

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
                    autoComplete = "current-password"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};
