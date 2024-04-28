import React, { useState } from "react";
import Navbar from "./navbar/Navbar";
import { Navigate } from "react-router-dom";  



function Landingpage(){


    const [home, setHome] = useState(false)


    if(home){
        return <Navigate to="/register"/>
    }

    return(

        <>

<Navbar/>


<section>
  <div className="dark:bg-violet-400">
    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900">
      <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-900">
        Pollux
      </h1>
      <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">
        Split your expense with no stress.
      </p>
      <div className="flex flex-wrap justify-center">
        <button
          type="button"
          className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-800 dark:text-gray-50"
        onClick={()=> setHome(true)}
        >
            Get Started
        </button>
        <button
          type="button"
          className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-700 dark:text-gray-900"
        >
          Learn more
        </button>
      </div>
    </div>
  </div>
  {/* <img
    src="https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg"
    alt=""
    className="w-5/6 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 dark:bg-gray-500"
  /> */}
</section>


<div className="py-0.5 text-sm text-center dark:text-gray-400"></div>
 

<section className="p-6 dark:bg-gray-800 dark:text-gray-100">
	<div className="container mx-auto">
		<span className="block mb-2 text-xs font-medium tracking-widest text-center uppercase dark:text-violet-400">How it works</span>
		<h2 className="text-5xl font-bold text-center dark:text-gray-50"> Easy Steps </h2>
		<div className="grid gap-6 my-16 lg:grid-cols-3">
			<div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
				<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">1</div>
				<p className="text-2xl font-semibold">
					<b> Create activity</b> Create the activity you want to share cost
				</p>
			</div>


			<div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
				<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">2</div>
				<p className="text-2xl font-semibold">
					<b> Add participants</b> Add your people who you'll share cost with in this activity.
				</p>
			</div>


			<div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
				<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">3</div>
				<p className="text-2xl font-semibold">
					<b> Add expense</b> Add expenses that are group related.
				</p>
			</div>


			<div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
				<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">4</div>
				<p className="text-2xl font-semibold">
					<b>Pay </b> Pay the balance of what you owe.
				</p>
			</div>


			<div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
				<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">5</div>
				<p className="text-2xl font-semibold">
					<b>Get paid</b> Get paid what you are owed.
				</p>
			</div>


		</div>
	</div>
</section>

<div className="py-0.5 text-sm text-center dark:text-gray-400"></div>

        
        </>
    )
}

export default Landingpage;