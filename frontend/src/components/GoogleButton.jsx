import { FcGoogle } from "react-icons/fc";

function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600"></div>
        <span className="text-xs text-gray-500 dark:text-gray-300 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="
        w-full
        h-11 md:h-12
        rounded-xl
        border
        border-gray-300
        bg-white
        text-gray-800
        font-semibold
        text-xs md:text-sm
        flex
        items-center
        justify-center
        gap-3
        shadow-sm
        transition-all
        duration-200
        hover:bg-gray-50
        hover:border-green-600
        active:scale-95
        cursor-pointer
        "
      >
        <FcGoogle size={20} />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}

export default GoogleButton;