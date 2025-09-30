// import ButtonComponent from "Components/Button/Button";
import ButtonComponent from "Components/Button/Button";
import Input from "Components/Input/Input";
import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { updateProfileEditing } from "Views/Superadmin/Slices/SuperAdmin_slice";
import JsonData from "../Utils/JsonData";
import Img from "Components/Img/Img";
import Images from "Utils/Image"
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { getProfileDetails } from "../Actions/superAdminAction";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import Spinner from "Components/Spinner/CustomSpinner";

const PersonalInfo = () => {
  const { jsxJson } = JsonData()
  const dispatch = useDispatch();
  const { superadminState } = useCommonState();

  useEffect(() => {
    dispatch(getProfileDetails())
  }, [])

  return (
    <div className="h-100 p-xl-4 px-xl-5">
      {superadminState?.profileInputs?.is_fetching ?
        <div className="h-100 row justify-content-center align-items-center">
          <Spinner />
        </div>
        :
        <React.Fragment>
          <section className="d-flex justify-content-between align-items-center gap-5 gap-md-5">
            <article
              className="position-relative d-inline-block"
              style={{ width: "100px", height: "100%" }}
            >
              <Input
                label={
                  <span style={{ cursor: "pointer" }}>
                    <Img
                      src={Images?.default_prfile_pic}
                      alt={"ProfileImage"}
                      fluid={"fluid"}
                      width={"70px"}
                      height={"100%"}
                      className={"rounded-circle"}
                    />
                    <CiEdit
                      size={24}
                      className="position-absolute bg-dark text-white rounded-circle p-1 border border-secondary"
                      style={{ bottom: "0", right: "0" }}
                    />
                  </span>
                }
                type={"file"}
                htmlFor={"profileImageInput"}
                accept={"image/*"}
                className={"d-none"}
              />
            </article>

            <div>
              <ButtonComponent
                buttonName={<div><CiEdit className="me-1 fs-5" /> Edit Profile</div>}
                className={"btn-outline-primary profile_edit_button"}
                clickFunction={() => {
                  dispatch(updateProfileEditing())
                  dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Profile", modal_type: "edit_profile" }))
                }}
              />
            </div>
          </section>

          <section className="overflow-auto mt-4 mt-md-4">
            <form className="row">
              {Inputfunctions(jsxJson?.profile_details)}
            </form>
          </section>
        </React.Fragment>
      }
    </div>
  );
};

export default PersonalInfo;
