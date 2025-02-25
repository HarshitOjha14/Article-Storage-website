import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../services/operations/SettingApi";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <div className="space-y-4 p-8 rounded-xl bg-gray-100 shadow-md border border-gray-300">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <FiTrash2 className="text-3xl text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Delete Account</h3>
      </div>

      <p className="text-gray-700">
        Would you like to delete your account? Deleting your account is
        permanent and will remove all the content associated with it.
      </p>

      <div className="text-center mt-4">
        <button
          type="button"
          className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  );
}
