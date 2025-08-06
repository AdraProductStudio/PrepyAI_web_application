import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import { CiSearch } from "react-icons/ci";
import Image from "Utils/Image";
import { Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Img from "Components/Img/Img";
import ButtonComponent from "Components/Button/Button";
// import ProgressBarComp from "Components/Progress/ProgressBar";
import JsonData from "../Utils/JsonData";
import Icons from "Utils/Icons";

function OrganisationDashboard() {

  const { jsonOnly } = JsonData();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(jsonOnly?.orgDetails.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = jsonOnly?.orgDetails.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="vh-100 p-3">
      <article className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 align-items-xl-center justify-content-xl-evenly">
        {jsonOnly?.dashboardCardInputs.map((input, idx) => (
          <section key={idx} className="p-2">
            <Card style={{ height: "12rem" }}>
              <Card.Body className="d-flex flex-column align-items-start justify-content-between">
                <Card.Title className="organisation_iconWrapper p-2 rounded">{input.icon}</Card.Title>
                {input.subTitle && input.title && (
                  <div>
                    <Card.Text className="text-body-secondary m-0 p-0 fw-semibold">
                      {input.title}
                    </Card.Text>
                    <span className={`text-secondary ${input.subTitle ? "mb-1" : "mb-5"}`}  >
                      {input.subTitle}
                    </span>
                  </div>
                )}
                {!input.subTitle && (
                  <Card.Text className="text-body-secondary fw-semibold">
                    {input.title}
                  </Card.Text>
                )}
                <Card.Text className="fs-3 fw-semibold">
                  {input.value}
                </Card.Text>
              </Card.Body>
            </Card>
          </section>
        ))}

        <section className="p-2">
          <Card style={{ height: "12rem" }}>
            <Card.Body className="d-flex flex-column align-items-start justify-content-center pb-5">
              <Card.Title className="organisation_iconWrapper p-2 rounded"> {Icons.activeUsers} </Card.Title>
              <Card.Text className="mt-3 mb-2 text-body-secondary fw-semibold">
                Active Users
              </Card.Text>

              <div className="w-100 d-flex align-items-center gap-2 mt-2">
                <small className="text-secondary" style={{ minWidth: "70px" }}>
                  Admin
                </small>
                <div
                  className="progress flex-grow-1"
                  style={{
                    height: "9px",
                    backgroundColor: "hsla(343, 100%, 96%, 1)",
                  }}
                >
                  <div
                    className="progress-bar brand_color"
                    role="progressbar"
                    style={{ width: "60%", borderRadius: "4px" }}
                  ></div>
                </div>
              </div>

              <div className="w-100 d-flex align-items-center gap-2 mt-1">
                <small className="text-secondary" style={{ minWidth: "70px" }}>
                  Teachers
                </small>
                <div
                  className="progress flex-grow-1"
                  style={{
                    height: "9px",
                    backgroundColor: "hsla(343, 100%, 96%, 1)",
                  }}
                >
                  <div
                    className="progress-bar brand_color"
                    role="progressbar"
                    style={{
                      width: "85%",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>

              {/* <div className="w-100 d-flex align-items-center py-2">
                <small className="text-secondary" style={{ minWidth: "75px" }}>
                  Admin
                </small>
                <div className="flex-grow-1">
                  <ProgressBarComp
                    progressNow={70}
                    lineHeight={0.6}
                    variant="primary"
                  />
                </div>
              </div>

              <div className="w-100 d-flex align-items-center">
                <small className="text-secondary" style={{ minWidth: "75px" }}>
                  Teacher
                </small>
                <div className="flex-grow-1">
                  <ProgressBarComp
                    progressNow={80}
                    lineHeight={0.6}
                    variant="primary"
                  />
                </div>
              </div> */}
            </Card.Body>
          </Card>
        </section>

        <section className="p-2">
          <Card
            className="position-relative overflow-hidden brand_color"
            style={{
              height: "12rem",
            }}
          >
            <div className="basic_plan_rocket">
              <Img
                src={Image.rocket}
                alt="rocket_image"
                // className={"position-absolute"}
                width={"80px"}
                height={"auto"}
                fluid={"fluid"}
              />
            </div>
            <Card.Body className="d-flex flex-column align-items-start justify-content-center gap-2">
              <Card.Title className="fw-bold text-white fs-4 mb-0">
                Basic Plan
              </Card.Title>
              <Card.Text className="text-secondary mb-4 text-white">
                Expiring {"10 Oct 2025"}
              </Card.Text>
              <button className="btn btn-light w-100 py-1">
                <span style={{ color: "hsla(324, 100%, 46%, 1)" }}>
                  Upgrade Plan
                </span>
              </button>
            </Card.Body>
          </Card>
        </section>
      </article>

      <Row className="p-2">
        <Col>
          <Card style={{ height: "34rem" }}>
            <section className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center w-100 w-md-auto gap-2 p-3">
              <div className="w-100 w-md-auto">
                <h5 className="mb-0 fs-5">Admins</h5>
                <span className="text-secondary" style={{ fontSize: "0.8rem" }}>
                  {jsonOnly?.orgDetails.length} Admins
                </span>
              </div>
              <div
                className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2"
                style={{ width: "100%", maxWidth: "100%", flex: "1 1 35%" }}
              >
                <div className="w-100 w-md-auto position-relative">
                  <form>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      style={{ minWidth: "200px" }}
                    />
                    <CiSearch
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        color: "#6c757d",
                      }}
                      size={20}
                    />
                  </form>
                </div>

                <ButtonComponent
                  type={"button"}
                  className={
                    "btn-primary brand_color d-flex align-items-center justify-content-center gap-2"
                  }
                  buttonName={
                    <span
                      style={{ minWidth: "200px" }}
                      className="d-flex justify-content-center align-items-center gap-1"
                    >
                      <FaPlus className="me-1" />
                      <span className=""> &nbsp;Create Admin</span>
                    </span>
                  }
                />
              </div>
            </section>

            <section
              className="mt-2 custom-scroll"
              style={{ flex: 1, overflow: "auto", width: "100%" }}
            >
              <table className="table table-bordered mb-0 mt-0">
                <thead
                  className="position-sticky"
                  style={{ position: "sticky", top: "-2px", bottom: "-1px" }}
                >
                  <tr>
                    {jsonOnly?.OrgDashboardTableHeadings.map((title, idx) => (
                      <th key={idx} className="text-center py-3">
                        <span className="text-primary-emphasis fw-bold">
                          {title}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((org, idx) => (
                    <tr key={idx}>
                      <td className="text-center border-bottom-non">
                        {idx + 1}
                      </td>
                      <td className="text-center">{org.name}</td>
                      <td className="text-center">{org.instituteName}</td>
                      <td className="text-center">{org.role}</td>
                      <td className="text-center">{org.contanctNo}</td>
                      <td className="text-center">{org.email}</td>
                      <td className="text-center">{org.location}</td>
                      <td className="text-center">
                        <button type="button" className="btn">
                          <CiEdit className=" me-1 fs-5 text-primary" />
                        </button>
                        <button type="button" className="btn">
                          <MdDelete className="fs-5 text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </Card>
        </Col>
      </Row>

      <footer className="d-flex justify-content-end pt-1">
        <div className=" pe-2">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item mx-1"}
            pageLinkClassName={"page-link rounded text-dark"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link text-dark rounded"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link text-dark rounded"}
            activeClassName={"active"}
            breakLabel="..."
            breakClassName="page-item text-dark"
            breakLinkClassName="page-link rounded text-dark"
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
          />
        </div>
      </footer>
    </div>
  );
}

export default OrganisationDashboard;
