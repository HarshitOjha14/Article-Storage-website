import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Signupbg from "../../assets/image/articlebg.jpg";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { sendOtp } from "../../services/operations/authApi";
import { apiConnector } from "../../services/apiconnector";
import { departmentEndpoints } from "../../services/apis";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: "",
  });

  const { Name, email, password, confirmPassword, department, role } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [hodEmail, setHodEmail] = useState([]);

  // Handle form input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log("Field being updated:", name); // Debugging
    console.log("Value being set:", value); // Debugging

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    console.log("Role is being passed correctly:", role); // Debugging

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check if department is selected
    if (!department) {
      toast.error("Please select a department");
      return;
    }

    // Dispatch the signup data
    dispatch(setSignupData(formData));

    // Trigger OTP API
    dispatch(sendOtp(formData.email, navigate));

    // Reset form
    setFormData({
      Name: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      role: "",
    });
  };

  // Fetch all departments
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector(
          "GET",
          departmentEndpoints.SHOW_ALL_DEPARTMENT
        );
        setDepartments(res.data.departments);
      } catch (error) {
        console.error("Could not fetch department names.", error);
      }
    })();
  }, []);

  // Fetch HOD emails
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector(
          "GET",
          departmentEndpoints.SHOW_ALL_DEPARTMENT_HOD
        );
        setHodEmail(res.data.departmentsHOD);
      } catch (error) {
        console.error("Could not fetch HOD emails.", error);
      }
    })();
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center">
      <img
        src={Signupbg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="bg-gradient-to-r from-black to-transparent absolute inset-0 w-full h-full opacity-80"></div>

      <div className="relative z-10 bg-white bg-opacity-90 p-8 sm:p-10 rounded-xl shadow-2xl w-[90%] max-w-lg">
        <h2 className="text-2xl text-center mb-6 font-extrabold text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleOnSubmit}>
          {/* Role Selection Dropdown */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Select Role
            </label>
            <select
              name="role"
              value={role}
              onChange={handleOnChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all"
            >
              <option value="">Select Role</option>
              <option value="HOD">HOD</option>
              <option value="Faculty">Faculty</option>
            </select>
          </div>

          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all"
              placeholder="Enter Name"
              name="Name"
              value={Name}
              required
              onChange={handleOnChange}
            />
          </div>

          {/* Email Selection for HOD */}
          {role === "HOD" ? (
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                HOD Email Address
              </label>
              <select
                name="email"
                value={email}
                onChange={handleOnChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all"
              >
                <option value="">Select HOD Email</option>
                {hodEmail?.map((hod) => (
                  <option key={hod._id} value={hod.email}>
                    {hod.email}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            // Email Input for Faculty
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all"
                required
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
              />
            </div>
          )}

          {/* Department Dropdown */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Department
            </label>
            <select
              name="department"
              value={department}
              onChange={handleOnChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all"
            >
              <option value="">Select Department</option>
              {departments?.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Password Input */}
          <div className="mb-5 relative">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all"
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
            />
            <span
              className="absolute right-3 top-[40px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-5 relative">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
            />
            <span
              className="absolute right-3 top-[40px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-5 w-full rounded-lg hover:bg-blue-600 transition-all"
          >
            Signup
          </button>
        </form>

        <p className="mt-5 text-gray-500 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
