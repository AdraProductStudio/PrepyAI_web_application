import CommonPersonalInfo from "Views/Common/Docs/CommonPersonalInfo";
import JsonData from "../Utils/JsonData";
import { getProfileDetails } from "../Actions/Teachers_action";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { updateProfileEditing } from "../Slice/teachersSlice";

const TeachersPersonalInfo = () => {
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
        modal_from: "teacher",
        modal_type: "edit_profile",
        }}
    />
  );
};

export default TeachersPersonalInfo;
