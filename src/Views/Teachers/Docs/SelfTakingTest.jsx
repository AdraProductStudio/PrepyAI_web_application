import PerformanceTable from "./PerformanceTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateSelfTestPaginationPage } from "Views/Teachers/Slice/teachersSlice";
import ReactPaginate from "react-paginate";
import { useCommonState } from "Components/CustomHooks";
import { handleSelfTestResult } from "../Actions/Teachers_action";

const SelfTakingTest = () => {
    const { teachersState } = useCommonState();
    const dispatch = useDispatch();

    const studentsPerformance =  teachersState?.studentsPerformance
    const jsonStudentsData = studentsPerformance.selfTest.jsonStudentsData
    const pagination = studentsPerformance.selfTest.pagination

    useEffect(() => {
        if(studentsPerformance.classroom_id && studentsPerformance.subject_id){
            dispatch(handleSelfTestResult({
                classroom_id: studentsPerformance.classroom_id,
                subject_id: studentsPerformance.subject_id,
                page: studentsPerformance.selfTest.pagination.page,
                show_entries: studentsPerformance.selfTest.pagination.show_entries
            }))
        }
    } ,[studentsPerformance.classroom_id, studentsPerformance.subject_id, studentsPerformance.selfTest.pagination.page, studentsPerformance.selfTest.pagination.show_entries, dispatch])

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1 ;
        dispatch(updateSelfTestPaginationPage(selectedPage))
    }

    return (
        <div>
            <PerformanceTable
                studentsData={jsonStudentsData}
                testType = "self"
            />
            <div className="mt-3">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    pageCount={pagination.total_pages || 0}
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

export default SelfTakingTest;