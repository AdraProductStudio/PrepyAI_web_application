import ButtonComponent from "Components/Button/Button";
import SubjectsCard from "Components/Card/SubjectsCard";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import Tooltip from "Components/Tooltip/Tooltip";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CopyToClipboard from "ResuableFunctions/CopyToClipboard";
import Icons from "Utils/Icons";
import Image from "Utils/Image";
import { deleteSubjects, getClassroomTeachers, getSubjects } from "../Actions/teacherAction";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { Row,Col } from "react-bootstrap";
import Spinner from "Components/Spinner/CustomSpinner";

const Subject = () => {
    const { class_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    useEffect(()=>{
        if(class_id){
            dispatch(getSubjects({classroom_id:class_id}));
        }
    },[])

    const {teachersState} = useCommonState();
    const {data,glow} = teachersState?.teacher_GetSubjects; 


    return (
      <div className="h-100">
        <div className="container-fluid">
          <Row  className="d-flex justify-content-between border-bottom pb-3 mt-3">
            <Col xs={12} md={4} lg={3}  className="d-flex align-items-center justify-content-between mb-2 mb-md-0">
              <Link
                to="/teachers_dashboard/classrooms"
                className="brand-link-color d-flex align-items-center col-5 col-md-12"
              >
                <span>{Icons.back_button_icon_blue}</span>
                <span className="align-middle d-non">Back to Classroom</span>
              </Link>
               <ButtonComponent type="button"
                className="btn-brand-color border py-2 d-flex d-md-none align-items-center justify-content-center col-6"
                clickFunction={() => {
                  dispatch(
                    updateModalShow({
                      show: true,
                      close_btn: true,
                      modal_from: "subjects",
                      modal_type: "subjects",
                    })
                  );
                  dispatch(getClassroomTeachers({ classroom_id: class_id }));
                }}
              >
                {Icons.add_icon}
                <span className="align-middle ms-2">Add Subject</span>
              </ButtonComponent>
            </Col>
            <Col xs={12} md={8} lg={9} className="d-flex flex-wrap justify-content-end align-items-center gap-2 gap-xl-4" >
              <ButtonComponent type="button"
                className="btn-brand-color border py-2 d-md-flex align-items-center d-none "
                clickFunction={() => {
                  dispatch(
                    updateModalShow({
                      show: true,
                      close_btn: true,
                      modal_from: "subjects",
                      modal_type: "subjects",
                    })
                  );
                  dispatch(getClassroomTeachers({ classroom_id: class_id }));
                }}
              >
                {Icons.add_icon}
                <span className="align-middle ms-2">Add Subject</span>
              </ButtonComponent>
              <div className="d-flex align-items-center flex-wrap">
                <span className="brand-link-color me-3">Class Room ID :</span>
                <ButtonComponent
                  type="button"
                  className="bg-transparent border px-2 py-1 d-flex align-items-center"
                  clickFunction={() =>
                    CopyToClipboard(data?.classroom_code, dispatch)
                  }
                >
                  {Icons.copy_icon}
                  <span className="align-middle ps-14 ps-2">
                    {data?.classroom_code}
                  </span>
                </ButtonComponent>
                <Tooltip tooltip_content="This is the classroom ID. Please share it with the students"/>
              </div>
            </Col>  

          </Row>

          <div className="w-100 row align-content-start small_header_content_main overflowY">
            {glow ? (
              <div className="w-100 h-100 row align-items-center justify-content-center">
                <div className="col-6 text-center">
                  <Spinner />
                </div>
              </div>
            ) : !data?.subjects?.length > 0 ? (
              <div className="w-100 h-100 row align-items-center justify-content-center">
                <div className="col-6 text-center">
                  <Img
                    src={Image?.no_data_found}
                    alt="No subjects Found"
                    className="no_data_found_image"
                  />
                  <h6>No subjects were added</h6>
                  <ButtonComponent
                    type="button"
                    className="btn-brand-color border py-2"
                    clickFunction={() => {
                      dispatch(
                        updateModalShow({
                          show: true,
                          close_btn: true,
                          modal_from: "subjects",
                          modal_type: "subjects",
                        })
                      );
                      dispatch(getClassroomTeachers({ classroom_id: class_id }));
                    }}
                  >
                    {Icons.add_icon}
                    <span className="lign-middle">Add Subject</span>
                  </ButtonComponent>
                </div>
              </div>
            ) : (
              data?.subjects?.map((val, index) => (
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-2" key={index}>
                  <SubjectsCard
                    cardClassName="w-100"
                    data={val}
                    buttonName="View"
                    cardBodyClassName={"pointer"}
                    onclickCard={() =>
                      val?.owned ? navigate(`/teachers_dashboard/classrooms/${class_id}/${val?.subject_id}`) : null
                    }
                    onclickDelete={() => {
                      dispatch(
                        updateModalShow({
                          show: true,
                          close_btn: true,
                          modal_from: "techaersdeletemodal",
                          modal_type: "techaersdeletemodal",
                          data: () =>
                            dispatch(deleteSubjects(val?.subject_id, class_id)),
                        })
                      );
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
}
export default Subject;