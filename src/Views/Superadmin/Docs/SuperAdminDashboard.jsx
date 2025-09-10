import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Icons from "Utils/Icons";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { Card, Col, Row } from "react-bootstrap";
import ReactDropdownSelect from "Components/Input/ReactDropdownSelect";
import ButtonComponent from "Components/Button/Button";
import JsonData from "../Utils/JsonData";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { getMonthlyReportDetails, getOrganizationList, getSubcriptionDetails, } from "../Actions/superAdminAction";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { selectOrgToDelete } from "../Slices/SuperAdmin_slice";
import Spinner from "Components/Spinner/CustomSpinner";
import Img from "Components/Img/Img";
import Image from "Utils/Image";
import SelectBox from "Components/Input/SelectBox";
import { SearchComponent } from "ResuableFunctions/SearchFun";
import ReactPaginateComp from "Components/Pagination/ReactPaginateComp";


function SuperAdminDashboard() {
  const { superadminState } = useCommonState();
  const { jsonOnly } = JsonData(superadminState?.subcriptionDetails || {});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubcriptionDetails())
    dispatch(getMonthlyReportDetails(new Date().getFullYear()))
    dispatch(getOrganizationList(superadminState?.filter_params))
  }, [])

  const monthlyGrowthDropDownOptions = superadminState?.monthlyReports?.year?.map(year => ({ id: year, name: year.toString() }))

  return (
    <div className="h-100 overflowY">
      <article className="custom_responsive_cards p-2">
        {jsonOnly?.cardInputs.map((input, idx) => (
          <section key={idx} className="position-relative p-2">
            <Card className="overflow-hidden superAdminCard border-0 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-start justify-content-between">
                <Card.Title className="superAdmin_iconWrapper p-2 rounded">{input.icon}</Card.Title>
                <Card.Text className="text-secondary fw-bold">
                  {input.title}
                </Card.Text>
                <Card.Text className="fs-3 fw-semibold">
                  {input.value}
                </Card.Text>
              </Card.Body>
              <div className="strokeImage" >
                {input.stroke}
              </div>
            </Card>
          </section>
        ))}

        <section className="p-2">
          <Card className="overflow-hidden superAdminCard border-0 shadow-sm">
            <Card.Body>
              {superadminState?.monthlyReports?.is_fetching ?
                <div className="w-100 text-center h-100 d-flex align-items-center">
                  <div className="col">
                    <Card.Text className="mb-3 text-primary-emphasis fw-bold">
                      Monthly Growth
                    </Card.Text>
                    <Spinner />
                  </div>
                </div>
                :
                <React.Fragment>
                  <div className="d-flex align-items-center">
                    <Card.Text
                      className="text-primary-emphasis fw-bold"
                      style={{ flexBasis: "90%" }}
                    >
                      Monthly Growth
                    </Card.Text>

                    <div className="mb-3" style={{ flexBasis: "20%", minWidth: "85px" }}  >
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

                  <div className="monthly_growth_chart" onMouseDown={(e) => e.preventDefault()} >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Array.isArray(superadminState?.monthlyReports?.data?.monthly_report) && superadminState?.monthlyReports?.data?.monthly_report?.length > 0
                          ? superadminState?.monthlyReports?.data?.monthly_report
                          : [{ month: "", year: "", }]}

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
                </React.Fragment>
              }
            </Card.Body>
          </Card>
        </section>

        <section className="p-2">
          <Card className="overflow-hidden superAdminCard border-0 shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center h-100 gap-2">
              {superadminState?.subcriptionDetails?.is_fetching ?
                <div className="w-100 text-center">
                  <Card.Text className="mb-3 text-primary-emphasis fw-bold">
                    Plan Users
                  </Card.Text>
                  <Spinner />
                </div>
                :
                <React.Fragment>
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

                  <div className="flex-grow-1 mb-4 plan_users_chart" onMouseDown={(e) => e.preventDefault()}>
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
                </React.Fragment>

              }

            </Card.Body>
          </Card>
        </section>
      </article>

      <Row className="p-2">
        <Col>
          <Card className="border-0 shadow-sm" style={{ height: "36rem" }}>
            {superadminState?.organizationDetails.is_fetching ?
              <div className="h-100 row justify-content-center align-items-center">
                <div className="col-6 text-center">
                  <Spinner />
                  <h6 className="mt-3">Getting Organisations....</h6>
                </div>
              </div>
              :
              <React.Fragment>
                <Card.Header className="border-bottom bg-transparent d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center w-100 w-md-auto gap-2 p-3">
                  <div className="w-100 w-md-auto">
                    <h5 className="mb-0 fs-5">Organization</h5>
                    <span className="text-secondary" style={{ fontSize: "0.8rem" }}>
                      {superadminState?.organizationDetails?.total_count || 0} Organizations
                    </span>
                  </div>

                  <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-4" style={{ width: "100%", maxWidth: "100%", flex: "1 1 80%" }}>
                    <div className="position-relative w-100 w-md-auto" style={{ minWidth: "120px" }} >
                      <SearchComponent
                        className="form-control"
                        placeholder="Search..."
                        filter_options={superadminState?.filter_params}
                        onClick={({ filter_options, search_query }) =>
                          dispatch(getOrganizationList({ ...filter_options, search_query, page: 1 }))
                        } />
                    </div>

                    <div className="w-100 w-md-auto" style={{ minWidth: "120px" }}>
                      <SelectBox
                        className="form-select"
                        selectOptions={jsonOnly?.planFilterOptions}
                        value={superadminState?.filter_params.filter_by}
                        change={(e) => dispatch(getOrganizationList({ ...superadminState?.filter_params, filter_by: e.target.value, is_plan_changed: true, page: 1 }))}
                      />
                    </div>

                    <ButtonComponent
                      type={"button"}
                      className="brand_color d-flex align-items-center justify-content-center gap-2 gap-md-1"
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
                      clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Home", modal_type: "create_organisation" }))}
                    />
                  </div>
                </Card.Header>

                <Card.Body className="mt-2 custom-scroll" style={{ flex: 1, overflow: "auto", width: "100%" }} >
                  {superadminState?.organizationDetails?.total_count ?
                    <table className="table table-bordered mb-0 mt-0">
                      <thead style={{ position: "sticky", top: "0px", bottom: "0px" }}>
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
                        {superadminState?.organizationDetails?.data?.map((org, idx) => (
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
                              <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                  dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Home", modal_type: "delete_org" }))
                                  dispatch(selectOrgToDelete({ org_id: org.id, name: org.organization_name }))
                                }}
                              >
                                <MdDelete className="fs-5 text-danger" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    :
                    <div className="h-100 row justify-content-center align-items-center">
                      <div className="col-6 text-center">
                        <Img src={Image?.no_data_found} alt="no data found" width="100rem" />
                        <h6 className="mt-3">No Data Found</h6>
                      </div>
                    </div>
                  }
                </Card.Body>
              </React.Fragment>
            }
          </Card>
        </Col>
      </Row>

      {superadminState?.organizationDetails.is_fetching ?
        null
        :
        <footer className="d-flex justify-content-end">
          {Math.ceil(superadminState?.organizationDetails?.total_count / superadminState?.filter_params?.show_entries) ?
            <div className=" pe-2">
              <ReactPaginateComp
                totalPages={Math.ceil(superadminState?.organizationDetails?.total_count / superadminState?.filter_params?.show_entries)}
                filter_options={superadminState?.filter_params}
                onClick={({ filter_options, page }) =>
                  dispatch(getOrganizationList({ ...filter_options, page }))
                } />
            </div> : null}
        </footer>
      }
    </div>
  );
}

export default SuperAdminDashboard;
