import CommonSettings from "Views/Common/Docs/CommonSettings";
import JsonData from "../Utils/JsonData";
import { useCommonState } from "Components/CustomHooks";
import { changePassword } from "../Actions/StudentAction";

const StudentSettings = () => {
  const { jsxJson } = JsonData();
  const { settingsInputs, placeholder } = useCommonState()?.studentState;

  return (
    <CommonSettings
      formDetailsJson={jsxJson?.settings_details}
      stateSelector={() => settingsInputs}
      submitAction={changePassword}
      title="Change Password"
      buttonLabel="Save"
      btnDisableState={placeholder}
    />
  );
};

export default StudentSettings;
