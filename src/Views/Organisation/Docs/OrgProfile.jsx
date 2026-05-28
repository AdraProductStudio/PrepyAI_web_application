import React from "react";
import OrgProfileLayout from "./OrgProfileLayout";
import JsonData from "../Utils/JsonData";

const OrgProfile = () => {
  const { jsonOnly } = JsonData();

  return (
    <>
      <OrgProfileLayout
        navItems={jsonOnly?.orgProfile_navItems}
      />
    </>
  );
};

export default OrgProfile;
