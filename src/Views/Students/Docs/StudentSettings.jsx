import CommonSettings from "Views/Common/Docs/CommonSettings";
import JsonData from "../Utils/JsonData";
import { useCommonState } from "Components/CustomHooks";
import { changePassword } from "../Actions/StudentAction";
import { resetSettingsInputs, resetSettingsPasswordEye, setErrors } from "../Slices/StudentSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const StudentSettings = () => {
  const { jsxJson } = JsonData();
  const { settingsInputs, placeholder } = useCommonState()?.studentState;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetSettingsInputs());
    dispatch(setErrors({}));
    dispatch(resetSettingsPasswordEye())
  }, []);

  return (
    <CommonSettings
      formDetailsJson={jsxJson?.settings_details}
      stateSelector={() => settingsInputs}
      submitAction={changePassword}
      title="Change Password"
      buttonLabel="Save"
      btnDisableState={placeholder}
      setErrors={setErrors}
    />
  );
};

export default StudentSettings;
