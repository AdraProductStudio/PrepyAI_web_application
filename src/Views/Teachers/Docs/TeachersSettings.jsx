import CommonSettings from "Views/Common/Docs/CommonSettings";
import JsonData from "../Utils/JsonData";
import { useCommonState } from "Components/CustomHooks";
import { changePassword } from "../Actions/Teachers_action";
import { resetSettingPasswordField, resetSettingsPasswordEye, setErrors } from "../Slice/teachersSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const TeachersSettings = () => {
  const { jsxJson } = JsonData();
  const { settingsInputs, placeholder } = useCommonState()?.teachersState;
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(resetSettingPasswordField())
    dispatch(setErrors({}))
    dispatch(resetSettingsPasswordEye())
  }, [])

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

export default TeachersSettings;
