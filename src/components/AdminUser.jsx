import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./style.css";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { adminUpdateUser, getSpecificUser} from "../api";

export const AdminUser = () => {
    const {userId} = useParams();
    const history = useHistory();
    const [form, setForm] = useState({ username: "", email:"", firstname: "", lastname: "", admin:false, isActive:true });
    
    useEffect(() => {
        const callback = async () => {
            const usr = await getSpecificUser(userId)
            setForm({ username: usr.username, email:usr.email, firstname: usr.firstName , lastname: usr.lastName, admin:usr.isAdmin, isActive:usr.isActive })
        }
        callback();
    }, [userId])
    
    
    const handleInput = (e) => {
        let value = e.target.value
        const name = e.target.name
        if (name === "admin" || name ==="isActive") {
            value = Boolean(e.target.checked)
        }
        setForm({ ...form, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminUpdateUser( {
                id: userId,
                username: form.username,
                firstName: form.firstname,
                lastName: form.lastname,
                email: form.email,
                isAdmin: form.admin,
                isActive: form.isActive
            });
            toast(`The account for ${form.username} has been updated.`, { type: "success" });
            history.push("/admin/users")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="user-card">
            <h3>Update User information for </h3>
            <h4>Only change fields that need to be updated for the user.</h4>
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
                <label>Site Admin: </label>
                <input
                    name="admin"
                    type="checkbox"
                    checked={form.admin}
                    onChange={handleInput}
                />
                <label>Active Account: </label>
                <input
                    name="isActive"
                    type="checkbox"
                    checked={form.isActive}
                    onChange={handleInput}
                />
                <button type="submit" className="reg-button">Update</button>
            </form>
        </div>
    );
};
