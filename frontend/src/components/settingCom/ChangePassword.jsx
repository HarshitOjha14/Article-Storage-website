import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { changePassword } from '../../services/operations/SettingApi';


const ChangePassword = () => {
  const { token } = useSelector((state) => state.auth);

  // State for form inputs
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSavePasswordChanges = async () => {
    const { oldPassword, newPassword } = formData;

   

    try {
      await changePassword(token, { oldPassword, newPassword });
  
      setFormData({ oldPassword: '', newPassword: '' }); // Clear form
    } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
    }
  };

  return (
    <div className="space-y-4 p-8 rounded-xl bg-gray-100">
      <h3 className="text-xl font-semibold text-gray-800">Change Password</h3>


      {/* Form Fields */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Old Password</label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter old password"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter new password"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center mt-4">
        <button
          onClick={handleSavePasswordChanges}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
        >
          Save Password Changes
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
