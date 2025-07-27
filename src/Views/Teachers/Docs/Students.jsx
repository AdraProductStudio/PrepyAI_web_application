import ReactPaginateComp from "Components/Pagination/ReactPaginateComp";
import StudentsTableCard from "./StudentsTableCard";

const Students = () => {
    return (
        <div className="container-fluid">
            <div className="w-100 border-bottom pb-3">
                <div className="col">
                    <h5>All Student List</h5>
                </div>
            </div>
            <div className="w-100 py-1 small_header_content_main pe-3">
                <div className="mt-3">
                    <StudentsTableCard className="student_table_height overflow-hidden" navigate_to="overview"/>
                </div>

                <div className="mt-3">
                    <ReactPaginateComp />
                </div>
            </div>
        </div>
    )
}

export default Students;