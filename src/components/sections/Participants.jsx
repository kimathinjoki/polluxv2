import React, {useState, useEffect} from "react";
import axios from "axios";
import { TbSquareArrowUp } from 'react-icons/tb';

function Owing() {
	const tableHeads = ['Activity', 'Name', 'Total Contributed'];

	const [showModal, setShowModal] = useState(false);

	const [transId, setTransId ] = useState(0)
	const [owing, setOwing] = useState([])
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

		axios.get(`http://127.0.0.1:3001/owing/${userId}`,{
			headers: {
			  'Authorization': `Bearer ${token}`
			}
		  })
		  .then((response)=>{
			console.log(response.data)
			setOwing(...owing, response.data.transactions)
		  })
		  .catch((err)=>{
			console.log(err)
		  })

	},[])



	function completeTransaction(){
		axios.post(`http://127.0.0.1:3001/transaction/condition/${transId}`,{
			"condition": 1
		},{
			headers:{
				"Authorization": `Bearer ${token}`
			  }
		})
		.then((response)=>{
			const receiver = response.data.receiver_id
			const payer = response.data.payer_id
			const amount = response.data.amount
			// amending payer balance
			axios.post(`http://127.0.0.1:3001/accounts/minus/${payer}`,{
				"balance": Number(amount)
			},{
				headers:{
					"Authorization": `Bearer ${token}`
				  }
			}).then((response)=>{
				console.log(response)
			})
			.catch((err)=>{
				console.log(err)
			})

			// amending receiver balance

			axios.post(`http://127.0.0.1:3001/accounts/add/${receiver}`,{
				"balance": Number(amount)
			},{
				headers:{
					"Authorization": `Bearer ${token}`
				  }
			}).then((response)=>{
				console.log(response)
			})
			.catch((err)=>{
				console.log(err)
			})

			

		})

	}

	function setDispute(){
		axios.post(`http://127.0.0.1:3001/transaction/condition/${transId}`,{
			"condition": 2
		},{
			headers:{
				"Authorization": `Bearer ${token}`
			  }
		})
	

	}

	function removeFromList(id){
		setOwing((t)=>t.filter((b)=>b.id !== id))
	}

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

			return(
				<>

			{/* the badge */}

			<div className="flex items-center justify-center">
				<span className="inline-flex mt-20 rounded-full bg-orange-300 px-4 py-3.5 text-black">
					<TbSquareArrowUp className="self-center text-3xl" />
					<p className="whitespace-nowrap text-3xl">Hawai Trip</p>
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
						{owing?.map((transaction)=>{
							return <tr className="border-b border-opacity-20  dark:border-gray-100 dark:bg-gray-200">
								<td className="p-3">
									<p>{transaction.id * 48673}</p>
								</td>
								<td className="p-3">
									<p>{getClient(transaction.receiver_id)}</p>
								</td>
								<td className="p-3">
									<p>{transaction.created_at}</p>
								</td>
								<td className="p-3">
									<p>{transaction.updated_at}</p>
									
								</td>
								<td className="p-3 text-right">
									<p>$ {transaction.amount}</p>
								</td>
								
							</tr>
							})}

							
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
									completeTransaction()
									removeFromList(transId)
									closeModal()
									}}>
									Complete
								</button>
								<button
									className="px-6 py-2 rounded-sm shadow-sm dark:bg-red-600 dark:text-gray-900"
									onClick={()=>{
										setDispute()
										removeFromList(transId)
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

export default Participants;