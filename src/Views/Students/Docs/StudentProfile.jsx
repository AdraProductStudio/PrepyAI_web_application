import React, { useEffect } from "react";
import JsonData from "../Utils/JsonData";
import { useCommonState } from "Components/CustomHooks";
import CommonProfileLayout from "Views/Common/Docs/CommonProfileLayout";
import { useDispatch } from "react-redux";
import { getProfileDetails } from "../Actions/StudentAction";

const StudentProfile = () => {
  const { jsonOnly } = JsonData();
  const { profileInputs } = useCommonState()?.studentState;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfileDetails());
  }, [dispatch]);

  return (
    <CommonProfileLayout
      navItems={jsonOnly?.profileNavItems}
      profileInputs={profileInputs}
    />
  );
};

export default StudentProfile;
