import React from "react";
import JsonData from "../Utils/JsonData";
import AdminProfileLayout from "./AdminProfileLayout";
import { useCommonState } from "Components/CustomHooks";

const AdminProfile = () => {
  const { jsonOnly } = JsonData();
  const { profileInputs } = useCommonState()?.adminState

  return (
    <>
      <AdminProfileLayout
        navItems ={jsonOnly?.profileNavItems}
        profileInputs = {profileInputs}
      />
    </>
  );
};

export default AdminProfile;
