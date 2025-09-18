import ButtonComponent from "Components/Button/Button";
import Input from "Components/Input/Input";
import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import Img from "Components/Img/Img";
import Images from "Utils/Image";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";

const CommonPersonalInfo = ({
  profileDetailsJson,
  fetchProfileAction,
  editProfileAction,
  modalConfig,
  openModalAction,
}) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (fetchProfileAction) {
  //     dispatch(fetchProfileAction());
  //   }
  // }, [dispatch, fetchProfileAction]);

  return (
    <div className="h-100 p-xl-4 px-xl-5">
      <section className="d-flex justify-content-between align-items-center gap-3 gap-md-5">
        <article
          className="position-relative d-inline-block"
          style={{ width: "100px", height: "100px" }}
        >
          <Input
            label={
              <span style={{ cursor: "pointer" }}>
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
            buttonName={
              <div>
                <CiEdit className="me-1 fs-5" /> Edit Profile
              </div>
            }
            className={"btn-outline-primary profile_edit_button"}
            clickFunction={() => {
              if (editProfileAction) dispatch(editProfileAction());
              if (openModalAction && modalConfig) {
                dispatch(openModalAction(modalConfig));
              }
            }}
          />
        </div>
      </section>

      <section className="overflow-auto mt-4 mt-md-4">
        <form className="row">
          {Inputfunctions(profileDetailsJson)}
        </form>
      </section>
    </div>
  );
};

export default CommonPersonalInfo;
