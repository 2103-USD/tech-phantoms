import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./style.css";
import { adminUpdateUser, getSpecificUser} from "../api";

export const AdminUser = () => {
    const {userId} = useParams();
    const [user, setUser] = useState([]);
    const history = useHistory();
    const [form, setForm] = useState({ username: "", email:"", firstname: "", lastname: "", admin:false });
    
    useEffect(() => {
        const callback = async () => {
            const usr = await getSpecificUser(userId)
            console.log(usr)
            setUser(usr);
            setForm({ username: usr.username, email:usr.email, firstname: usr.firstName , lastname: usr.lastName, admin:usr.isAdmin })
        }
        callback();
    }, [userId])
    
    
    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await adminUpdateUser( {
                id: userId,
                username: form.username,
                firstName: form.firstname,
                lastName: form.lastname,
                email: form.email,
                isAdmin: form.admin
            });
            setUser(res.user)
            history.push("/admin/users")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
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
                    value={form.admin}
                    onChange={handleInput}
                />
                <button type="submit" className="reg-button">Update</button>
            </form>
        </div>
    );
};
