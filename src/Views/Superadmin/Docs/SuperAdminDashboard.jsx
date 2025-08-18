import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Image from "Utils/Image";
import Icons from "Utils/Icons";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { Card, Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import ReactDropdownSelect from "Components/Input/ReactDropdownSelect";
import Input from "Components/Input/Input";
import Img from "Components/Img/Img";
import ButtonComponent from "Components/Button/Button";
import JsonData from "../Utils/JsonData";
import {useCommonState, useDispatch } from "Components/CustomHooks";
import { deleteOrganisation, getMonthlyReportDetails, getOrganizationList, getSubcriptionDetails, } from "../Actions/superAdminAction";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { type } from "@testing-library/user-event/dist/type";


function SuperAdminDashboard() {
  const {organizationDetails,subcriptionDetails,monthlyReports} = useCommonState()?.superadminState
  const { jsonOnly } = JsonData({subcriptionDetails})
  const dispatch = useDispatch()
  
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const [year,setYear] = useState(new Date().getFullYear())

  const pageCount = Math.ceil(subcriptionDetails?.total_orgs / itemsPerPage)
  const offset = currentPage * itemsPerPage


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
    dispatch(getOrganizationList({ page: selected + 1, show_entries: itemsPerPage }))
  }


  useEffect(() => {
    dispatch(getOrganizationList({ page: currentPage + 1, show_entries: itemsPerPage }))
  }, [])

  useEffect(() => {
    dispatch(getSubcriptionDetails())
    dispatch(getMonthlyReportDetails(year))
  }, [])


  const handleFilterOrganizations = (value) => {
    setSearchValue(value)
     dispatch(getOrganizationList({ page: currentPage + 1, search_query: value,show_entries: itemsPerPage  }))
  }

  const monthlyGrowthDropDownOptions = monthlyReports?.year?.map(year => ({ id: year, name: year.toString() }))

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
                    options={monthlyGrowthDropDownOptions}
                    value={[monthlyGrowthDropDownOptions?.[0] || { id: 0, name: "Year" }]}
                    change={(values) => {
                      const selectedId = values?.[0]?.id
                     dispatch(getMonthlyReportDetails(selectedId))
                    }}
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
                    data={Array.isArray(monthlyReports?.monthly_report) && monthlyReports?.monthly_report?.length > 0
                      ? monthlyReports?.monthly_report
                      : [{ month: "", year: "",}]}

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
                      dataKey="total"
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
                    {item.name} - {Math.floor(parseFloat(item.value) || 0)}
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
                  {organizationDetails?.length} Organizations
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
                  <Input type={"text"} placeholder={"Search..."} value={searchValue}  change={(e) => handleFilterOrganizations(e.target.value, filterValue)} />
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
                    value={[jsonOnly?.planFilterOptions?.[0]]}
                    className={"custom-dropdown rounded"}
                    change={(values) => {
                      const subscription_plan = values?.[0]?.value
                      dispatch(getOrganizationList({ filter_by: subscription_plan,show_entries: itemsPerPage }))
                    }}
                  
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
                  clickFunction={()=>dispatch(updateModalShow({show:true,close_btn:true,size:"md",modal_from:"Home",modal_type:"create_organisation"}))}
                />
              </div>
            </section>

            <section
              className="mt-2 custom-scroll"
              style={{ flex: 1, overflow: "auto", width: "100%" }}
            >
              <table className="table table-bordered mb-0 mt-0">
                <thead style={{ position: "sticky", top: "1px", bottom: "-1px" }}
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
                  {organizationDetails?.length >=1 ? organizationDetails?.map((org, idx) => (
                    <tr key={idx}>
                      <td className="text-center border-bottom-non">
                        {idx + 1}
                      </td>
                      <td className="text-center">{org.organization_name}</td>
                      <td className="text-center">{org.name}</td>
                      <td className="text-center">{org.contact_no}</td>
                      <td className="text-center">{org.email}</td>
                      <td className="text-center">{org.location}</td>
                      <td className="text-center">{org.subscription_plan}</td>
                      <td className="text-center">{org.created_date}</td>
                      <td className="text-center">{org.subscription_duration}</td>
                      <td className="text-center">
                        {/* <button type="button" className="btn" onClick={()=>console.log('edit',org.id)}>
                          <CiEdit className=" me-1 fs-5 text-primary" />
                        </button> */}
                        <button type="button" className="btn" onClick={()=>dispatch(deleteOrganisation({org_id:org.id}))}>
                          <MdDelete className="fs-5 text-danger" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={jsonOnly?.tableHeadings.length || 10}>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: "400px", width: "100%" }}
                        >
                          <span className="text-muted fs-5">No details found</span>
                        </div>
                      </td>
                    </tr>
                  )}
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
