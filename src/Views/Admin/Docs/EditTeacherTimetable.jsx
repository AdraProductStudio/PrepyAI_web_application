import React, { useEffect } from "react";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import ButtonComponent from "Components/Button/Button";
import LinkComponent from "Components/Router_components/LinkComponent";
import Icons from "Utils/Icons";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { update_time_table } from "../Slices/adminSlice";
import ReactDropdownSelect from "Components/Input/ReactDropdownSelect";
import { createTimeTable, getTeacherClassrooms, getTimeTable, getTimetableSubjects } from "../Actions/Admin_action";
import Img from "Components/Img/Img";
import Image from "Utils/Image";
import Spinner from "Components/Spinner/CustomSpinner";


const format12Hour = (time24) => {
    if (!time24) return "";
    const [hourStr, min] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${min} ${ampm}`;
}

const EditTeacherTimetable = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { time_table } = useCommonState()?.adminState;
    const type = "teacher_id"
    
    useEffect(() => {
        if (!id) return;
        dispatch(getTimeTable({ type, id }))
        dispatch(getTeacherClassrooms(id))
        // dispatch(getTimetableSubjects(id))

    }, [id])

    
    const handleChangeSubject = (day, periodIndex, subjectObj) => {
        const updatedDay = time_table?.data[day]?.map((p, idx) =>
            idx === periodIndex
                ? {
                    ...p,
                    classroom_id: subjectObj?.classroom_id,
                    subject_id: subjectObj?.subject_id,
                }
                : p
        );

        const updatedTable = {
            ...time_table.data,
            [day]: updatedDay,
        }
        dispatch(update_time_table({ data: updatedTable }))
    }
    
    const handleSave = () => {
        dispatch(update_time_table({ is_editing: false }))
        dispatch(createTimeTable(id, "teacher_id", time_table.data))
    };

    const days = time_table?.data ? Object.keys(time_table.data) : []
    const periods = time_table?.periodsTime || []
  return (
   <Container fluid className="h-100 w-100">
            <Row className="w-100 d-flex justify-content-between">
                <Col md={12} className="d-flex gap-3 justify-content-between">
                    <LinkComponent
                        to={`/admin_dashboard/timetable/record`}
                        className="brand-link-color"
                        onLinkClick={()=> dispatch(update_time_table({ is_editing: false }))}
                    >
                        <span>{Icons.back_button_icon_blue}</span>
                        <span className="align-middle">Back</span>
                    </LinkComponent>
                    {time_table?.data && <ButtonComponent
                        className="btn-brand-color border-0 p-2 col-2"
                        buttonName={time_table?.is_editing ? "Save" : "Edit"}
                        clickFunction={() =>
                            time_table?.is_editing ? handleSave() : dispatch(update_time_table({ is_editing: true }))
                        }
                    />}
                </Col>
            </Row>
          {time_table?.is_loading ? (<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
              <Spinner />
          </div>) : !time_table?.data ? (
              <div className="w-100 h-100 d-flex flex-wrap align-items-center justify-content-center">
                  <div className="col-6 text-center">
                      <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image" />
                      <h6>Time Table Not Yet Created</h6>

                  </div>
              </div>
          ) : (<Card className="border-0 rounded-2 shadow-sm py-3 mt-3">
                        <Card.Title className="ps-3 fs-16">Time Table</Card.Title>
                        <Card.Body className="overflow-visible">
                            <div className="table-responsive">
                                <table className="table text-center align-middle timetable">
                                    <thead>
                                        <tr>
                                            <th>Day / Period</th>
                                            {periods?.map((p, idx) => (
                                                <th key={idx}>
                                                    <div>{p?.label}</div>
                                                        <small>
                                                            {p?.start_time && p?.end_time
                                                                ? `${format12Hour(p.start_time)} - ${format12Hour(p.end_time)}`
                                                                : "-"}
                                                        </small>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {days?.map((day) => (
                                            <tr key={day}>
                                                <td className="timetable_heading text-capitalize">{day}</td>
                                                {time_table?.data[day]?.map((period, index) => (
                                                    <td key={index}>
                                                        {time_table?.is_editing ? (
                                                            <ReactDropdownSelect
                                                                multi={false}
                                                                options={time_table?.classrooms || []}
                                                                value={
                                                                    (() => {
                                                                        const selected = time_table?.classrooms?.find(
                                                                            (c) => c.classroom_id === period?.classroom_id
                                                                        );
                                                                        return selected ? [selected] : [];
                                                                    })()
                                                                }
                                                                change={(val) => handleChangeSubject(day, index, val[0])}
                                                                labelField="classroom_name"
                                                                valueField="classroom_id"
                                                                placeholder="Select Classroom"
                                                            />

                                                        ) : (
                                                            <div className="d-flex flex-column">
                                                                <span className="fs-6">
                                                                    {time_table?.classrooms?.find(
                                                                            (s) => s.classroom_id === period.classroom_id
                                                                        )?.classroom_name || "-"
                                                                    }
                                                                </span>
                                                                <small className="text-muted">
                                                                    {time_table?.classrooms?.find(
                                                                            (s) => s.classroom_id === period.classroom_id
                                                                        )?.subject_name || ""
                                                                    }
                                                                </small>
                                                            </div>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>)
            }
        </Container>
  )
}

export default EditTeacherTimetable