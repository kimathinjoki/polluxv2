import './Register.scss';
import NavbarTop from '../navbar/NavbarTop';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fast from '../resource/fast-forward.png';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_NUMBER_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Register() {
	const [home, setHome] = useState(false);
	const [first_name, setFirst_name] = useState('');
	const [last_name, setLast_name] = useState('');
	// const [passwordTwo, setPasswordTwo] = useState('');
	const [notMatch, setNotMatch] = useState('noShow');
	const [signIn, setSignIn] = useState(false);

	// Username field states:
	const [username, setUsername] = useState('');
	const [validName, setValidName] = useState(false);
	const [usernameFocus, setUsernameFocus] = useState(false);

	// Email field states:
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	// Password field states:
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	// Phone Number field states
	const [phone_number, setPhone_number] = useState('');
	const [validNumber, setValidPhoneNumber] = useState(false);
	const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);



	useEffect(() => {
		const result = USER_REGEX.test(username);
		setValidName(result);
	}, [username]);

	useEffect(() => {
		const result = PWD_REGEX.test(password);
		setValidPassword(result);
	}, [password]);

	useEffect(() => {
		const result = PHONE_NUMBER_REGEX.test(phone_number);
		setValidPhoneNumber(result);
	}, [phone_number]);

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		setValidEmail(result);
	}, [email]);

	if (home) {
		return <Navigate to="/" />;
	}

	if (signIn) {
		return <Navigate to="/login" />;
	}

	// function pass(){
	//   if(passwordOne === passwordTwo){
	//     return setPassword(passwordTwo)
	//   }else{
	//     return setNotMatch('show')
	//   }
	// }

	function handleRegister(e) {
		e.preventDefault();
		// pass()
		axios
			.post('http://127.0.0.1:3000/register', {
				first_name,
				last_name,
				username,
				phone_number,
				email,
				password,
			})
			.then((response) => {
				if (response.status === 201) {
					console.log(response);
					const userId = response.data.id;
					// const token = response.data.token
					const balance = 0;
					// setUserId(response.data.user.id)
					// setBalance(0.0)
					// setToken(response.data.token)
					// new_account(response.data.user.id, 0.00)

					axios
						.post('http://127.0.0.1:3000/accounts/new', {
							user_id: userId,
							balance: balance,
						})
						.then((response) => {
							console.log(response.data);
						})
						.then((response) => {
							console.log(response);
							// setBalance(response.data.balance)
						})
						.catch((err) => {
							console.log(err);
						});

					setSignIn(true);
				} else if (response.status === 422) {
					console.log(response.data.data.email[0]);
					// setMessage(response.data.data.email[0])
					setNotMatch('show');
				}
			})
			.catch((err) => {
				console.log(err);
			});
			;
	}

	function countOccurrences(str, char) {
		let count = 0;

		for (let i = 0; i < str.length; i++) {
			if (str.charAt(i) === char) {
				count++;
			}
		}

		return count;
	}

	return (
		<>
			{/* Navbar */}

			<div className="bg-gray-100 font-sans w-full m-0">
				<div className="bg-white shadow">
					<div className="container mx-auto px-4">
						<div className="flex items-center justify-between py-4">
							<div
								onClick={() => {
									return setHome(true);
								}}
							>
								<img
									src={fast}
									className="w-4 h-4 text-purple-600"
									viewBox="0 0 24 24"
									onClick={() => setHome(true)}
								></img>
							</div>

							<div className="hidden sm:flex sm:items-center">
								<h3 className="text-gray-800  font-semibold hover:text-purple-600 mr-4">
									Register
								</h3>
							</div>

							<div className="hidden sm:flex sm:items-center">
								<Link
									to="/login"
									className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
								>
									Sign In
								</Link>
							</div>
							<div className="sm:hidden cursor-pointer">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6 text-purple-600"
									viewBox="0 0 24 24"
								>
									<path
										fill="currentColor"
										d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				{/* code here */}
				<div className="card">
					<form className="card-form" onSubmit={handleRegister}>
						<div className="input">
							<input
								id="first_name"
								type="text"
								className="input-field"
								required
								value={first_name}
								onChange={(e) => setFirst_name(e.target.value)}
							/>
							<label className="input-label" htmlFor="first_name">
								First Name
							</label>
						</div>

						<div className="input">
							<input
								id="last-name"
								type="text"
								className="input-field"
								required
								value={last_name}
								onChange={(e) => setLast_name(e.target.value)}
							/>
							<label className="input-label" htmlFor="last-name">
								Last Name
							</label>
						</div>

						<div className="input">
							<input
								id="username"
								type="text"
								className="input-field"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								aria-invalid={validName ? 'true' : 'false'}
								aria-describedby="usernameerrornote"
								onFocus={() => setUsernameFocus(true)}
								onBlur={() => setUsernameFocus(false)}
							/>
							<label className="input-label" htmlFor="username">
								Username
							</label>
							<div
								id="usernameerrornote"
								className={
									username && usernameFocus && !validName
										? 'err-message'
										: 'offscreen'
								}
							>
								{username.length < 4 || username.length > 24 ? (
									<span>
										<FaInfoCircle /> <p>4 to 24 characters</p>
									</span>
								) : null}
								{!/^[A-Za-z]/.test(username) && (
									<span className="err-text">
										<FaInfoCircle /> <p> Must begin with a letter</p>
									</span>
								)}
								<span>
									<FaInfoCircle />{' '}
									<p>Letters, numbers, underscores, hyphens allowed.</p>
								</span>
							</div>
						</div>

						<div className="input">
							<input
								id="phone_number"
								type="text"
								className="input-field"
								required
								value={phone_number}
								onChange={(e) => {
									setPhone_number(e.target.value);
								}}
								aria-invalid={validNumber ? 'true' : 'false'}
								aria-describedby="phonenumbererrornote"
								onFocus={() => setPhoneNumberFocus(true)}
								onBlur={() => setPhoneNumberFocus(false)}
							/>
							<label className="input-label" htmlFor="phone_number">
								Phone Number
							</label>
							<div
								id="phonenumbererrornote"
								className={
									phone_number && phoneNumberFocus && !validNumber
										? 'err-message'
										: 'offscreen'
								}
							>
								{' '}
								{!phone_number.startsWith('+254') && (
									<span>
										<FaInfoCircle />
										<p>Must start with +254</p>
									</span>
								)}
								{phone_number.length !== 13 && (
									<span>
										{' '}
										<FaInfoCircle /> <p> Must be 12 digits long </p>
									</span>
								)}
								{/[a-zA-Z!@#$]/.test(phone_number) && (
									<span>
										<FaInfoCircle />
										<p>Letters, underscores and hyphens not allowed.</p>
									</span>
								)}
							</div>
						</div>

						<div className="input">
							<input
								id="email"
								type="text"
								className="input-field"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								aria-invalid={validNumber ? 'true' : 'false'}
								aria-describedby="emailerrornote"
								onFocus={() => setEmailFocus(true)}
								onBlur={() => setEmailFocus(false)}
							/>
							<label className="input-label" htmlFor="email">
								Email
							</label>

							<div
								id="emailerrornote"
								className={
									email && emailFocus && !validEmail
										? 'err-message'
										: 'offscreen'
								}
							>
								{email.startsWith('@') && (
									<span>
										{' '}
										<FaInfoCircle /> <p>Cannot start with @ </p>{' '}
									</span>
								)}
								{email.startsWith('.') && (
									<span>
										<FaInfoCircle />
										<p>Cannot start with .</p>
									</span>
								)}
								{countOccurrences(email, '@') !== 1 && (
									<span>
										{' '}
										<FaInfoCircle />
										<p>Can only have one @</p>
									</span>
								)}
								<span>
									<FaInfoCircle />
									<p> Must have a .</p>
								</span>
							</div>
						</div>

						<div className="input">
							<input
								id="password"
								type="password"
								className="input-field"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								aria-invalid={validPassword ? 'true' : 'false'}
								aria-describedby="passworderrornote"
								onFocus={() => setPasswordFocus(true)}
								onBlur={() => setPasswordFocus(false)}
							/>
							<label className="input-label" htmlFor="password">
								Password
							</label>
							<div
								id="passworderrornote"
								className={
									password && passwordFocus && !validPassword
										? 'err-message'
										: 'offscreen'
								}
							>
								{password.length < 8 || password.length > 24 ? (
									<span>
										<FaInfoCircle />
										<p>8 to 24 characters</p>
									</span>
								) : null}
								{!/[A-Z]/.test(password) && (
									<span>
										<FaInfoCircle />
										<p> Must include uppercase letters</p>
									</span>
								)}
								{!/[a-z]/.test(password) && (
									<span>
										<FaInfoCircle />
										<p>Must include lowercase letters</p>
									</span>
								)}
								{!/[\d]/.test(password) && (
									<span>
										{' '}
										<FaInfoCircle /> <p>Must include a number</p>{' '}
									</span>
								)}
								{!/[!@#$%]/.test(password) && (
									<div className="special-chars-err-msg">
										<span>
											<FaInfoCircle />
											<p>
												Must include a special character. Allowed special
												characters:
											</p>
										</span>

										<div className="allowed-special-characters">
											
											<span aria-label="exclamation mark">{'!'}</span>
											<span aria-label="at symbol">@</span>
											<span aria-label="hashtag">#</span>
											<span aria-label="dollar sign">$</span>
											<span aria-label="percent">%</span>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="action">
							<button
								className={
									!validEmail || !validName || !validNumber || !validPassword
										? 'disabled-action-button'
										: 'action-button'
								}
								disabled={
									!validEmail || !validName || !validNumber || !validPassword
								}
							>
								Get started
							</button>
						</div>
					</form>
					<div className="card-info">
						<p className={notMatch}> Username or email exists</p>
						<p>
							By signing up you are agreeing to our{' '}
							<Link to="/conditions">Terms and Conditions</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;