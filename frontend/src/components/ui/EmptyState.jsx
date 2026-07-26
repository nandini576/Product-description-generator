import { Sparkles, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EmptyState({ title = "No descriptions found", message = "You haven't generated any product descriptions yet.", showAction = true }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mb-4">
        <Sparkles size={32} />
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        {message}
      </p>
      {showAction && (
        <button
          onClick={() => navigate("/generate")}
          className="mt-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-medium text-xs md:text-sm shadow-md transition"
        >
          <PlusCircle size={18} />
          Generate First Description
        </button>
      )}
    </div>
  );
}

export default EmptyState;