import { useState,  useEffect } from "react";
import axios from "axios";





function Profile() {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [phone, setPhone] = useState("")



    const id = sessionStorage.getItem('user_id')

        useEffect(()=>{
            axios.get(`http://127.0.0.1:3000/users/${id}`)
				.then((response)=>{
                    setFname(response.data.first_name)
                    setLname(response.data.last_name)
				    setUserName(response.data.username)
                    setEmail(response.data.email)
                    setPhone(response.data.phone_number)
				})
				.catch((err)=>{
					console.log(err)
				})
        },[])




	return (
		<>

        <div className="py-6 mt-6">
        <div className="flex justify-center mt-6">
        <div className="flex flex-col p-6 border   dark:text-gray-800">
            <img src="https://images.pexels.com/photos/3635539/pexels-photo-3635539.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square" />
            <div className="text-center">
                <h2 className="text-xl font-semibold">{fname} {lname}</h2>
                <span className="block pb-2 text-sm dark:text-gray-400">{userName}</span>
            </div>
            <hr className="mt-6 border-b-1 border-violetGray-300" />
            <div className="space-y-2 mt-2 ">
                    <span className="flex items-center  space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                            <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                        </svg>
                        <span className="dark:text-gray-400">{email}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
                            <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
                        </svg>
                        <span className="dark:text-gray-400">{phone}</span>
                    </span>
                </div>
        </div>
        </div>
        </div>
		
		
		</>
	);
}

export default Profile;