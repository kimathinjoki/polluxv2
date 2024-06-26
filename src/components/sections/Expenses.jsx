import React, {useState, useEffect} from "react";
import axios from "axios";
import { TbSquareArrowUp } from 'react-icons/tb';

function Expenses() {
	const tableHeads = ['Activity', 'Expense', 'Paid By', 'Date', 'Amount'];

	const [showModal, setShowModal] = useState(false);

	const [actvId, setActvId ] = useState(0)
	const [activities, setActivities] = useState([])
	const [client, setClient] = useState("")

	// const [receiver_id, setReceiver_id] = useState(0)
	// const [payer_id, setPayer_id] =useState(0)

	const token = localStorage.getItem('token')
	const userId = sessionStorage.getItem('user_id')



	function openModal(){
		console.log("modal opened")

		setShowModal(true)
	}

	function closeModal() {
		setShowModal(false);
	}


	useEffect(()=>{

		// gets all outgoing and open transaction

		axios.get(`http://127.0.0.1:3001/activities/${userId}`,{
			headers: {
			  'Authorization': `Bearer ${token}`
			}
		  })
		  .then((response)=>{
			console.log(response.data)
			setActivities(...activities, response.data.activities)
		  })
		  .catch((err)=>{
			console.log(err)
		  })

	},[])

	function removeFromList(id){
		setActivities((t)=>t.filter((b)=>b.id !== id))
	}

	function getParticipants(id){
		let participants
		axios.get(`http://127.0.0.1:3001/activities/user/${id}`)
				.then((response)=>{
				participants = response.data.username
				})
				.catch((err)=>{
					console.log(err)
				})
		return participants
	}

		return(
				<>

			{/* the badge */}

			<div className="flex items-center justify-center">
				<span className="inline-flex mt-20 rounded-full bg-orange-300 px-4 py-3.5 text-black">
					<TbSquareArrowUp className="self-center text-3xl" />
					<p className="whitespace-nowrap text-3xl">Hawai Trip Expenses</p>
				</span>
			</div>

			{/* the incoming data table */}

			<div className=" relative container p-2  sm:p-20 dark:text-gray-500 mx-auto justify-center flex ">
				<div className="relative overflow-x-auto">
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
						{activities?.map((transaction)=>{
							return <tr className="border-b border-opacity-20  dark:border-gray-100 dark:bg-gray-200">
								<td className="p-3">
									<p>{transaction.expense}</p>
								</td>
								<td className="p-3">
									<p>{transaction.created_at}</p>
									{/* <p className="dark:text-gray-400">Friday</p> */}
								</td>
								<td className="p-3">
									<p>{transaction.Amount}</p>
									{/* <p className="dark:text-gray-400">Tuesday</p> */}
								</td>
								<td className="p-3 text-right">
									<p>$ {transaction.participant}</p>
								</td>
							</tr>
							})}

                            <tr className="border-b border-opacity-20  dark:border-gray-100 dark:bg-gray-200">
								<td className="p-3">
									<p>Hawai Trip</p>
								</td>
								<td className="p-3">
									<p>Gas</p>
									
								</td>
                                <td className="p-3">
									<p>Adam</p>
									
								</td>
								<td className="p-3">
									<p>01/03/2024</p>
				
								</td>
								<td className="p-3 text-right">
									<p>$ 46</p>
								</td>
							</tr>
                            <tr className="border-b border-opacity-20  dark:border-gray-100 dark:bg-gray-200">
								<td className="p-3">
									<p>Hawai Trip</p>
								</td>
								<td className="p-3">
									<p>Groceries</p>
									
								</td>
                                <td className="p-3">
									<p>Rui</p>
									
								</td>
								<td className="p-3">
									<p>01/03/2024</p>
				
								</td>
								<td className="p-3 text-right">
									<p>$ 104</p>
								</td>
							</tr>

                            <tr className="border-b border-opacity-20  dark:border-gray-100 dark:bg-gray-200">
								<td className="p-3">
									<p>Hawai Trip</p>
								</td>
								<td className="p-3">
									<p>Airbnb</p>
									
								</td>
                                <td className="p-3">
									<p>Kim</p>
									
								</td>
								<td className="p-3">
									<p>01/04/2024</p>
				
								</td>
								<td className="p-3 text-right">
									<p>$ 528</p>
								</td>
							</tr>

							
						</tbody>
					</table>
				</div>

				{/* Modal for dispute resolution */}

				{showModal ? (
					<div className="flex absolute justify-center z-50">
						<div className="flex flex-col  max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
							<h2 className="text-xl font-semibold leadi tracki">
								Participants
							</h2>

							<div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
								<button className="px-6 py-2 rounded-sm shadow-sm dark:bg-green-600 dark:text-gray-900" onClick={()=>{
	
									removeFromList(actvId)
									closeModal()
									}}>
									
								</button>
								<button
									className="px-6 py-2 rounded-sm shadow-sm dark:bg-red-600 dark:text-gray-900"
									onClick={()=>{
				
										removeFromList(actvId)
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

export default Expenses;