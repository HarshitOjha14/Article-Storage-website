import React from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import ChangePassword from '../settingCom/ChangePassword';
import DeleteAccount from '../settingCom/DeleteAccount';
import ProfileEditor from '../settingCom/ProfileEditor';


const SettingsSection = ({
  userDetails,
  handleSaveProfileChanges,
  handleSavePasswordChanges,
  handleSaveSocialMediaChanges,
  handleDeleteAccount
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white space-y-8">
      <h2 className="text-3xl font-semibold text-purple-700 text-center">Profile Settings</h2>






      <div><ProfileEditor userDetails={userDetails} /></div>
      <div>
        <ChangePassword />
      </div>

      <div>
        <DeleteAccount />
      </div>
    </div>
  );
};

export default SettingsSection;
