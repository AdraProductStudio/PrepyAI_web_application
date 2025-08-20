import ButtonComponent from "Components/Button/Button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions"
import { getBooks } from "Views/Common/Actions/Common_action";
import JsonData from "Views/Teachers/Utils/JsonData";
import { get_student_details } from "../Actions/TeacherActions";

const CreateTest = () => {
    const { jsxJson } = JsonData();
    const { class_id, subject_id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks({ classroom_id: "18", subject_id: "1" }));
        dispatch(get_student_details({classroom_id: "18",page:1}))
    }, [dispatch, class_id, subject_id]);

    return (
        <div className="p-5 h-100">
            <div className="col" style={{ height: "80%" }}>
                <div className="h-100 overflowY">
                    <div className="row">
                        {Inputfunctions(jsxJson?.create_test || [])}
                    </div>
                </div>
            </div>
            <div className="col d-flex justify-content-end align-items-center" style={{ height: "20%" }}>
                <ButtonComponent
                    type="button"
                    className="btn-brand-color px-5"
                    onClick={() => console.log("Test Created")}
                    buttonName="Next"
                />
            </div>
        </div>
    )
}

export default CreateTest

