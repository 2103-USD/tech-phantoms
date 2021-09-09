import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../api";
import "./style.css";

export const AdminUsers = ({ user }) => {
    const [siteUsers, setSiteUsers] = useState([getAllUsers()]);

    const handleUsers = async () => {
        const res = await getAllUsers();
        if (res.length > 0) setSiteUsers(res);
    };

    useEffect(() => {
        handleUsers();
    }, []);

    return (
        <div className="admin-users">
            <h3>User accounts currently registered on the site:</h3>
            <br/>
            <br/>
            <div>
                <table className="userList">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Admin?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {siteUsers.map(({id, username, firstName, lastName, email, isAdmin}) => {
                            return( 
                            <tr key={`UserList${id}`}>
                                <td>{username}</td>
                                <td>{firstName}</td>
                                <td>{lastName}</td>
                                <td>{email}</td>
                                <td>{isAdmin ? "Yes": ""}</td>
                                <td><Link to={`/Admin/User/${id}`}>Edit user details</Link></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
