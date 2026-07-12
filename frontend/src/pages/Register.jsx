import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import GoogleButton from "../components/GoogleButton";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import Button from "../components/ui/Button";


import api from "../services/api";



function Register({ darkMode, setDarkMode }) {


const navigate = useNavigate();



const [loading,setLoading]=useState(false);



const [formData,setFormData]=useState({

name:"",

email:"",

password:"",

confirmPassword:"",

});




const handleChange=(e)=>{


setFormData((prev)=>({

...prev,

[e.target.name]:e.target.value

}));



};





const handleRegister=async(e)=>{


e.preventDefault();



const {

name,

email,

password,

confirmPassword

}=formData;




if(!name || !email || !password || !confirmPassword){

toast.error("Please fill all fields.");

return;

}



if(password.length < 6){

toast.error("Password must contain at least 6 characters.");

return;

}




if(password!==confirmPassword){

toast.error("Passwords do not match.");

return;

}




try{


setLoading(true);



await api.post(

"/auth/register",

{

name,

email,

password

}

);



toast.success("Registration Successful!");



navigate("/login");



}

catch(err){


console.log(err);



toast.error(

err.response?.data?.message ||

"Something went wrong."

);


}

finally{

setLoading(false);

}



};





return (

    <>

      <Navbar

        darkMode={darkMode}

        setDarkMode={setDarkMode}

      />



      <main

        className={`min-h-screen flex items-center justify-center px-6 py-16 ${

          darkMode ? "bg-[#16231A]" : "bg-[#FAF8F3]"

        }`}

      >

        <div

          className={`w-full max-w-md rounded-3xl shadow-xl p-8 ${

            darkMode ? "bg-[#243127]" : "bg-white"

          }`}

        >

          <h1

            className={`text-4xl font-bold text-center ${

              darkMode ? "text-green-300" : "text-green-700"

            }`}

          >

            Create Account

          </h1>



          <p

            className={`text-center mt-3 ${

              darkMode ? "text-gray-300" : "text-gray-500"

            }`}

          >

            Join Product Description AI

          </p>



          <form onSubmit={handleRegister} className="mt-8 space-y-5">



            <input

              type="text"

              name="name"

              placeholder="Full Name"

              value={formData.name}

              onChange={handleChange}

              className="w-full rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"

            />



            <input

              type="email"

              name="email"

              placeholder="Email Address"

              value={formData.email}

              onChange={handleChange}

              className="w-full rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"

            />



            <input

              type="password"

              name="password"

              placeholder="Password"

              value={formData.password}

              onChange={handleChange}

              className="w-full rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"

            />



            <input

              type="password"

              name="confirmPassword"

              placeholder="Confirm Password"

              value={formData.confirmPassword}

              onChange={handleChange}

              className="w-full rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"

            />



            <Button

              type="submit"

              className="w-full mt-2"

              size="lg"

            >

            {

              loading

              ?

              "Creating Account..."

              :

              "Register"

            }


            </Button>
            <GoogleButton/>



          </form>



          <p

            className={`text-center mt-6 ${

              darkMode ? "text-gray-300" : "text-gray-600"

            }`}

          >

            Already have an account?



            <Link

              to="/login"

              className="text-green-700 font-semibold ml-1 hover:underline"

            >

              Login

            </Link>



          </p>


        </div>


      </main>



      <Footer darkMode={darkMode} />

    </>

);

}


export default Register;