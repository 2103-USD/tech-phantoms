import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginExistingUser } from "../api";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
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
            const {data} = await loginExistingUser( {
                username: form.username,
                password: form.password,
            });
            if (!data.message)  {
                toast(`Welcome back, ${data.user.firstName}`, { type: "success" });
                setUser(data.user)
                history.push("/")
            } else {
                toast(data.message, { type: "error" });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-form">
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
