import React from "react";
import JsonData from "../Utils/JsonData";
import { useCommonState } from "Components/CustomHooks";
import CommonProfileLayout from "Views/Common/Docs/CommonProfileLayout";

const TeachersProfile = () => {
  const { jsonOnly } = JsonData();
  const { profileInputs } = useCommonState()?.teachersState

  return (
    <CommonProfileLayout
      navItems ={jsonOnly?.profileNavItems}
      profileInputs = {profileInputs}
    />
  );
};

export default TeachersProfile;
