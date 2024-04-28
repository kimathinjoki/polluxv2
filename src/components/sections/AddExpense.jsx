import React, {useEffect, useState} from 'react';
import axios from "axios";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";


function AddExpense(){

    const [activity, setActivity] = useState([])
    const [splitType, setSplitType] = useState("")

    // get token and logged user id
	const userId = sessionStorage.getItem('user_id');
	const token = localStorage.getItem('token');

    useEffect(()=>{

		// gets all outgoing and open transaction

		axios.get(`http://127.0.0.1:3001/activity/active/${userId}`,{
			headers: {
			  'Authorization': `Bearer ${token}`
			}
		  })
		  .then((response)=>{
			console.log(response.data)
			setActivity(...activity, response.data.activity)
		  })
		  .catch((err)=>{
			console.log(err)
		  })

	},[])



    return (
        <>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-gray-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
            E
          </div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">Add an activity expense</h2>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <label className="leading-loose">Enter Activity</label>
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="activity"
              />
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">Expense description</label>
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Optional"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <label className="leading-loose">Date</label>
                <div className="relative focus-within:text-gray-600 text-gray-400">
                  <input
                    type="text"
                    className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="25/02/2020"
                  />
                  <div className="absolute left-3 top-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            

            <div>
            <div className="max-w-md mx-auto">
                <label htmlFor="select" className="font-semibold block py-2">
                Split Type:
                </label>
                <div className="relative">
                <div className="h-10 bg-white flex border border-gray-200 rounded items-center">
                    <input
                    defaultValue="split_type"
                    name="select"
                    id="select"
                    className="px-4 appearance-none outline-none text-gray-800 w-full"
                    defaultChecked=""
                    />
                    <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600">
                    <svg
                        className="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                    </button>
                    <label
                    htmlFor="show_more"
                    className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600"
                    >
                    <svg
                        className="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="18 15 12 9 6 15" />
                    </svg>
                    </label>
                </div>
                <input
                    type="checkbox"
                    name="show_more"
                    id="show_more"
                    className="hidden peer"
                    defaultChecked=""
                />
                <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
                    <div className="cursor-pointer group">
                    <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                        Equally
                    </a>
                    </div>
                    <div className="cursor-pointer group border-t">
                    <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                        Propotionaly
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
            </div>




            <div className="flex flex-col">
              <label className="leading-loose">Enter Amount</label>
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                
              />
            </div>
          </div>
          <div className="pt-4 flex items-center space-x-4">
            <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>{" "}
              Cancel
            </button>
            <button className="bg-gray-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
              <span> <FaPlus/> </span>Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      </>
      
    );
}


export default AddExpense;