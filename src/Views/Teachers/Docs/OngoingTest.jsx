import TestDisplayCard from "Components/Card/TestDisplayCard";
import { useCommonState } from "Components/CustomHooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTestRecords } from "../Actions/TeacherActions";
import SpinnerComponent from "Components/Spinner/Spinner";
import Img from "Components/Img/Img";
import Image from "Utils/Image";

const OngoingTest = () => {

    const { teachersState } = useCommonState();
    const { class_id,subject_id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (subject_id) {
            dispatch(getTestRecords({ subject_id, type: "ongoing" }));
        }

    }, [])

    return (

        <div className="row py-3 h-100 align-content-start">
            {teachersState?.test_records?.glow ?
                <div className="w-100 h-100 row align-items-center justify-content-center">
                    <div className="col-6 text-center">
                        <SpinnerComponent />
                        <p className="py-3">Getting Completed Test Records</p>
                    </div>
                </div>
                :
                teachersState?.test_records?.data?.length > 0 ? (
                    teachersState?.test_records?.data?.map((test, index) => (
                        <div className="col-4 p-2" key={index}>
                            <TestDisplayCard data={test} />
                        </div>
                    ))
                ) : (
                    <div className="w-100 h-100 row align-items-center justify-content-center">
                        <div className="col-6 text-center">
                            <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image" />
                            <h6>No Data Found</h6>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default OngoingTest;