import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../../services/operations/authApi";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      Name,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        Name,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="h-[85vh] flex items-center justify-center">
     {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-8 w-8 border-4 border-t-4 border-gray-300 rounded-full"></div>
        </div>
      ) : (
        <div className="max-w-md p-4 lg:p-8 bg-purple-50 shadow-md rounded-lg border">
          <h1 className="text-2xl font-semibold text-gray-800">Verify Email</h1>
          <p className="text-lg text-gray-600 my-4">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border  rounded-[0.5rem] text-xl aspect-square text-center focus:border-0 focus:outline-2 focus:outline-purple-400"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <div className=" mt-4 flex items-center justify-center">
            
          <button
            type="submit"
            className="bg-purple-300 hover:bg-purple-400  font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send OTP
          </button>
          
          </div>
            
          </form>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div>Didn’t receive OTP? </div>
            <button
              className="flex items-center text-blue-500 gap-2 font-semibold"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
               Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
