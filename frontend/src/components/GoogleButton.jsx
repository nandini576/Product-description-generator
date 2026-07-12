import { FcGoogle } from "react-icons/fc";


function GoogleButton() {


  const handleGoogleLogin = () => {

    window.location.href =
      "http://localhost:5000/api/auth/google";

  };


  return (

    <div className="mt-6">

      {/* Divider */}

      <div className="flex items-center gap-3 mb-5">

        <div className="flex-1 h-px bg-gray-200"></div>

        <span className="text-sm text-gray-400 font-medium">
          OR
        </span>

        <div className="flex-1 h-px bg-gray-200"></div>

      </div>


      {/* Google Button */}

      <button

        type="button"

        onClick={handleGoogleLogin}

        className="
        w-full
        h-12
        rounded-xl
        border
        border-gray-300
        bg-white
        text-gray-700
        font-semibold
        flex
        items-center
        justify-center
        gap-3
        shadow-sm
        transition-all
        duration-300
        hover:border-green-600
        hover:bg-green-50
        hover:shadow-md
        hover:-translate-y-0.5
        active:scale-95
        cursor-pointer
        "

      >

        <FcGoogle size={24} />


        <span>
          Continue with Google
        </span>


      </button>


    </div>

  );

}


export default GoogleButton;