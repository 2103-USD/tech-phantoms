import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import { registerNewUser} from "../api";

export const Register = ({ setUser }) => {
    const [form, setForm] = useState({ username: "", password: "", confirmpassword: "", firstname: "", lastname: "", email:""});

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerNewUser( {
                username: form.username,
                password: form.password,
                firstName: form.firstname,
                lastName: form.lastname,
                email: form.email,
            });
            setUser(res.user)
            history.push("/")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleInput}
                    autoComplete = "username"
                />
                <br />
                <label>Password: </label>
                <input
                    name="password"
                    value={form.password}
                    onChange={handleInput}
                    type="password"
                    autoComplete = "new-password"
                />
                <label>Confirm Password: </label>
                <input
                    name="confirmpassword"
                    value={form.confirmpassword}
                    onChange={handleInput}
                    type="password"
                    autoComplete = "new-password"
                />
                <br />
                <label>Email Address: </label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleInput}
                    type="email"
                    autoComplete = "email"
                />
                <br />
                <label>First Name: </label>
                <input
                    name="firstname"
                    value={form.firstname}
                    onChange={handleInput}
                    autoComplete = "given-name"
                />
                <label>Last Name: </label>
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
