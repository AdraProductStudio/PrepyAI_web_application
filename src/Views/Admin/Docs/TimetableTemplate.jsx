import ButtonComponent from 'Components/Button/Button'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import LinkComponent from 'Components/Router_components/LinkComponent'
import Spinner from 'Components/Spinner/CustomSpinner'
import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Inputfunctions } from 'ResuableFunctions/Inputfunctions'
import Icons from 'Utils/Icons'
import JsonData from '../Utils/JsonData'
import { update_app_data, update_error } from 'Views/Common/Slices/Common_slice'
import { update_template, update_time_table } from '../Slices/adminSlice'
import { createTimetaleTemplate, getTimetableTemplate } from '../Actions/Admin_action'
import ButtonSpinner from 'Components/Spinner/ButtonSpinner'
import Input from 'Components/Input/Input'

const TimetableTemplate = () => {
    const { time_table, timetable_templete } = useCommonState()?.adminState
    const dispatch = useDispatch()
    const { jsxJson } = JsonData()
    const days = timetable_templete?.data ? Object.keys(timetable_templete.data) : []
    const periods = timetable_templete?.timing || []
    const hasTimetable = timetable_templete?.data && Object.keys(timetable_templete.data)?.length > 0

    const allDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

    useEffect(() => {
        dispatch(getTimetableTemplate())
    }, [])

    const format12Hour = (time24) => {
        if (!time24) return ""
        const [hourStr, min] = time24.split(":")
        let hour = parseInt(hourStr, 10)
        const ampm = hour >= 12 ? "PM" : "AM"
        hour = hour % 12
        if (hour === 0) hour = 12
        return `${hour}:${min} ${ampm}`
    }

    const handleCreateTimetable = () => {
        dispatch(update_app_data({ type: "validation", data: true }))
        const numDays = parseInt(time_table?.days, 10)
        const numPeriods = parseInt(time_table?.period, 10)
        if (!numDays || !numPeriods) return

        const selectedDays = allDays.slice(0, numDays)
        const newTimetable = {}
        selectedDays.forEach((day) => {
            newTimetable[day] = Array.from({ length: numPeriods }, () => ({
                subject_id: null,
                teacher_id: null,
                start_time: "",
                end_time: "",
            }))
        })

        const timing = Array.from({ length: numPeriods }, (_, i) => ({
            start_time: "",
            end_time: "",
            period_name: `Period ${i + 1}`,
        }))

        dispatch(update_template({ data: newTimetable, timing, is_editing: true }))
    }

    const validatePeriods = (periods) => {
        const missing = periods.filter((p) => !p.period_name?.trim() || !p.start_time || !p.end_time)
        if (missing.length > 0) {
            const invalidIndexes = missing.map((p) => p.period_id || periods.indexOf(p) + 1)
            dispatch(update_error({ Toast_Type: "error", Err: `Please fill all fields for periods: ${invalidIndexes.join(", ")}` }))
            return false
        }
        return true
    }



    const createTimeTableTemplate = ()=>{
        const isValid = validatePeriods(periods)
        if (!isValid) return 
        dispatch(createTimetaleTemplate({
            method: timetable_templete?.created ? "patch" : "post",
            payload: {
                no_of_days: time_table?.days,
                no_of_periods: time_table?.period,
                periods: timetable_templete?.timing
            }
        }))
    }

    const handleChangeTime = (periodIndex, field, value) => {
        const updatedTimes = timetable_templete?.timing?.map((p, idx) =>
            idx === periodIndex ? { ...p, [field]: value } : p
        )
        dispatch(update_template({ timing: updatedTimes }))
    }


const editTemplateLayout = (type, item) => {

    const updatedDays = JSON.parse(JSON.stringify(timetable_templete.data || {}))
    const updatedTiming = JSON.parse(JSON.stringify(timetable_templete.timing || []))
    let updatedDayCount = Number(time_table?.days) || Object.keys(updatedDays).length
    let updatedPeriodCount = Number(time_table?.period) || updatedTiming.length
    const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]


    if (item === "days") {
        if (type === "add") {
            if (updatedDayCount < 7) {
                const newDay = dayNames[updatedDayCount]
                updatedDays[newDay] = Array.from({ length: updatedPeriodCount }, () => ({
                    subject_id: null,
                    teacher_id: null,
                    start_time: "",
                    end_time: "",
                }))
                updatedDayCount += 1
            }
        } else if (type === "delete") {
            if (updatedDayCount > 1) {
                const lastDay = dayNames[updatedDayCount - 1]
                if (updatedDays[lastDay]) {
                    delete updatedDays[lastDay]
                    updatedDayCount -= 1
                }
            }
        }
    }

    if (item === "period") {
        if (type === "add") {
            updatedTiming.push({
                start_time: "",
                end_time: "",
                period_name: `Period ${updatedTiming.length + 1}`,
            })

            Object.keys(updatedDays).forEach((day) => {
                updatedDays[day].push({
                    subject_id: null,
                    teacher_id: null,
                    start_time: "",
                    end_time: "",
                })
            })
            updatedPeriodCount += 1
        } else if (type === "delete") {
            if (updatedTiming.length > 1) {
                updatedTiming.pop()
                Object.keys(updatedDays).forEach((day) => {
                    updatedDays[day].pop()
                })
                updatedPeriodCount -= 1
            }
        }
    }

    dispatch(update_template({ data: updatedDays, timing: updatedTiming }))
    dispatch(update_time_table({ days: updatedDayCount, period: updatedPeriodCount }))
}

    return (
        <Container fluid className="w-100 h-100 d-flex flex-column">
            <Row className="pb-3 border-bottom">
                <Col md={12} className="d-flex gap-3 justify-content-between">
                    <LinkComponent
                        to={`/admin_dashboard/timetable`}
                        className="brand-link-color"
                        onLinkClick={() => {
                            dispatch(update_template({ is_editing: false,data:[],timing:[] }))
                            dispatch(update_time_table({period:null,days:null}))
                        }}
                    >
                        <span>{Icons.back_button_icon_blue}</span>
                        <span className="align-middle">Back</span>
                    </LinkComponent>
                    {(hasTimetable && !timetable_templete?.is_loading) && (
                        <div>
                            <ButtonSpinner
                                className="btn-brand-color border-0 p-2"
                                is_spinner={timetable_templete?.is_loading}
                                title={timetable_templete?.is_editing ? "Save Template" : "Edit Template"}
                                clickFunction={timetable_templete?.is_editing ? createTimeTableTemplate :
                                    () => dispatch(update_template({ is_editing: true }))
                                }
                            />
                        </div>
                    )}
                </Col>
            </Row>

            {timetable_templete?.is_loading ? (
                <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '60vh' }}>
                    <Spinner />
                </div>
            ) : hasTimetable ? (
                <Row className="mt-3 px-3">
                    <Card className="border-0 rounded-2 shadow-sm py-3 w-100">
                        <Card.Title className="ps-3 fs-5">Time Table Template</Card.Title>
                        <Card.Body className="overflow-visible">
                            <div className="table-responsive">
                                <table className="table text-center align-middle timetable">
                                    <thead>
                                        <tr>
                                            <th>Day / Period</th>
                                            {periods?.map((p, idx) => (
                                                <th key={idx}>
                                                    <div className="mb-1">
                                                        {timetable_templete?.is_editing ? (
                                                            <Input
                                                                    type="text"
                                                                    value={p.period_name}
                                                                    change={(e) => handleChangeTime(idx, "period_name", e.target.value)}
                                                                    className="text-center"
                                                                />
                                                        ) : (
                                                            <strong>{p.period_name}</strong>
                                                        )}
                                                    </div>
                                                    <div className="d-flex flex-column gap-1">
                                                        {timetable_templete?.is_editing ? (
                                                            <>
                                                                <Input
                                                                    type="time"
                                                                    value={p.start_time}
                                                                    change={(e) => handleChangeTime(idx, "start_time", e.target.value)}
                                                                />
                                                                 <Input
                                                                    type="time"
                                                                    value={p.end_time}
                                                                    change={(e) => handleChangeTime(idx, "end_time", e.target.value)}
                                                                />
                                                            </>
                                                        ) : (
                                                            <small>
                                                                {p.start_time && p.end_time
                                                                    ? `${format12Hour(p.start_time)} - ${format12Hour(p.end_time)}`
                                                                    : "-"}
                                                            </small>
                                                        )}
                                                    </div>
                                                </th>
                                            ))}
                                            {timetable_templete?.is_editing && (
                                                <th>
                                                    <div className='d-flex flex-column gap-2'>
                                                        <ButtonComponent buttonName={Icons?.timetable_add} className="btn-outline-primary timetable_edit_btn" clickFunction={() => editTemplateLayout("add", "period")} />
                                                        <ButtonComponent buttonName={Icons?.timetable_delete} className="btn-outline-danger timetable_delete_btn" clickFunction={() => editTemplateLayout("delete", "period")} />
                                                    </div>
                                                </th>
                                            )}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {days?.map((day) => (
                                            <tr key={day}>
                                                <td className="text-capitalize fw-bold">{day}</td>
                                                {timetable_templete?.data[day]?.map((_, idx) => (
                                                    <td key={idx}><span>-</span></td>
                                                ))}
                                            </tr>
                                        ))}
                                        {timetable_templete?.is_editing && (
                                            <tr>
                                                <td className='border-bottom-0'>
                                                    <div className='d-flex gap-3'>
                                                        <ButtonComponent buttonName={Icons?.timetable_add}className="btn-outline-primary timetable_edit_btn" clickFunction={() => editTemplateLayout("add", "days")} />
                                                        <ButtonComponent buttonName={Icons?.timetable_delete} className="btn-outline-danger timetable_delete_btn" clickFunction={() => editTemplateLayout("delete", "days")} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Row>
            ) : (
                <Row className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <Card className="col-12 col-md-6 col-lg-4 d-flex flex-column mb-3 py-4 shadow-sm border-0 rounded-3">
                        <p className="mb-0 text-center fs-5">Create TimeTable Template</p>
                        <Card.Body className="d-flex flex-column gap-3 p-4">
                            {Inputfunctions(jsxJson?.create_timetable)}
                            <ButtonComponent
                                className="btn-brand-color border-0"
                                buttonName="Create"
                                clickFunction={handleCreateTimetable}
                            />
                        </Card.Body>
                    </Card>
                </Row>
            )}
        </Container>
    )
}

export default TimetableTemplate
