import React from "react";
import ProfileLayout from "./ProfileLayout";
import JsonData from "../Utils/JsonData";

const Profile = () => {
  const { jsonOnly } = JsonData();

  return (
    <ProfileLayout navItems={jsonOnly?.profileNavItems} />
  );
};

export default Profile;
