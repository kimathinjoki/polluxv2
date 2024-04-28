import React, { useState, useEffect } from 'react';
import './Main.css';
import fast from '../resources/logo_cropped.png';
import { Link, Navigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import {
	AiOutlineHome,
	AiOutlineCreditCard,
	AiOutlineMobile,
	AiOutlineForm,
	AiOutlineWarning,
} from 'react-icons/ai';
import { RiPaypalLine } from 'react-icons/ri';
import { ImDownload, ImUpload } from 'react-icons/im';
import { GiTakeMyMoney } from 'react-icons/gi';
import {
	BsFileArrowDown,
	BsFileArrowUp,
	BsBrightnessHigh,
} from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';

import { Outlet } from 'react-router-dom';
import axios from 'axios';




function Main() {
	const [logged, setLogged] = useState(false);
	const [balance, setBalance] = useState(0);

	const userId = sessionStorage.getItem('user_id');

	function handleLogout() {

		fetch('http://127.0.0.1:3000/logout', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(() => {
			localStorage.removeItem('token');
			sessionStorage.removeItem('user_id');
			setLogged(true);
		});
	}

	if (logged) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<div>
				<div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-100 text-black dark:text-white">
					{/* Header */}
					<div className="fixed w-full flex items-center justify-between h-14 text-black z-10">
						<div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-violet-800 dark:bg-gray-100 border-none">
							<img
								src={fast}
								className="w-32 h-12 text-purple-600"
								viewBox="0 0 24 24"
							/>
							{/* <span className="hidden md:block">Old Men &copy; </span> */}
						</div>
						<div className="flex justify-between items-center h-14 bg-violet-800 dark:bg-gray-100 header-right">
							
							<ul className="flex items-center">
                                <li>
                                    <Link
                                    to="/main/add_activity"
                                    >
                                    <button
										className="flex items-center mr-4 hover:text-purple-600"
									>
										<span className="inline-flex mr-1">
                                            <FaPlus/>

										</span>
										Add Activity
									</button>
                                    </Link>
                                    </li>
								<li>
									<div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700" />
								</li>
								<li>
                                  

									<button
										className="flex items-center mr-4 hover:text-purple-600"
										onClick={handleLogout}
									>
										<span className="inline-flex mr-1">
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
												/>
											</svg>
										</span>
										Logout
									</button>
                                    
								</li>
							</ul>
						</div>
					</div>
					{/* ./Header */}

					{/* Sidebar */}
					<div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-violet-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
						<div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
							<ul className="flex flex-col py-4 space-y-1">
								<li className="px-5 hidden md:block">
									<div className="flex flex-row items-center h-8">
										<div className="text-sm font-light tracking-wide text-gray-400 uppercase">
											Main
										</div>
									</div>
								</li>

								<li>
									<Link
										to="/main"
										className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-violet-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-violet-500 dark:hover:border-gray-800 pr-6"
									>
										<span className="inline-flex justify-center items-center ml-4">
											<i>
												<AiOutlineHome />
											</i>
										</span>
										<span className="ml-2 text-sm tracking-wide truncate">
											Dashboard
										</span>
									</Link>
								</li>




								<li>
									<Link
										to="/main/add_activity"
										className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-violet-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-violet-500 dark:hover:border-gray-800 pr-6"
									>
										<span className="inline-flex justify-center items-center ml-4">
											<i>
                                            <FaPlus />

											</i>
										</span>
										<span className="ml-2 text-sm tracking-wide truncate">
											Add activity
										</span>
									</Link>
								</li>




								<li>
									<Link
										to="/main/settle"
										className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-violet-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-violet-500 dark:hover:border-gray-800 pr-6"
									>
										<span className="inline-flex justify-center items-center ml-4">
											<i>
                                            <FaPlus />

											</i>
										</span>
										<span className="ml-2 text-sm tracking-wide truncate">
											Add Expense
										</span>
									</Link>
								</li>

								


								<li>
									<Link
										to="/main/payment"
										className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-violet-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-violet-500 dark:hover:border-gray-800 pr-6"
									>
										<span className="inline-flex justify-center items-center ml-4">
											<i>
												<GiTakeMyMoney />
											</i>
										</span>
										<span className="ml-2 text-sm tracking-wide truncate">
											Activities
										</span>
									</Link>
								</li>

								<li>
									<Link
										to="/main/settle"
										className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-violet-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-violet-500 dark:hover:border-gray-800 pr-6"
									>
										<span className="inline-flex justify-center items-center ml-4">
											<i>
												<GiMoneyStack />
											</i>
										</span>
										<span className="ml-2 text-sm tracking-wide truncate">
											Settle
										</span>
									</Link>
								</li>



                                <li>
									<details className="group [&_summary::-webkit-details-marker]:hidden text-white-600 hover:text-white-800">
										<summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2  text-white-600 hover:text-white-800">
											<div className="flex items-center gap-2">
												<svg
													className="w-5 h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
													/>
												</svg>
												<span className="text-sm font-medium">
													{' '}
													Audit{' '}
												</span>
											</div>
											<span className="shrink-0 transition duration-300 group-open:-rotate-180">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
											</span>
										</summary>
										<nav
											aria-label="Teams Nav"
											className="mt-2 flex flex-col px-4"
										>

                                            <Link
												to="/main/owed"
												className="flex items-center gap-2 rounded-lg px-4 py-2 text-white-600 hover:text-white-800"
											>
												<i>
													<BsFileArrowDown />
												</i>

												<span className="text-sm font-medium"> activities </span>
											</Link>

											<Link
												to="/main/owed"
												className="flex items-center gap-2 rounded-lg px-4 py-2 text-white-600 hover:text-white-800"
											>
												<i>
													<BsFileArrowDown />
												</i>

												<span className="text-sm font-medium"> owed </span>
											</Link>

											<Link
												to="/main/owing"
												className="flex items-center gap-2 rounded-lg px-4 py-2 text-white-600 hover:text-white-800"
											>
												<i>
													<BsFileArrowUp />
												</i>

												<span className="text-sm font-medium"> owing </span>
											</Link>

											<Link
												to="/main/completed"
												className="flex items-center gap-2 rounded-lg px-4 py-2 text-white-600 hover:text-white-800"
											>
												<i>
													<BsBrightnessHigh />
												</i>

												<span className="text-sm font-medium"> Settled</span>
											</Link>

											<Link
												to="/main/disputed"
												className="flex items-center gap-2 rounded-lg px-4 py-2 text-white-600 hover:text-white-800"
											>
												<i>
													<AiOutlineWarning />
												</i>

												<span className="text-sm font-medium"> Disputed </span>
											</Link>
										</nav>
									</details>
								</li>


								<li className="px-5 hidden md:block">
									<div className="flex flex-row items-center mt-5 h-8">
										<div className="text-sm font-light tracking-wide text-gray-400 uppercase">
											Settings
										</div>
									</div>
								</li>
								<li>
									<Link
										to="/main/profile"
										className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-violet-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-violet-500 dark:hover:border-gray-800 pr-6"
									>
										<span className="inline-flex justify-center items-center ml-4">
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
										</span>
										<span className="ml-2 text-sm tracking-wide truncate">
											Profile
										</span>
									</Link>
								</li>
								<li>
									<Link
										to="/main/setting"
										className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-violet-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-violet-500 dark:hover:border-gray-800 pr-6"
									>
										<span className="inline-flex justify-center items-center ml-4">
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
										</span>
										<span className="ml-2 text-sm tracking-wide truncate">
											Settings
										</span>
									</Link>
								</li>
							</ul>
							<p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
								Copyright &copy; Red Jade 2024
							</p>
						</div>
					</div>
					{/* ./Sidebar */}

					{/* Routes */}

					<Outlet />


				</div>
			</div>
		</>
	);
}

export default Main;