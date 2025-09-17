import TestDisplayCard from "Components/Card/TestDisplayCard";
import { getTestRecords } from "../Actions/TeacherActions";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Img from "Components/Img/Img";
import Image from "Utils/Image";
import SpinnerComponent from "Components/Spinner/Spinner";

const UpcomingTest = () => {
    const { class_id,subject_id } = useParams();
    const dispatch = useDispatch();
    const { teachersState } = useCommonState();
   

    useEffect(() => {
        if (class_id) {
            dispatch(getTestRecords({ subject_id, type: "upcoming" }));
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
    );
};

export default UpcomingTest;
