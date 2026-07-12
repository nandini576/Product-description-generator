import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../components/GoogleButton";

function Login({ darkMode, setDarkMode }) {


  const navigate = useNavigate();

  const { login } = useAuth();


  const [loading,setLoading] = useState(false);


  const [formData,setFormData] = useState({

    email:"",
    password:""

  });



  const handleChange=(e)=>{

    setFormData((prev)=>({

      ...prev,

      [e.target.name]:e.target.value

    }));

  };




  const handleLogin = async(e)=>{

    e.preventDefault();


    const {email,password}=formData;


    if(!email || !password){

      toast.error("Please fill all fields.");

      return;

    }



    try{


      setLoading(true);



      const res = await api.post(

        "/auth/login",

        {
          email,
          password
        }

      );



      login(

        res.data.user,

        res.data.token

      );



      toast.success("Login Successful!");



      navigate("/dashboard");



    }

    catch(err){


      console.log(err);


      toast.error(

        err.response?.data?.message ||

        "Login failed."

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



      <main className="bg-[#FAF8F3] min-h-screen flex items-center justify-center px-6">



        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10">



          <h1 className="text-4xl font-bold text-center text-green-700">

            Login

          </h1>



          <p className="text-center mt-3 text-gray-500">

            Welcome back!

          </p>




          <form onSubmit={handleLogin}>


          <input

            type="email"

            name="email"

            value={formData.email}

            onChange={handleChange}

            placeholder="Email"

            className="w-full mt-8 shadow-sm rounded-xl px-4 py-3"

          />



          <input

            type="password"

            name="password"

            value={formData.password}

            onChange={handleChange}

            placeholder="Password"

            className="w-full mt-5 shadow-sm rounded-xl px-4 py-3"

          />



          <Button

            type="submit"

            className="w-full mt-8"

            size="lg"

          >

          {

            loading

            ?

            "Logging in..."

            :

            "Login"

          }



          </Button>

<GoogleButton/>


          </form>



          <p className="text-center mt-6 text-gray-500">


              Don't have an account?


              <Link 

              to="/register" 

              className="text-green-700 font-semibold hover:underline ml-1"

              >

                Register

              </Link>


          </p>


        </div>



      </main>



      <Footer />



    </>

  );

}



export default Login;