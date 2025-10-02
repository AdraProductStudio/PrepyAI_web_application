import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import Img from "Components/Img/Img";
import Images from "Utils/Image";

const AdminProfileLayout = ({ navItems, profileInputs }) => {
  const location = useLocation();
  return (
    <div className="h-100">
      <h3 className="pt-3 ms-3 border-bottom pb-3">My Profile</h3>
      <section className="d-flex justify-content-center align-items-center">
        <Card className="mt-2 mt-md-3 p-3 p-md-4 shadow custom-scroll border-0 pb-0 responsive_profile_card">
          <ul className="d-xl-none list-inline d-flex justify-content-around align-items-center rounded py-2 py-md-3 shadow">
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

          <Card.Body className="d-flex gap-5">
            <Card
              className="pt-2 d-none d-xl-block col-xl-1 d-none d-xl-block shadow rounded-4 border-0"
              style={{ width: "17rem", height: "30rem" }}
            >
              <div className="d-flex justify-content-start align-items-center gap-2 p-1 p-xxl-2 ps-xxl-4 border-bottom">
                <Img
                  src={Images?.default_prfile_pic}
                  alt={"ProfileImage"}
                  fluid={"fluid"}
                  width={"55px"}
                  height={"100%"}
                  className={"rounded-circle"}
                />
                <div className="">
                  <h4 className="fs-6">Hello &#x1F44B;</h4>
                  <h3 className="fw-bold fs-5">
                    {" "}
                    {profileInputs?.first_name || "User"}{" "}
                    {profileInputs?.last_name || ""}{" "}
                  </h3>
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
                        `nav-link w-100 ps-4 d-flex justify-content-start align-items-center  ${
                          isActive ? "brand_color text-white" : "text-dark"
                        }`
                      }
                    >
                      <span className="fs-3 mb-1 me-3">
                        {item.icon(location.pathname === item.to)}
                      </span>
                      <span className="fs-6">{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Card>

            <article>
              <Outlet />
            </article>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default AdminProfileLayout;
