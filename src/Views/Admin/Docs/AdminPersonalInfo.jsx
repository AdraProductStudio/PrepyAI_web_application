import ButtonComponent from "Components/Button/Button";
import Input from "Components/Input/Input";
import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import JsonData from "../Utils/JsonData";
import Img from "Components/Img/Img";
import Images from "Utils/Image"
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { getProfileDetails } from "../Actions/Admin_action";
import { updateProfileEditing } from "../Slices/adminSlice";

const AdminPersonalInfo = () => {
  const {jsxJson } = JsonData()
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProfileDetails())
  },[dispatch])

  return (
    <div className="h-100 p-xl-4 px-xl-5">
      <section className="d-flex justify-content-between align-items-center gap-3 gap-md-5">
        <article
          className="position-relative d-inline-block"
          style={{ width: "75px", height: "100%" }}
        >
          <Input
            label={
              <span style={{cursor: "pointer"}}>
                <Img
                  src={Images?.default_prfile_pic}
                  alt={"ProfileImage"}
                  fluid={"fluid"}
                  width={"75px"}
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
            // change={onImageChange}
          />
        </article>

        <div>
          <ButtonComponent
            buttonName={<div><CiEdit className="me-1 fs-5" /> Edit Profile</div>}
            className={"btn-outline-primary profile_edit_button"}
            clickFunction={()=>{
              dispatch(updateProfileEditing())
              dispatch(updateModalShow({show:true,close_btn:true,size:"md",modal_from:"admin",modal_type:"edit_profile"}))}}
          />
        </div>
      </section>

      <section className="overflow-auto mt-4 mt-md-4">
        <form className="row">
          {Inputfunctions(jsxJson?.profile_details)}
        </form>
      </section>
    </div>
  );
};

export default AdminPersonalInfo;
