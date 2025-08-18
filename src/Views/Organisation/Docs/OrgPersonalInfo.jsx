// import ButtonComponent from "Components/Button/Button";
import ButtonComponent from "Components/Button/Button";
import Input from "Components/Input/Input";
import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import JsonData from "../Utils/JsonData";
import Img from "Components/Img/Img";
import { updateOrgProfileInputs } from "../Slices/Organisation_slice";
import Images from "Utils/Image"
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { getOrganizationProfileDetails } from "../Actions/organisationAction";
import { updateModalShow } from "Views/Common/Slices/Common_slice";

const OrgPersonalInfo = () => {
  const {jsxOnly } = JsonData()
  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getOrganizationProfileDetails())
},[])


  return (
    <div className="h-100 p-xl-4 px-xl-5">
      <section className="d-flex justify-content-between align-items-center gap-3 gap-md-5">
        <article
          className="position-relative d-inline-block"
          style={{ width: "100px", height: "100px" }}
        >
          <Input
            label={
              <span style={{cursor: "pointer"}}>
                <Img
                  src={Images?.default_prfile_pic}
                  alt={"ProfileImage"}
                  fluid={"fluid"}
                  width={"100px"}
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
            buttonName={<span><CiEdit className=" me-1 fs-5" /> Edit Profile</span>}
            className={"btn-outline-primary profile_edit_button"}
            clickFunction={()=>{ dispatch(updateModalShow({show:true,close_btn:true,size:"md",modal_from:"Profile",modal_type:"edit_profile"}))}}
            
          />
        </div>
      </section>

      <section className="overflow-auto mt-4 mt-md-4">
        <form className="row">
         {Inputfunctions(jsxOnly?.profile_details)}        
          {/* <div className="d-flex justify-content-end p-md-2">
            <ButtonComponent
              type={"button"}
              className={"btn btn-primary col-5 col-md-3 col-xl-2 brand_color"}
              buttonName={"Submit"}
            />
          </div> */}
        </form>
      </section>
    </div>
  );
};

export default OrgPersonalInfo;
