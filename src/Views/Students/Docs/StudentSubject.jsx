import ButtonComponent from "Components/Button/Button";
import SubjectsCard from "Components/Card/SubjectsCard";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import Icons from "Utils/Icons";
import Image from "Utils/Image";
import { handleGetAllSubjects } from "../Actions/StudentAction"
import { useEffect } from "react"
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import SpinnerComponent from "Components/Spinner/Spinner";

const StudentSubject = () => {
    const navigate = useCustomNavigate();
    // const data = { no_of_stu: 30, no_of_books: 5, no_of_tests: 10, subject: "Tamil", teacher_name: 'teacher_name', date: "2023-10-01" };
    const dispatch = useDispatch()
    const { studentState } = useCommonState()

    useEffect(() => {
        dispatch(handleGetAllSubjects())
    }, [])

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 border-bottom pb-3">
                    <h5> Subjects </h5>
                </div>

                <div className="w-100 row align-content-start small_header_content_main overflowY">
                    {studentState?.loading['all_subjects'] ?
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="col-5 text-center">
                                <p>Getting subjects...</p>
                                <SpinnerComponent />
                            </div>
                        </div>
                        :
                        !studentState?.all_subjects || studentState.all_subjects.length === 0 ? (
                        <div className="w-100 h-100 row align-items-center justify-content-center">
                            <div className="col-6 text-center">
                                <Img src={Image?.no_subjects_added} alt="No subjects Found" className="no_subjects_added_image" />
                                <div className="w-100 mt-4">
                                    <ButtonComponent type="button" className="btn-brand-color border py-2" clickFunction={()=> dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "subjects", modal_type: "add_class" }))}>
                                        {Icons.add_icon}
                                        <span className="lign-middle">Join Class Room</span>
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {studentState?.all_subjects?.map((item, idx) => (
                                <div className="col-3 p-2" key={idx}>
                                    <SubjectsCard cardClassName="w-100 pointer" data={item} buttonName="View" onclickCard={() => navigate(`/student_dashboard/subjects/${item.subject_id}`)} />
                                </div>))
                            }
                        </>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentSubject;