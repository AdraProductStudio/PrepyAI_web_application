import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import Img from "Components/Img/Img";
import Images from "Utils/Image"
import { useCommonState } from "Components/CustomHooks";

const ProfileLayout = ({ navItems }) => {
  const {profileInputs} = useCommonState()?.studentState
  return (
    <div className="h-100">
      <h3 className="pt-3 ms-3 border-bottom pb-3">My Profile</h3>
      <section className="d-flex justify-content-center align-items-center">
        <Card
          className="mt-2 mt-md-3 p-3 p-md-4 shadow custom-scroll"
          style={{ width: "70vw", height: "70vh", overflow: "auto" }}
        >
          <ul className="d-xl-none list-inline d-flex justify-content-around align-items-center rounded py-2 py-md-3 border border-secondary-subtle shadow">
            {navItems?.map((item) => (
              <NavLink
                to={item.to}
                end
                key={item.name}
                className={({ isActive }) =>
                  `link-underline link-underline-opacity-0 ${
                    isActive ? "border-bottom border-2 border-danger " : ""
                  }`
                }
              >
                <li className="list-inline-item">
                  <div className="nav-link">
                    <div className="rounded">
                      <span className="fs-6 text-dark row d-block d-sm-none">
                        {item.name === "Personal Information"
                          ? "Personal Info"
                          : item.name}
                      </span>
                      <span className="fs-6 text-dark row d-none d-sm-block">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </li>
              </NavLink>
            ))}
          </ul>

          <Card.Body className="d-flex gap-3">
            <Card className=" h-75  pt-2 d-none d-xl-block col-xl-1 d-none d-xl-block shadow rounded-4" style={{width: "20rem"}}>
              <div className="d-flex justify-content-start align-items-center gap-5 p-1 p-xxl-2 ps-xxl-4 border-bottom">
                <Img
                  src={Images?.default_prfile_pic}
                  alt={"ProfileImage"}
                  fluid={"fluid"}
                  width={"70px"}
                  height={"100%"}
                  className={"rounded-circle"}
                />
                <div className="">
                  <h4 className="fs-4 fs-xxl-3">Hello &#x1F44B;</h4>
                  <h3 className="fw-bold fs-4 fs-xxl-3">{profileInputs?.first_name} {profileInputs?.last_name}</h3>
                </div>
              </div>

              <ul className="navbar-nav mt-3 mt-4">
                {navItems?.map((item) => (
                  <li
                    key={item.name}
                    className="nav-item d-flex justify-content-center align-items-center"
                  >
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `nav-link w-100 ps-4 d-flex justify-content-start align-items-center rounded ${
                          isActive ? "brand_color text-white" : "text-dark"
                        }`
                      }
                    >
                      <span className="fs-3 mb-1 me-3">{item?.icon}</span>
                      <span className="fs-5">{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Card>

            <article className="w-100">
              <Outlet />
            </article>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default ProfileLayout;
