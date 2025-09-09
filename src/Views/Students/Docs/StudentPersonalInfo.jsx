import CommonPersonalInfo from "Views/Common/Docs/CommonPersonalInfo";
import JsonData from "../Utils/JsonData";
import { getProfileDetails } from "../Actions/StudentAction";
import { updateProfileEditing } from "../Slices/StudentSlice";
import { updateModalShow } from "Views/Common/Slices/Common_slice";

const StudentPersonalInfo = () => {
  const { jsxJson } = JsonData();

  return (
    <CommonPersonalInfo
        profileDetailsJson={jsxJson?.profile_details}
        fetchProfileAction={getProfileDetails}
        editProfileAction={updateProfileEditing}
        openModalAction={updateModalShow}
        modalConfig={{
          show: true,
          close_btn: true,
          size: "md",
          modal_from: "profile",
          modal_type: "edit_profile",
        }}
    />
  );
};

export default StudentPersonalInfo;

