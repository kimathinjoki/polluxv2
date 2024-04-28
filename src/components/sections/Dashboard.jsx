import React, { useEffect, useState } from 'react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import {
	BsJournalArrowDown,
	BsJournalArrowUp,
	BsExclamationSquare,
	BsLayoutTextWindow,
} from 'react-icons/bs';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Dashboard() {
	const [owed, setowed] = useState(0);
	const [owing, setowing] = useState(0);
	const [disputedReceiver, setDisputedReceiver] = useState(0);
	const [disputedPayer, setDisputedPayer] = useState(0)
	const [transact, setTransact] = useState(false);
	const [owedTransactions, setowedTransactions] = useState([]);
	const [owingTransactions, setowingTransactions] = useState([]);
	const [balance, setBalance] = useState(0);

	const [show, setShow] = useState(false);

	function openModal() {
		console.log('modal opened');
		setShow(true);
	}

	function closeModal() {
		console.log('modal closed');
		setShow(false);
	}

	const userId = sessionStorage.getItem('user_id');
	const token = localStorage.getItem('token');

	useEffect(() => {
		// gets a users account

		axios
			.get(`http://127.0.0.1:3000/accounts/find/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response);
				setBalance(response.data.balance);
			})
			.catch((err) => {
				console.log(err);
			});

		// gets all owing and open transaction

      axios.get(`http://127.0.0.1:3000/transaction/owing/${userId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response)=>{
        console.log(response.data)
        setowing(response.data.total)
      })
	  .catch((err)=>{
		console.log(err)
	  })

		// gets all the user owed and open transactions

      axios.get(`http://127.0.0.1:3000/transaction/owed/${userId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response)=>{
        console.log(response.data)
        setowed(response.data.total)
      })
	  .catch((err)=>{
		console.log(err)
	  })

		// gets all the users transactions
		axios
			.get(`http://127.0.0.1:3000/transactions/all/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setowedTransactions(
					...owedTransactions,
					response.data.owed
				);
				setowingTransactions(
					...owingTransactions,
					response.data.owing
				);
			})
			.catch((err)=>{
				console.log(err)
			  });


			  //   get the disputed transaction

	axios.get(`http://127.0.0.1:3000/transaction/disputed/receiver/${userId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response)=>{
        console.log(response.data)
		setDisputedReceiver(response.data.total)

      })
	  .catch((err)=>{
		console.log(err)
	  })

	  axios.get(`http://127.0.0.1:3000/transaction/disputed/payer/${userId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response)=>{
        console.log(response.data)
		setDisputedPayer(response.data.total)

      })
	  .catch((err)=>{
		console.log(err)
	  })





	}, []);
	

	const disputed = Number(disputedReceiver) + Number(disputedPayer)

	function colorCode(t){
		if(t==="Open"){
			return <button className="px-3 py-1 font-semibold rounded-md dark:bg-blue-400 dark:text-gray-900">
			<span>{t}</span>
		</button>
		} else if(t === "Closed"){
			return <button className="px-3 py-1 font-semibold rounded-md dark:bg-green-400 dark:text-gray-900">
			<span>{t}</span>
		</button>
		}else if(t === "Disputed"){
			return <button className="px-3 py-1 font-semibold rounded-md dark:bg-red-400 dark:text-gray-900">
			<span>{t}</span>
		</button>
		}

	}


	if (transact) {
		return <Navigate to="/main/transact" />;
	}

	return (
		<>
			<div className="h-full ml-14 mt-14 mb-10 md:ml-64">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
					<div className="bg-violet-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-violet-600 dark:border-gray-600 text-white font-medium group">
						<div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
							<i
								width={30}
								height={30}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="stroke-current text-violet-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out text-2xl"
							>
								<MdOutlineAccountBalanceWallet />
							</i>
						</div>
						<div className="text-right">
							<p className="text-2xl">$ {balance}</p>
							<p>Balance</p>
						</div>
					</div>
					<div className="bg-violet-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-violet-600 dark:border-gray-600 text-white font-medium group">
						<div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
							<i
								width={30}
								height={30}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="stroke-current text-violet-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out text-2xl"
							>
								<BsJournalArrowDown />
							</i>
						</div>
						<div className="text-right">
							<p className="text-2xl">$ {owed}</p>
							<p>owed</p>
						</div>
					</div>
					<div className="bg-violet-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-violet-600 dark:border-gray-600 text-white font-medium group">
						<div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
							<i
								width={30}
								height={30}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="stroke-current text-violet-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out text-2xl"
							>
								<BsJournalArrowUp />
							</i>
						</div>
						<div className="text-right">
							<p className="text-2xl">$ {owing}</p>
							<p>owing</p>
						</div>
					</div>
					<div className="bg-violet-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-violet-600 dark:border-gray-600 text-white font-medium group">
						<div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
							<i
								width={30}
								height={30}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="stroke-current text-violet-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out text-2xl"
							>
								<BsExclamationSquare />
							</i>
						</div>
						<div className="text-right">
							<p className="text-2xl">$ {disputed}</p>
							<p>Disputed</p>
						</div>
					</div>
				</div>
				{/* ./Statistics Cards */}

				{/* tables of owed and owing transactions */}

				<div className=" mt-4 mx-4">
					<div className=" flex flex-wrap -mx-4">
						<div className="w-full  mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
							<div className="flex-grow flex flex-col dark:bg-gray-100 border-t border-b sm:rounded sm:border shadow overflow-auto dark:text-gray-700">
								<div className="min-h-full ml-12">
									<div className="border-b">
										<div className="flex justify-center px-6 -mb-px">
											<h3 className=" py-4 font-normal text-lg ">
												owed Transactions
											</h3>
										</div>
									</div>

									<div className="overflow-auto h-96 ">
										<table className="min-w-full  text-xs space-y-6 table text-gray-900  text-sm">
											<colgroup>
												<col />
												<col />
												<col />
												<col />
												<col />
												<col className="w-24" />
											</colgroup>
											<thead className="dark:bg-gray-200 space-y-6">
												<tr className="text-left">
													<th className="p-3">Activity</th>
													{/* <th className="p-3">main</th> */}
													<th className="p-3"></th>
													<th className="p-3">Completed</th>
													<th className="p-3 text-right">Amount</th>
													<th className="p-3">Status</th>
												</tr>
											</thead>
											<tbody classNamw="space-y-6">
												{owedTransactions?.map((t) => {
													return (
														<tr className="border-b border-opacity-20  dark:border-gray-100  dark:bg-gray-200 space-y-6">
															<td className="p-3">
																<p>{t.payer_id*20}</p>
															</td>
															<td className="p-3">
																<p>{t.created_at}</p>
																{/* <p className="dark:text-gray-400">Friday</p> */}
															</td>
															<td className="p-3">
																<p>{t.updated_at}</p>
																{/* <p className="dark:text-gray-400">Tuesday</p> */}
															</td>
															<td className="p-3 text-right">
																<p>$ {t.amount}</p>
															</td>
															<td className="p-3 text-right">
																	{colorCode(t.condition)}
																{/* <button className="px-3 py-1 font-semibold rounded-md dark:bg-green-400 dark:text-gray-900">
																	<span>{t.condition}</span>
																</button> */}
															</td>
														</tr>
													);
												})}

											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

						<div className=" relative w-full lg:w-1/2 px-4 text-gray-800 ">
							{/* Modal for dispute resolution */}
							{show ? (
								<div className="flex absolute justify-center z-50">
									<div className="flex flex-col  max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
										<h2 className="text-xl font-semibold leadi tracki">
											Dispute raised
										</h2>

										<p className="flex-1 dark:text-gray-400">
											{' '}
											Complete the Settlement or dispute
										</p>
										<div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
											<button
												className="px-6 py-2 rounded-sm"
												onClick={closeModal}
											>
												Complete
											</button>
											<button
												className="px-6 py-2 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900"
												onClick={closeModal}
											>
												Dispute
											</button>
										</div>
									</div>
								</div>
							) : null}

							<div className="dark:bg-gray-100 border-t border-b sm:rounded sm:border shadow">
								<div className="border-b">
									<div className="flex justify-center px-6 -mb-px">
										<h3 className=" py-4 font-normal text-lg">
											Owing
										</h3>
									</div>
								</div>

								<div className="overflow-auto h-96">
									<div className="text-center px-6 py-4">
										<table className="min-w-full text-xs space-y-6 table text-gray-900">
											<colgroup>
												<col />
												<col />
												<col />
												<col />
												<col />
												<col className="w-24" />
											</colgroup>
											<thead className="dark:bg-gray-200 space-y-6">
												<tr className="text-left">
													<th className="p-3">Activity</th>
													<th className="p-3">Expense</th>
													<th className="p-3">Completed</th>
													<th className="p-3 text-right">Amount</th>
													<th className="p-3">Status</th>
												</tr>
											</thead>
											<tbody classNamw="space-y-6">
												{owingTransactions?.map((t) => {
													return (
														<tr className="border-b border-opacity-20  dark:border-gray-100  dark:bg-gray-200">
															<td className="p-3">
																<p>{t.id*2023}</p>
															</td>
															<td className="p-3">
																<p>{t.created_at}</p>
																{/* <p className="dark:text-gray-400">Friday</p> */}
															</td>
															<td className="p-3">
																<p>{t.updated_at}</p>
																{/* <p className="dark:text-gray-400">Tuesday</p> */}
															</td>
															<td className="p-3 text-right">
																<p>${t.amount}</p>
															</td>
															<td className="p-3 text-right">
																{colorCode(t.condition)}
																{/* <button
																	type="button"
																	className="px-3 py-1 cursor-pointer font-semibold rounded-md dark:bg-green-400 dark:text-gray-900"
																	onclick={openModal}
																>
																	<span>{t.condition}</span>
																</button> */}
															</td>
														</tr>
													);
												})}

											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* {show ?
<div className="flex absolute justify-center z-50">
<div className="flex flex-col  max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
	<h2 className="text-xl font-semibold leadi tracki">Dispute raised</h2>

	<p className="flex-1 dark:text-gray-400"> Complete the transaction or dispute the transaction
	</p>
	<div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
		<button className="px-6 py-2 rounded-sm"
		onClick={closeModal}
		>Complete</button>
		<button className="px-6 py-2 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900"
		onClick={closeModal}
		>Dispute</button>
	</div>
</div>
</div>: null } */}
			</div>
		</>
	);
}

export default Dashboard;