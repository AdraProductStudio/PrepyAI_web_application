import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Image from "Utils/Image";
import Icons from "Utils/Icons";
import {  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip} from "recharts";
import { Card, Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import ReactDropdownSelect from "Components/Input/ReactDropdownSelect";
import Input from "Components/Input/Input";
import Img from "Components/Img/Img";
import ButtonComponent from "Components/Button/Button";
import JsonData from "../Utils/JsonData";

function SuperAdminDashboard() {

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
    <div className="vh-100 p-2">
      <article className="row row-cols-md-2 row-cols-xxl-4">
        {jsonOnly?.cardInputs.map((input, idx) => (
          <section key={idx} className="position-relative p-2">
            <Card className="overflow-hidden superAdminCard">
              <Card.Body className="d-flex flex-column align-items-start justify-content-between">
                <Card.Title className="superAdmin_iconWrapper p-2 rounded">{input.icon}</Card.Title>
                <Card.Text className="text-secondary fw-bold">
                  {input.title}
                </Card.Text>
                <Card.Text className="fs-3 fw-semibold">
                  {input.value}
                </Card.Text>
              </Card.Body>

              {
                <div
                  className="strokeImage"
                  style={{
                    filter:
                      input.title === "Total Revenue"
                        ? "invert(10%) sepia(80%) saturate(300%) hue-rotate(90deg)"
                        : "",
                  }}
                >
                  <Img
                    src={Image.stroke}
                    alt={"StrokeImage"}
                    width={"180px"}
                    height={"160px"}
                    fluid={"fulid"}
                  />
                </div>
              }
            </Card>
          </section>
        ))}

        <section className="p-2">
          <Card className="overflow-hidden superAdminCard">
            <Card.Body>
              <div className="d-flex align-items-center">
                <Card.Text
                  className="text-primary-emphasis fw-bold"
                  style={{ flexBasis: "90%" }}
                >
                  Monthly Growth
                </Card.Text>

                <div
                  className="mb-3"
                  style={{ flexBasis: "20%", minWidth: "85px" }}
                >
                  <ReactDropdownSelect
                    options={jsonOnly?.monthltyGrowOptions}
                    value={[{ id: 0, name: "Year" }]}
                    // change={handleChange}
                    labelField="name"
                    valueField="id"
                    className="custom-dropdown rounded"
                  />
                </div>
              </div>

              <div
                className="monthly_growth_chart" 
                onMouseDown={(e) => e.preventDefault()}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={jsonOnly?.monthlyGrowthData}
                    margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
                    barCategoryGap={0}
                    barGap={-8}
                  >
                    <defs>
                      <linearGradient
                        id="barGradientColor"
                        x1="0"
                        y1="1"
                        x2="0"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#ec008c" />
                        <stop offset="100%" stopColor="#fc6767" />
                      </linearGradient>
                    </defs>

                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip cursor={{ fill: "transparent" }} />

                    <Bar
                      dataKey={() => 100}
                      fill="hsla(343, 100%, 96%, 1)"
                      radius={[6, 6, 6, 6]}
                      barSize={8}
                    />

                    <Bar
                      dataKey="value"
                      fill="url(#barGradientColor)"
                      radius={[6, 6, 6, 6]}
                      barSize={8}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </section>

        <section className="p-2">
          <Card className="overflow-hidden superAdminCard">
            <Card.Body className="d-flex justify-content-between align-items-center h-100 gap-2">
              <div>
                <Card.Text className="mb-3 text-primary-emphasis fw-bold">
                  Plan Users
                </Card.Text>
                {jsonOnly?.planData.map((item) => (
                  <Card.Text
                    className="mb-1 text-secondary d-flex align-items-center"
                    key={item.name}
                  >
                    <Icons.DotSVG fill={item.color} className="me-2" />
                    {item.name} - {item.value}
                  </Card.Text>
                ))}
              </div>

              <div
                className="flex-grow-1 mb-4 plan_users_chart"
                onMouseDown={(e) => e.preventDefault()}
              >
                <ResponsiveContainer width="100%" height="140%">
                  <PieChart>
                    <Pie
                      data={jsonOnly?.planData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={66}
                      innerRadius={33}
                      paddingAngle={4}
                      cornerRadius={10}
                    >
                      {jsonOnly?.planData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </section>
      </article>

      <Row className="p-2">
        <Col>
          <Card style={{ height: "36rem" }}>
            <section className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center w-100 w-md-auto gap-2 p-3">
              <div className="w-100 w-md-auto">
                <h5 className="mb-0 fs-5">Organization</h5>
                <span className="text-secondary" style={{ fontSize: "0.8rem" }}>
                  {jsonOnly?.orgDetails.length} Organizations
                </span>
              </div>

              <div
                className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-4"
                style={{ width: "100%", maxWidth: "100%", flex: "1 1 80%" }}
              >
                <div
                  className="position-relative w-100 w-md-auto"
                  style={{ minWidth: "120px" }}
                >
                  <Input type={"text"} placeholder={"Search..."} />
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
                </div>

                <div className="w-100 w-md-auto" style={{ minWidth: "120px" }}>
                  <ReactDropdownSelect
                    options={jsonOnly?.planFilterOptions}
                    valueField="id"
                    labelField="name"
                    value={[{ id: 0, name: "Filter" }]}
                    className={"custom-dropdown rounded"}
                  />
                </div>

                <ButtonComponent
                  type={"button"}
                  className={
                    "brand_color d-flex align-items-center justify-content-center gap-2 gap-md-1"
                  }
                  buttonName={
                    <span 
                      style={{ minWidth: "200px" }}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <FaPlus className="text-light" />
                      <span className="text-light">
                        &nbsp;Create Organisation
                      </span>
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
                <thead style={{ position: "sticky", top: "-2px", bottom: "-1px" }}
                >
                  <tr>
                    {jsonOnly?.tableHeadings.map((title, idx) => (
                      <th key={idx} className="text-center py-3">
                        <span className="text-primary-emphasis fw-bold">
                          {title}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ zIndex: "3" }}>
                  {currentItems.map((org, idx) => (
                    <tr key={idx}>
                      <td className="text-center border-bottom-non">
                        {idx + 1}
                      </td>
                      <td className="text-center">{org.orgName}</td>
                      <td className="text-center">{org.name}</td>
                      <td className="text-center">{org.contanctNo}</td>
                      <td className="text-center">{org.email}</td>
                      <td className="text-center">{org.location}</td>
                      <td className="text-center">{org.subPlan}</td>
                      <td className="text-center">{org.createdDate}</td>
                      <td className="text-center">{org.subDuration}</td>
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

      <footer className="d-flex justify-content-end">
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
            breakClassName="page-item"
            breakLinkClassName="page-link rounded text-dark"
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
          />
        </div>
      </footer>
    </div>
  );
}

export default SuperAdminDashboard;
