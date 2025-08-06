// import ButtonComponent from "Components/Button/Button";
import ButtonComponent from "Components/Button/Button";
import Input from "Components/Input/Input";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import JsonData from "../Utils/JsonData";
import Img from "Components/Img/Img";
import { updateOrgProfileInputs } from "../Slices/Organisation_slice";

const OrgPersonalInfo = () => {
  const { jsonOnly } = JsonData()

  const dispatch = useDispatch();
  const profileInputs = useSelector((state) => state.organisationState.profileInputs);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateOrgProfileInputs({ field: name, value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      document.querySelector("label[for='profileImageInput'] img").src = imgURL;
    }
  };


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
                  src={"/sample.jpg"}
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
            change={onImageChange}
          />
        </article>

        <div>
          <ButtonComponent
            buttonName={<span><CiEdit className=" me-1 fs-5" /> Edit Profile</span>}
            className={"btn-outline-primary"}
          />
        </div>
      </section>

      <section className="overflow-auto mt-4 mt-md-4">
        <form className="row">
          {jsonOnly?.orgPersonalInfoInputs.map((input, idx) => (
            <div key={idx} className="mb-3 col-12 col-md-6 p-md-2">
              <Input
                htmlFor={Input.id}
                labelClassName={"text-primary-emphasis"}
                label={input.label}
                type={input.type}
                name={input.id}
                value={profileInputs?.[input.id]}
                change={onInputChange}
              />
            </div>
          ))}

          <div className="mb-3 col-12 p-md-2">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-primary-emphasis"
            >
              Address
            </label>
            <textarea
              className="form-control"
              id="exampleInputEmail1"
              name="address"
              value={profileInputs?.address}
              onChange={onInputChange}
            />
          </div>

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
