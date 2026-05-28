/*
import ButtonComponent from 'Components/Button/Button'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import Spinner from 'Components/Spinner/CustomSpinner'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Icons from 'Utils/Icons'
import { updateModalShow } from 'Views/Common/Slices/Common_slice'

const TimeTable = () => {
    const { timetable_templete } = useCommonState()?.adminState
    const dispatch = useDispatch()


    return (
        <Container fluid className="h-100">
            <Row className="d-flex justify-content-end py-2">
                <Col xs={6} md={6} lg={3} xl={2} className="d-flex justify-content-end">
                    <ButtonComponent className="btn-brand-color border-0 py-2 w-100" 
                    buttonName={<span>{Icons?.add_icon} Create Time Template</span>}
                    clickFunction={()=>dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "create_timetable" }))}  />
                </Col>
            </Row>

            <Row className="">
                {timetable_templete?.is_loading ? (
                    <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '80vh' }}>
                        <Spinner />
                    </div>
                ) : (
                    timetable_templete?.data?.length !== 0 ? (
                        <div>

                        </div>
                    ) : <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '70vh' }}>
                                <div className='d-flex flex-column gap-3'>
                                    <span>{Icons?.no_timetable_icon}</span>
                                    <p className='mb-0'>You Don't have any time table Template</p>
                                    <ButtonComponent 
                                    className='btn-brand-color border-0' 
                                    buttonName={<span>{Icons?.add_icon} Create Template</span>}
                                    clickFunction={()=>dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "create_timetable" }))}
                                    />
                              </div>
                    </div>
                )}
            </Row>
        </Container>
    )
}

export default TimeTable  */

import ButtonComponent from 'Components/Button/Button'
import { useCustomNavigate } from 'Components/CustomHooks'
import React from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import Image from 'Utils/Image'

const TimeTable = () => {
    const navigate = useCustomNavigate()
    const data = [
        {
            name: "View Template",
            route: 'templete',
            title:"Template"
        },
        {
            name: "View Timetable",
            route: 'record',
            title: "TimeTable"
        }
    ]
    return (

        <Container fluid className='h-100' >
            <Row className='w-100'>
                {data?.map((data, ind) => {
                    return (<div className='col-12 col-md-6 col-lg-4 col-xl-3 p-2' key={ind}>
                        <Card className='w-100 border-0 shadow-sm'>
                            <Card.Title className='text-center text-primary fs-4 mt-2'>{data?.title}</Card.Title>
                            <Card.Img className='px-3' variant="top" src={Image?.timetable} />
                            <Card.Body>
                            <ButtonComponent className="btn-brand-color border-0 w-100" buttonName={data?.name} clickFunction={()=>{
                                navigate(`${data?.route}`)
                            }} />
                            </Card.Body>
                        </Card>
                    </div>
                    )
                })}
            </Row>

        </Container>

    )
}

export default TimeTable
