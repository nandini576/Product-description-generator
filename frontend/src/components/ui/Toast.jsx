import toast from "react-hot-toast";

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export default {
  success: showSuccessToast,
  error: showErrorToast,
};