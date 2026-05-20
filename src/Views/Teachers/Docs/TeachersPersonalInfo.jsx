import CommonPersonalInfo from "Views/Common/Docs/CommonPersonalInfo";
import JsonData from "../Utils/JsonData";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { updateProfileEditing } from "../Slice/teachersSlice";

const TeachersPersonalInfo = () => {
  const { jsxJson } = JsonData();

  return (
    <CommonPersonalInfo
        profileDetailsJson={jsxJson?.profile_details}
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
