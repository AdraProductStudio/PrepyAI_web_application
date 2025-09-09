import React from "react";
import JsonData from "../Utils/JsonData";
import { useCommonState } from "Components/CustomHooks";
import CommonProfileLayout from "Views/Common/Docs/CommonProfileLayout";

const StudentProfile = () => {
  const { jsonOnly } = JsonData();
  const { profileInputs } = useCommonState()?.studentState

  return (
    <CommonProfileLayout
      navItems ={jsonOnly?.profileNavItems}
      profileInputs = {profileInputs}
    />
  );
};

export default StudentProfile;

