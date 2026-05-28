import React, { useEffect } from "react";
import JsonData from "../Utils/JsonData";
import AdminProfileLayout from "./AdminProfileLayout";
import { useCommonState } from "Components/CustomHooks";
import { useDispatch } from "react-redux";
import { getProfileDetails } from "../Actions/Admin_action";

const AdminProfile = () => {
  const { jsonOnly } = JsonData();
  const { profileInputs } = useCommonState()?.adminState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileDetails());
  }, [dispatch]);

  return (
    <>
      <AdminProfileLayout
        navItems={jsonOnly?.profileNavItems}
        profileInputs={profileInputs}
      />
    </>
  );
};

export default AdminProfile;
