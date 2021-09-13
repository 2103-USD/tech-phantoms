import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { updateCurrentUser, getCurrentUser} from "../api";

export const MyAccount = ({ user }) => {
    const history = useHistory();
    const [form, setForm] = useState({ username: "", email: "", firstname: "", lastname: ""});

    useEffect(() => {
        const callback = async () => {
            const usr = await getCurrentUser(user.id)
            setForm({ username: usr.username, email:usr.email, firstname: usr.firstName , lastname: usr.lastName })
        }
        callback();
    }, [user])
    
    const handleInput = (e) => {
        let value = e.target.value
        const name = e.target.name

        setForm({ ...form, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // try {
        //     await updateCurrentUser( {
        //         id: user.id,
        //         username: form.username,
        //         firstName: form.firstname,
        //         lastName: form.lastname,
        //         email: form.email,
        //     });

        //   toast(`The account for ${form.username} has been updated.`, { type: "success" });
        //     history.push("/orders")
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <div className="user-card">
            <h3>Update Your Account Information</h3>
            <h4>Only change fields that need to be updated.</h4>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleInput}
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
                />
                <label>Last Name: </label>
                <input
                    name="lastname"
                    value={form.lastname}
                    onChange={handleInput}
                />
                <button type="submit" className="reg-button">Update</button>
            </form>
        </div>
    );
};
