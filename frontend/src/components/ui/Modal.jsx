import { useEffect } from "react";

/**
 * Modal Component
 *
 * Props:
 * - isOpen
 * - onClose
 * - title
 * - children
 */

function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () =>
      window.removeEventListener(
        "keydown",
        handleEsc
      );
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="font-bold text-xl mb-4">
          {title}
        </h2>

        {children}

        <button
          onClick={onClose}
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;