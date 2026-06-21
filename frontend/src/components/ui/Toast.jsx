/**
 * Toast Component
 */

import { toast } from "react-hot-toast";

function showToast(message) {
  toast.success(message);
}

export default showToast;