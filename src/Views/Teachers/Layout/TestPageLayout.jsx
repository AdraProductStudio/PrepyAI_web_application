import TestDisplayCard from "Components/Card/TestDisplayCard"
import Img from "Components/Img/Img"
import LinkComponent from "Components/Router_components/LinkComponent"
import { Card, Row } from "react-bootstrap"
import {useParams } from "react-router-dom"
import Icons from "Utils/Icons"
import JsonData from "Views/Teachers/Utils/JsonData"
import Image from "Utils/Image";
import { useCommonState, useDispatch } from "Components/CustomHooks"
import { getTestRecords } from "../Actions/TeacherActions"
import { useEffect} from "react"
import Spinner from "Components/Spinner/CustomSpinner"
import { update_testrecord_tab } from "../Slice/teachersSlice"

const TestPageLayout = () => {
    const { class_id, subject_id } = useParams();
    const { jsonOnly } = JsonData({ class_id, subject_id });
    const dispatch = useDispatch() 
    const { teachersState} = useCommonState()

    useEffect(() => {
        dispatch(getTestRecords({ subject_id, type: teachersState?.test_records?.test_tab}));
    }, [])

    const filterTestRecords = (value) => {
        dispatch(getTestRecords({ subject_id, type: value }));
    }

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 border-bottom pb-3 mt-3">
                    <LinkComponent to={`/teachers_dashboard/classrooms/${class_id}/${subject_id}`} className="brand-link-color">
                        <span>{Icons.back_button_icon_blue}</span>
                        <span className="align-middle">Back to classroom</span>
                    </LinkComponent>
                </div>
                <div className="sechdule_test_layout">
                    <div className="w-100 h-100 p-1">
                        <div className="row" style={{ height: "5%" }}>
                            <Row className="gx-2 gy-3">
                                {jsonOnly?.test_options.map((item, index) => (
                                        <div key={index} className="col-6 col-md-3 col-lg-2 col-xxl-1 d-flex justify-content-center align-items-center">
                                            <p className={teachersState?.test_records?.test_tab === item?.value ? "test_page_option_active mb-0" : "test_page_options mb-0"}
                                                onClick={() => {filterTestRecords(item?.value) 
                                                    dispatch(update_testrecord_tab(item?.value))}}
                                            >
                                                {item.name}
                                            </p>
                                        </div>
                                ))}
                            </Row>

                        </div>
                        <Card className="border-0 rounded-3 bg-transparents overflowY mt-3" style={{ height: "95%" }}>
                            <div className="row py-3 h-100 align-content-start" style={{minHeight:'60vh'}}>
                                {teachersState?.test_records?.glow ?
                                    <div className="w-100 h-100 row align-items-center justify-content-center">
                                        <div className="col-6 text-center my-5 my-lg-0">
                                            <Spinner />
                                        </div>
                                    </div>
                                    :
                                    teachersState?.test_records?.data?.length ?
                                        teachersState?.test_records?.data?.map((testdata, testindex) => (
                                            <div className="col-md-6 col-lg-4 p-2" key={testindex}>
                                                <TestDisplayCard data={testdata} />
                                            </div>
                                        ))
                                        :
                                        <div className="w-100 h-100 row align-items-center justify-content-center" style={{minHeight:'60vh'}}>
                                            <div className="col-6 text-center">
                                                <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image" />
                                                <h6>No Data Found</h6>
                                            </div>
                                        </div>
                                }
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestPageLayout