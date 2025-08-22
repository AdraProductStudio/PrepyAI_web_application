import React from "react";
import ProfileLayout from "../Layout/ProfileLayout";
import JsonData from "../Utils/JsonData";

const StudentProfile = () => {
  const { jsonOnly } = JsonData();
  
  return (
    <>
      <ProfileLayout
        navItems ={jsonOnly?.profileNavItems}
      />
    </>
  );
};

export default StudentProfile;
