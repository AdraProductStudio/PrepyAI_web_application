import ButtonComponent from 'Components/Button/Button'
import React from 'react'
import { Card } from 'react-bootstrap'
import Image from 'Utils/Image'
import Icons from 'Utils/Icons'
import { useCustomNavigate, useDispatch } from 'Components/CustomHooks'
import { update_time_table } from 'Views/Admin/Slices/adminSlice'
import { updateModalShow } from 'Views/Common/Slices/Common_slice'

const TimeTableDataCard = ({ data }) => {
    const navigate = useCustomNavigate()
    const dispatch = useDispatch()
    const classroomId = data?.classroom_id
    const teacherId = data?.teacher_id

    const handleNavigate = () => {
        dispatch(update_time_table({data:null,subjects:[],classrooms:[] }))
        if (classroomId) {
            navigate(`classroom/${classroomId}`)
        } else if (teacherId) {
            navigate(`teacher/${teacherId}`)
        }
    }

    const handleEditTimetable = ()=>{
       dispatch(update_time_table({ is_editing: true,data:null,subjects:[],classrooms:[] }))
        if (classroomId) {
            navigate(`classroom/${classroomId}`)
        } else if (teacherId) {
            navigate(`teacher/${teacherId}`)
        }
    }

    const handleDeleteTimetable = ()=>{
        if (classroomId) {
             dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "delete_timetable",data:{type:"classroom_id",id:classroomId} }))
        } else if (teacherId) {
             dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "delete_timetable",data:{type:"teacher_id",id:teacherId} }))
        }
    }
    return (
        <Card className='w-100 border-0 shadow-sm'>
            <div className='position-relative'>
                <Card.Img className='px-3 mt-3' variant="top" src={Image?.timetable} />
                <div className="position-absolute top-0 end-0 d-flex gap-2" style={{ margin: "25px 25px 0px 0px" }}>
                    <ButtonComponent
                        className="btn bg-white border-0 p-1 shadow-sm"
                        buttonName={Icons?.edit_icon}
                        clickFunction={handleEditTimetable}
                    />
                    <ButtonComponent
                        className="btn bg-white border-0 p-1 shadow-sm"
                        buttonName={Icons?.delete_icons}
                        clickFunction={handleDeleteTimetable}
                    />
                </div>
            </div>

            <Card.Body className='cursor-pointer' onClick={handleNavigate}>
                <div>
                    <p className='mb-0 text-center fs-6 fw-bold'>{data?.name || ''}</p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default TimeTableDataCard
