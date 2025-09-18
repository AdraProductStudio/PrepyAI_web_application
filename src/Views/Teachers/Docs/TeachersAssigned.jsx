import PerformanceTable from "./PerformanceTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateAssignedTestPaginationPage } from "Views/Teachers/Slice/teachersSlice";
import ReactPaginate from "react-paginate";
import { useCommonState } from "Components/CustomHooks";
import { handleTeacherAssingnedTestResult } from "../Actions/Teachers_action";
import { useParams } from "react-router-dom";

const TeachersAssigned = () => {
    const { class_id, subject_id } = useParams()
    const { teachersState } = useCommonState();
    const dispatch = useDispatch();
 
    const studentsPerformance = teachersState?.studentsPerformance || {}
    const jsonStudentsData = studentsPerformance?.assignedTest?.jsonStudentsData || []
    const pagination = studentsPerformance?.assignedTest?.pagination || 1
    
    useEffect(() => {
        if (class_id && subject_id) {
            dispatch(handleTeacherAssingnedTestResult({
                classroom_id: class_id,
                subject_id: subject_id,
                page: studentsPerformance?.assignedTest.pagination.page,
                show_entries: studentsPerformance?.assignedTest.pagination.show_entries
            }))
        }
    }, [class_id, subject_id, dispatch])

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        dispatch(updateAssignedTestPaginationPage(selectedPage))
    }

    return (
        <div>
            <PerformanceTable
                studentsData={jsonStudentsData}
                testType="teachers_assigned"
            />
            <div className="mt-3">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    pageCount={pagination.total_pages || 1}
                    forcePage={pagination.page - 1}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination justify-content-end"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                />
            </div>
        </div>
    )
}

export default TeachersAssigned;