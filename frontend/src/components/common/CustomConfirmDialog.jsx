import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const CustomConfirmDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-lg transform transition-all scale-95 hover:scale-100">
        <div className="flex items-center space-x-4">
          <div className="text-red-500">
            <FiAlertCircle className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Are you sure?</h3>
        </div>
        <p className="text-gray-700 mt-4 text-sm leading-relaxed">{message}</p>
        <div className="flex justify-end space-x-6 mt-8">
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirmDialog;
