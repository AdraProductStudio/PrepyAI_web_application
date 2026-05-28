import StudentOverviewCard from "Components/Card/StudentOverviewCard";
import { Card } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import Icons from "Utils/Icons";
import GaugeChart from "Components/Charts/GaugeChart";
import Input from "Components/Input/Input";
import SpendingHoursChart from "Components/Charts/SpendingHoursChart";
import JsonData from "Views/Teachers/Utils/JsonData";
import { useEffect } from "react";
import { useCommonState } from "Components/CustomHooks";
import { useDispatch } from "react-redux";
import {
  GetAllsubjects,
  GetStudentOverviewOverallPerfomance,
  GetStudentOverviewPerfomance,
  GetStudentOverviewSpendingHours,
  GetStudentOverviewTestCount,
} from "../Actions/teacherAction";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import Img from "Components/Img/Img";
import Image from "Utils/Image";
import Spinner from "Components/Spinner/CustomSpinner";

const StudentOverview = () => {
  const { class_id, student_id, subject_id } = useParams();
  const { jsxJson } = JsonData();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { jsonOnly } = JsonData();
  const { teachersState } = useCommonState();
  const book_data = teachersState?.teacher_GetStudentOverviewPerfomance;
  const overallPerfomanceData =
    teachersState?.teacher_GetStudentOverviewOverallPerfomance;
  const testCardDetails =
    teachersState?.teacher_GetStudentOverviewTestCount;
  const spendingHours = Array.isArray(
    teachersState?.teacher_GetStudentOverviewSpendingHours?.data
  )
    ? teachersState?.teacher_GetStudentOverviewSpendingHours?.data
    : [];
const spendingHoursGlow = teachersState?.teacher_GetStudentOverviewSpendingHours?.glow
  const filteredMonthly_Perfomance =
    overallPerfomanceData?.data[0]?.monthly_performance;
    const filteredMonthly_Perfomance_status =
      overallPerfomanceData?.data[0]?.avg_status;
  const currentSubject =
    teachersState?.teacher_Current_perfomance_history_subject?.data
      ?.subject_id &&
    teachersState?.teacher_Current_perfomance_history_subject?.data
      ?.subject_id[0];
  const data = [
    {
      backgroundColor: "#FDADC7",
      question_types: "Overall Question Answers",
      no_of_books: testCardDetails?.data[2]?.no_of_books,
      no_of_tests: testCardDetails?.data[2]?.no_of_tests,
    },
    {
      backgroundColor: "#FFB6B9",
      question_types: "Multiple Question Answers",
      no_of_books: testCardDetails?.data[0]?.no_of_books,
      no_of_tests: testCardDetails?.data[0]?.no_of_tests,
    },
    {
      backgroundColor: "#F1D4D4",
      question_types: "Short Question Answers",
      no_of_books: testCardDetails?.data[1]?.no_of_books,
      no_of_tests: testCardDetails?.data[1]?.no_of_tests,
    },
  ];

  function dynamicBackto() {
    switch (true) {
      case window.location.pathname.includes("/teachers_dashboard/classrooms"):
        return `/teachers_dashboard/classrooms/${class_id}/${subject_id}`;
      case window.location.pathname.includes("/teachers_dashboard/students_details"):
        return "/teachers_dashboard/students_details";
      default:
        return "";
    }
  }

  function dynamicColor(status) {
    switch (status) {
      case "Emergent":
        return "#4B3CFA";
      case "Developing":
        return "#45D655";
      case "Exemplar":
        return "#EC008C"
      case "Not Attempted":
        return "#FF8383"
    }
  } 

  useEffect(() => {
    dispatch(GetStudentOverviewPerfomance({ subject_id: subject_id, student_id }));
    dispatch(GetStudentOverviewTestCount({ subject_id: subject_id, student_id }));
    dispatch(GetStudentOverviewSpendingHours({ subject_id: subject_id, student_id }));
    dispatch(GetAllsubjects());
  
  }, []);



  useEffect(() => {
    dispatch(GetStudentOverviewPerfomance({ subject_id: currentSubject, student_id }));
     dispatch(GetStudentOverviewSpendingHours({ subject_id: currentSubject, student_id }));
  }, [teachersState?.teacher_Current_perfomance_history_subject?.data?.subject_id,]);

  useEffect(()=>{
    dispatch(GetStudentOverviewOverallPerfomance({
          subject_id: subject_id,
          student_id,
          month:teachersState?.teacher_overview_perfomance_date?.data?.subject_date ||new Date().toISOString().slice(0, 7),
        })
      );
  },[teachersState?.teacher_overview_perfomance_date?.data?.subject_date])

  return (
    <section>
      <div className="border-bottom pb-3 mt-3">
        <Link to={dynamicBackto()} className="brand-link-color">
          {Icons.back_button_icon_blue}
          <span className="align-middle"> Students List</span>
        </Link>
      </div>

      <div className="student_overview_main">
        <Card className="h-100 border-0 rounded-4 shadow-sm py-3 px-2 overflowY">
          <Card.Body className="p-2">
            {testCardDetails?.glow ? (
              <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
                <Spinner />
                <p className="py-3">Getting Overview Records</p>
              </div>
            ) : (
              <div className="row">
                {testCardDetails?.data?.length > 0 ? (
                  <>
                    {data?.map((item, index) => (
                      <div
                        className="col-12 col-sm-6 col-xxl-3 p-2"
                        key={index}
                      >
                        <StudentOverviewCard
                          data={item}
                          style={{
                            backgroundColor: item?.backgroundColor || "",
                          }}
                        />
                      </div>
                    ))}

                    <div className="col-12 col-sm-6 col-xxl-3 p-2">
                      <Card className="h-100 border-0 rounded-4 shadow">
                        <Card.Body className="p-2 row justify-content-center">
                          <div className="custom-select-wrapper d-flex justify-content-end">
                            {Inputfunctions(
                              jsxJson.selectOverallPerfomanceMonth
                            )}
                          </div>
                          <GaugeChart
                            width={300}
                            height={150}
                            value={filteredMonthly_Perfomance}
                            data={[
                              {
                                name: filteredMonthly_Perfomance_status,
                                value: 100,
                                color: dynamicColor(filteredMonthly_Perfomance_status),
                              },
                            ]}
                            label={filteredMonthly_Perfomance_status}
                            needleColor="#FF914D"
                          />
                        </Card.Body>
                      </Card>
                    </div>

                    <div className="col-12 col-md-6 pt-3 px-2">
                      <Card className="student_overview_table_height border-0 rounded-4 shadow h-100">
                        <Card.Header className="row align-items-center bg-transparent pt-3 border-0">
                          <div className="col">
                            <h5 className="mb-0 brand-heading-color">
                              History
                            </h5>
                          </div>
                          <div className="col d-flex justify-content-end">
                            {/* <Input
                              type="text"
                              placeholder="Search History"
                              className="form-control px-4"
                            /> */}
                            {state?.classroom_id &&
                              Inputfunctions(jsxJson.selectOverviewHistory)}
                          </div>
                        </Card.Header>
                        {book_data?.glow ? (
                          <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
                           <Spinner />
                            <p className="py-3">Getting Overview Records</p>
                          </div>
                        ) : (
                          <Card.Body className="p-0 mt-3" style={{overflow:"hidden"}}>
                            {book_data?.data?.length > 0 ? (
                              <div className="table-responsive">
                                <table className="table students_list_table">
                                  <thead>
                                    <tr>
                                      {jsonOnly?.history_table_header?.map(
                                        (header, index) => (
                                          <th
                                            key={index}
                                            className="text-center"
                                          >
                                            {header}
                                          </th>
                                        )
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody className="p-2">
                                    {book_data?.data?.map((item, index) => (
                                      <tr key={index}>
                                        <td className="text-center fs-14">
                                          {item.book_name}
                                        </td>
                                        {/* <td className="text-center fs-14">{item.chapters}</td> */}
                                        <td className="text-center fs-14">
                                          {item.date}
                                        </td>
                                        <td className="text-center fs-14">
                                          {item.duration}
                                        </td>
                                        <td className="text-center fs-14">
                                          {item.performance_status}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
                                <Img
                                  src={Image?.no_data_found}
                                  alt="No Students Found"
                                  className="no_data_found_image"
                                />
                                <h6 className="mt-2">No Data Found</h6>
                              </div>
                            )}
                          </Card.Body>
                        )}
                      </Card>
                    </div>

                    <div className="col-12 col-md-6 pt-3 px-2">
                      <Card className="h-100 border-0 rounded-4 shadow">
                        <Card.Header className="row align-items-center bg-transparent pt-3 border-0">
                          <div className="col">
                            <h5 className="mb-0 brand-heading-color">
                              Spending hours
                            </h5>
                          </div>
                        </Card.Header>
                        <Card.Body className="p-2 row justify-content-center">
                          {spendingHoursGlow ? (
                            <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
                              <Spinner />
                              <p className="py-3">Getting Overview Records</p>
                            </div>
                          ) : spendingHours?.length > 0 ? (
                            <SpendingHoursChart data={spendingHours} />
                          ) : (
                            <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
                                <Img
                                  src={Image?.no_data_found}
                                  alt="No Students Found"
                                  className="no_data_found_image"
                                />
                                <h6 className="mt-2">No Data Found</h6>
                              </div>
                          )}
                        </Card.Body>
                      </Card>
                    </div>
                  </>
                ) : (
                  <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <Img
                      src={Image?.no_data_found}
                      alt="No Students Found"
                      className="no_data_found_image"
                    />
                    <h6 className="mt-2">No Data Found</h6>
                  </div>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};

export default StudentOverview;
