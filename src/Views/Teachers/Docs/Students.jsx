import ReactPaginateComp from "Components/Pagination/ReactPaginateComp";
import StudentsTableCard from "./StudentsTableCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllClassRooms, getGradeByClassroom, GetStudentsListByTeacher } from "../Actions/teacherAction";
import { useCommonState } from "Components/CustomHooks";
import { useParams } from "react-router-dom";
import ButtonComponent from "Components/Button/Button";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import Icons from "Utils/Icons";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "../Utils/JsonData";
import { update_Students_classroom } from "../Slice/teachersSlice";

const Students = () => {
  const { jsxJson } = JsonData();
  const { subject_id } = useParams();
  const dispatch = useDispatch();
  const { teachersState, commonState } = useCommonState();
  const { data, glow } = teachersState?.teacher_GetStudentListByTeacher;
  const { pagination } = commonState;

  useEffect(() => {
    dispatch(
      GetStudentsListByTeacher({
        subject_id,
        classroom_id: teachersState?.teacher_students_Classroom?.data?.classroom_id || ["all_classrooms"],
        search_query: "",
        show_entries: pagination?.siblingCount,
        page: pagination?.currentPage,
        sort_by: teachersState?.teachers_GetStudentsSortBy?.sort_by || "joined_at",
        sort_order: teachersState?.teachers_GetStudentsSortBy?.sort_order || "asc",
      })
    );
  }, [pagination,teachersState?.teacher_students_Classroom?.data?.classroom_id,teachersState?.teachers_GetStudentsSortBy]);

      // useEffect(()=>{
      //     dispatch(getGradeByClassroom(data))
      // },[data])

      useEffect(()=>{
        console.log(teachersState?.teacher_CreateStudents?.data,"DasdasdsadA")
          dispatch(getAllClassRooms())
          dispatch(
            update_Students_classroom({
              classroom_id: ["all_classrooms"],
            })
          );
      },[])
      
  return (
    <div className="container-fluid">
      <div className="w-100 border-bottom row pb-3">
        <div className="col">
          <h5>All Student List</h5>
        </div>
        <div className="col justify-content-end align-items-center d-flex gap-1 ">
          {/* <ButtonComponent
            type="button"
            className="btn btn-outline-dark border py-2 d-flex align-items-center gap-2"
            clickFunction={() =>
              dispatch(
                updateModalShow({
                  show: true,
                  close_btn: true,
                  modal_from: "TeacherClassroom",
                  modal_type: "createClassroom",
                })
              )
            }
          >
            {Icons.sortBy}
            <span className="align-middle">Sort by</span>
          </ButtonComponent> */}
           <div className="custom-select-wrapper">{Inputfunctions(jsxJson.sortForStudents)}</div>
           <div className="custom-select-wrapper">{Inputfunctions(jsxJson.selectStudentsByClassRoom)}</div>

          <ButtonComponent
            type="button"
            className="btn-brand-color border py-2"
            clickFunction={() =>
              dispatch(
                updateModalShow({
                  show: true,
                  close_btn: true,
                  modal_from: "students",
                  modal_type: "studentCreateModal",
                  size:"lg"
                })
              )
            }
          >
            {Icons.add_icon}
            <span className="lign-middle">Add Students</span>
          </ButtonComponent>
        </div>
      </div>
      <div className="w-100 py-1 small_header_content_main pe-3">
        <div className="mt-3">
          <StudentsTableCard
            className="student_table_height overflow-hidden"
            data={data}
            glow={glow}
            navigate_to="overview"
          />
        </div>

        <div className="mt-3">
          <ReactPaginateComp totalPages={data?.total_pages} />
        </div>
      </div>
    </div>
  );
};

export default Students;