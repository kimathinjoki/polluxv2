import React, {useEffect, useState} from 'react';
import { TbSquareArrowDown } from 'react-icons/tb';
import axios from "axios";

function Owed() {
	const tableHeads = ['Activity', 'Name', 'Date', 'Amount', 'Request', 'Expenses'];
	// set owed transactions
	const [owed, setOwed] = useState([])

	// get token and logged user id
	const userId = sessionStorage.getItem('user_id');
	const token = localStorage.getItem('token');

	// modal show
	const [showModal, setShowModal] = useState(false);

	// transaction id
	const [transId, setTransId ] = useState(0)



	function openModal(){
		console.log("modal opened")

		setShowModal(true)
	}

	function closeModal() {
		setShowModal(false);
	}





	 useEffect(()=>{
		axios.get(`http://127.0.0.1:3001/owed/${userId}`,{
			headers: {
				'Authorization': `Bearer ${token}`
			  }
		})
		.then((response)=>{
			console.log(response)
			// setOwed(...owed,response.data.transactions)
		})
		.catch((err) => {
			console.log(err);
		});
	 },[])



	function getClient(id){
		let client
		axios.get(`http://127.0.0.1:3001/users/${id}`)
				.then((response)=>{
				client = response.data.username
				})
				.catch((err)=>{
					console.log(err)
				})
		return client
	}


	return (
		<>
			<div className="flex justify-center">
				<span className="flex mt-20 bg-violet-400 p-4 py-3.5 rounded-full text-black align-baseline">
					<TbSquareArrowDown className="self-center text-3xl" />
					<p className="whitespace-nowrap text-3xl">Owed</p>
				</span>
			</div>

			<div className="container relative sm:p-20 dark:text-gray-500 mx-auto justify-center flex">
				<div className="overflow-x-auto">
					<table className="min-w-full">
						<colgroup>
							<col />
							<col />
							<col />
							<col />
							<col />
							<col className="w-24" />
						</colgroup>
						<thead className="dark:bg-gray-200">
							<tr className="text-left">
								{tableHeads.map((tableHead, index) => (
									<th className="p-5" key={index}>
										{tableHead}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{owed?.map((transaction)=>{
							return <tr className="border-b border-opacity-20  dark:border-gray-100 dark:bg-gray-200">
								<td className="p-3">
									<p>{transaction.id*657382}</p>
								</td>
								<td className="p-3">
									<p>{getClient(transaction.id)}</p>
								</td>
								<td className="p-3">
									<p>{transaction.created_at}</p>
									<p className="dark:text-gray-400"></p>
								</td>
								<td className="p-3">
									<p>{transaction.updated_at}</p>
									<p className="dark:text-gray-400"></p>
								</td>
								<td className="p-3 text-right">
									<p>$ {transaction.amount}</p>
								</td>
								<td className="p-3 text-right">
									<button 
									type="button"
									className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
									onClick={()=>{
										setTransId(transaction.id)
										openModal()
									}}
									>
										<span>View</span>
									</button>
								</td>
                                <td className="p-3 text-right">
									<button 
									type="button"
									className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
									onClick={()=>{
										// setTransId(transaction.id)
										openModal()
									}}
									>
										<span>View</span>
									</button>
								</td>
                                
							</tr>})}

                            <tr className="border-b border-opacity-20  dark:border-gray-100 dark:bg-gray-200">
								<td className="p-3">
									<p>Hawai Trip</p>
								</td>
								<td className="p-3">
									<p>Mat G.</p>
								</td>
								<td className="p-3">
									<p>01/02/2024</p>
									<p className="dark:text-gray-400">Friday</p>
								</td>
								<td className="p-3 text-right">
									<p>$ 59</p>
								</td>
								<td className="p-3 text-right">
									<button 
									type="button"
									className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
									onClick={()=>{
										// setTransId(transaction.id)
										openModal()
									}}
									>
										<span>View</span>
									</button>
								</td>
                                <td className="p-3 text-right">
									<button 
									type="button"
									className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
									onClick={()=>{
										// setTransId(transaction.id)
										// openModal()
									}}
									>
										<span>View</span>
									</button>
								</td>
                                
							</tr>

		
						</tbody>
					</table>
				</div>

				{showModal ? (
					<div className="flex absolute justify-center z-50">
						<div className="flex flex-col  max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
							<h2 className="text-xl font-semibold leadi tracki">
								Request Payment
							</h2>

							<p className="flex-1 dark:text-gray-400">
								{' '}
								Raise a dispute on this transaction
							</p>
							<div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
								<button className="px-6 py-2 rounded-sm shadow-sm dark:bg-green-600 dark:text-gray-900" onClick={()=>{
									closeModal()
									}}>
									Request
								</button>
								<button
									className="px-6 py-2 rounded-sm shadow-sm dark:bg-red-600 dark:text-gray-900"
									onClick={()=>{
										closeModal()
									}
								}
								>
									Dispute
								</button>
							</div>
						</div>
					</div>
				) : null}

			</div>
		</>
	);
}

export default Owed;