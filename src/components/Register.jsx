import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import { registerNewUser } from "../api";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export const Register = ({ setUser }) => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmpassword: "",
        firstname: "",
        lastname: "",
        email: "",
    });
    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerNewUser({
                username: form.username,
                password: form.password,
                confirmpassword: form.confirmpassword,
                firstName: form.firstname,
                lastName: form.lastname,
                email: form.email,
            });
            if (!data.message)  {
                toast(`Thank you for registering,\n${data.user.firstName}`, { type: "success" });
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
        <div className="register-form">
            <h1>Register</h1>
            <h5>All fields are required</h5>
            <br></br>
            <form className="actual-register-form" onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                    required
                    name="username"
                    value={form.username}
                    onChange={handleInput}
                    autoComplete="username"
                />
                <br />
                <label>Password: </label>
                <input
                    required
                    name="password"
                    value={form.password}
                    onChange={handleInput}
                    type="password"
                    autoComplete="new-password"
                />
                <br />
                <label>Confirm Password: </label>
                <input
                    required
                    name="confirmpassword"
                    value={form.confirmpassword}
                    onChange={handleInput}
                    type="password"
                    autoComplete="new-password"
                />
                <br />
                <label>Email Address: </label>
                <input
                    required
                    name="email"
                    value={form.email}
                    onChange={handleInput}
                    type="email"
                    autoComplete="email"
                />
                <br />
                <label>First Name: </label>
                <input
                    required
                    name="firstname"
                    value={form.firstname}
                    onChange={handleInput}
                    autoComplete="given-name"
                />
                <br />
                <label>Last Name: </label>
                <input
                    required
                    name="lastname"
                    value={form.lastname}
                    onChange={handleInput}
                    autoComplete="family-name"
                />
                <br />
                <button type="submit" className="reg-button">
                    Register
                </button>
            </form>
        </div>
    );
};
