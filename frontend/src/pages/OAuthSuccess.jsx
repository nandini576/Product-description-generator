import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";


function OAuthSuccess() {


  const navigate = useNavigate();

  const { login } = useAuth();



  useEffect(() => {


    const params = new URLSearchParams(
      window.location.search
    );


    const token = params.get("token");



    if (!token) {

      navigate("/login");

      return;

    }



    // Store token temporarily so axios interceptor can use it

    localStorage.setItem(
      "token",
      token
    );



    // Get complete user details from backend

    api.get("/auth/profile")

      .then((res) => {


        const user = res.data.user;



        // Store complete user + token

        login(
          user,
          token
        );



        navigate("/dashboard");


      })


      .catch((error) => {


        console.log(
          "OAuth Profile Error:",
          error
        );


        localStorage.removeItem("token");


        navigate("/login");


      });



  }, [login, navigate]);



  return (

    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3]">

      <h1 className="text-2xl font-bold text-green-700">

        Signing in with Google...

      </h1>

    </div>

  );


}


export default OAuthSuccess;