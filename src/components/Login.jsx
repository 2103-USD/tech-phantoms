import React, { useState } from 'react';
import axios from 'axios';
import { storeCurrentUser } from '../auth';

const Login = ({ setUser }) => {
	const [form, setForm] = useState({ username: '', password: '' });

	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('', {
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
			<h1>Login</h1>

			<form onSubmit={handleSubmit}>
				<label>Username</label>
				<input name="username" value={form.username} onInput={handleInput} />
				<label>Password</label>
				<input
					name="password"
					value={form.password}
					onInput={handleInput}
					type="password"
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
z;
