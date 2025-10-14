import TimeTableDataCard from 'Components/Card/TimeTableDataCard'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import React, { useEffect, useState } from 'react'
import {Container, Row } from 'react-bootstrap'
import { getTitmetableList } from '../Actions/Admin_action'
import Spinner from 'Components/Spinner/CustomSpinner'
import Img from 'Components/Img/Img'
import Image from 'Utils/Image'

const TimetableReord = () => {
  const [tab,setTab ] = useState('teacher')
  const dispatch = useDispatch()
  const {timetable_list} = useCommonState()?.adminState

  useEffect(()=>{
    dispatch(getTitmetableList(tab))
  },[tab])
  return (
    <Container fluid className='h-100'>
      <Row className='w-100 p-3'>
        <div className='d-flex flex-wrap gap-4'>
          <div className=''>
            <span className={tab === "teacher" ? "timetable_btn_active" : "timetable_btn"}
            onClick={()=>setTab('teacher')}
            >Teacher-wise Time Table</span>
          </div>
          <div className=''>
            <span className={tab === "classroom" ? "timetable_btn_active" : "timetable_btn"}
            onClick={()=>setTab('classroom')}
            >Classroom-wise Time Table</span>
          </div>
        </div>
      </Row>
      <Row className='px-2'>
        {timetable_list?.is_loading ? (
          <div className='d-flex justify-content-center align-items-center' style={{minHeight:'60vh'}}>
            <Spinner />
          </div>
        ) : timetable_list?.data?.length > 0 ?
          <div className="row">
            {timetable_list?.data?.map((data, i) => (
              <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2 d-flex" key={i}>
                <TimeTableDataCard data={data} />
              </div>
            ))}
          </div>
            : <div className="d-flex flex-wrap align-items-center justify-content-center" style={{minHeight:'70vh'}}>
              <div className="col-6 text-center">
                <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image" />
                <h6>No Data Found</h6>

              </div>
            </div>
        }

      </Row>

    </Container>
  )
}

export default TimetableReord