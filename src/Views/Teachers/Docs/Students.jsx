import ReactPaginateComp from "Components/Pagination/ReactPaginateComp";
import StudentsTableCard from "./StudentsTableCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetStudentsListByTeacher } from "../Actions/teacherAction";
import { useCommonState } from "Components/CustomHooks";
import { useParams } from "react-router-dom";

const Students = () => {
    const {subject_id} = useParams();
    const dispatch = useDispatch();
    const {teachersState,commonState} = useCommonState();
    const {data,glow} = teachersState?.teacher_GetStudentListByTeacher;
    const {pagination} = commonState;

    useEffect(()=>{
        dispatch(GetStudentsListByTeacher({subject_id,classroom_id:"all_classrooms",
            search_query:"",
            show_entries:pagination?.siblingCount,
            page:pagination?.currentPage,
            sort_by:"joined_at",
            sort_order:"asc"
        }))
    },[pagination])

    return (
        <div className="container-fluid">
            <div className="w-100 border-bottom pb-3">
                <div className="col">
                    <h5>All Student List</h5>
                </div>
            </div>
            <div className="w-100 py-1 small_header_content_main pe-3">
                <div className="mt-3">
                    <StudentsTableCard className="student_table_height overflow-hidden" data={data} glow={glow} navigate_to="overview" />
                </div>

                <div className="mt-3">
                    <ReactPaginateComp totalPages={data?.total_pages} />
                </div>
            </div>
        </div>
    )
}

export default Students;