import TestDisplayCard from "Components/Card/TestDisplayCard";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "Utils/Image";
import { getTestRecords } from "Views/Teachers/Actions/TeacherActions";

const CompletedTest = () => {
    const { class_id } = useParams();
    const dispatch = useDispatch();
    const { teachersState } = useCommonState();

    useEffect(() => {
        if(class_id){
            dispatch(getTestRecords({ classroom_id: 19, type: "cancelled" }));
        }
    }, [class_id]);


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
                teachersState?.test_records?.data?.length ?
                    teachersState?.test_records?.data?.map((testdata, testindex) => (
                        <div className="col-md-6 col-lg-4 p-2" key={testindex}>
                            <TestDisplayCard data={testdata} />
                        </div>
                    ))
                    :
                    <div className="w-100 h-100 row align-items-center justify-content-center">
                        <div className="col-6 text-center">
                            <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image" />
                            <h6>No Data Found</h6>
                        </div>
                    </div>
            }
        </div>
    )
}

export default CompletedTest;