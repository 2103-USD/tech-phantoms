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
            const {data, status, message} = await loginExistingUser( {
                username: form.username,
                password: form.password,
            });
            // console.log("BadData", message, status)
            if (status === 200) {
                toast(`Welcome back, ${data.user.firstName}`, { type: "success" });
              } else {
                toast({message}, { type: "error" });
              }
            setUser(data.user)

            history.push("/")
        } catch (error) {
            toast('Username or Password is incorrect. Please try again', {type: 'error'});
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
