import './Login.scss';
import NavbarTop from '../navbar/NavbarTop';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLogged, setIsLogged] = useState(false);

	if (isLogged) {
		return <Navigate to="/main" />;
	}

	function handleLogin(e) {
		e.preventDefault();
		axios
			.post('http://127.0.0.1:3001/login', {
				email,
				password,
			})
			.then((response) => {
				if (response.status === 200) {
					console.log(response);
					const user_id = response.data.userId;
					sessionStorage.setItem('user_id', user_id);
					const token = response.data.token;
					localStorage.setItem('token', token);
					setIsLogged(true);
				}
			});
	}

	return (
		<>
			<NavbarTop />

			<div className="container">
				{/* code here */}
				<div className="card">
					<div className="card-image">
						<h2 className="card-heading">
							Welcome back
							{/* <small>Login</small> */}
						</h2>
					</div>
					<form className="card-form" onSubmit={handleLogin}>
						<div className="input">
							<input
								type="text"
								className="input-field"
								required=""
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label className="input-label">Email</label>
						</div>
						<div className="input">
							<input
								type="password"
								className="input-field"
								required=""
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label className="input-label">Password</label>
						</div>

						<div className="action">
							<button className="action-button">Login</button>
						</div>
					</form>
					<div className="card-info">
						<p>
							<a href="#">Forgot Password?</a>

							<Link to="/register">Register</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;