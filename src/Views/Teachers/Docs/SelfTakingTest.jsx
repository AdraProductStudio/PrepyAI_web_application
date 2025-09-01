import PerformanceTable from "./PerformanceTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateSelfTestPaginationPage } from "Views/Teachers/Slice/teachersSlice";
import ReactPaginate from "react-paginate";
import { useCommonState } from "Components/CustomHooks";
import { handleSelfTestResult } from "../Actions/Teachers_action";
import { useParams } from "react-router-dom";

const SelfTakingTest = () => {
    const { class_id, subject_id } = useParams()
    const { teachersState } = useCommonState();
    const dispatch = useDispatch();

    const studentsPerformance = teachersState?.studentsPerformance || {}
    const jsonStudentsData = studentsPerformance?.selfTest?.jsonStudentsData || []
    const pagination = studentsPerformance?.selfTest?.pagination || 1

    useEffect(() => {
        if (class_id && subject_id) {
            dispatch(handleSelfTestResult({
                classroom_id: class_id,
                subject_id: subject_id,
                page: studentsPerformance.selfTest.pagination.page,
                show_entries: studentsPerformance.selfTest.pagination.show_entries
            }))
        }
    }, [class_id, subject_id, studentsPerformance?.selfTest?.pagination?.page, studentsPerformance?.selfTest?.pagination?.show_entries, dispatch])

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        dispatch(updateSelfTestPaginationPage(selectedPage))
    }

    return (
        <div>
            <PerformanceTable
                studentsData={jsonStudentsData}
                testType="self"
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