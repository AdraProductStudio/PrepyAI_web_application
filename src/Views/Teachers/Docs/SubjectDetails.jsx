import { useParams } from "react-router-dom";

import Icons from "Utils/Icons";
import JsonData from "Views/Teachers/Utils/JsonData";
import SubjectOptionsCard from "Components/Card/SubjectOptionsCard";
import LinkComponent from "Components/Router_components/LinkComponent";
import StudentsTableCard from "./StudentsTableCard";
import ReactPaginateComp from "Components/Pagination/ReactPaginateComp";
import { useCustomNavigate } from "Components/CustomHooks";

const SubjectDetails = () => {
    const navigate = useCustomNavigate();
    const { jsonOnly } = JsonData();
    const { class_id } = useParams();

    return (
        <div>
            <div className="w-100 border-bottom pb-3">
                <div className="col">
                    <LinkComponent to={`/teachers_dashboard/classrooms/${class_id}`} className="brand-link-color">
                        <span>{Icons.back_button_icon_blue}</span>
                        <span className="align-middle">Subjects</span>
                    </LinkComponent>
                </div>
            </div>
            <div className="w-100 py-4 small_header_content_main overflowY pe-3">
                <div className="row">
                    {jsonOnly?.subject_options.map((item, index) => (
                        <div className="col-2 p-1" key={index}>
                            <SubjectOptionsCard icon={item?.icon} title={item?.title} onClickCard={()=>navigate(item?.route)}/>
                        </div>
                    ))}
                </div>

                <div className="mt-3">
                    <StudentsTableCard className="subject_overview_table_height" navigate_to="students_details"/>
                </div>

                <div className="mt-3">
                    <ReactPaginateComp />
                </div>
            </div>
        </div>
    )
}

export default SubjectDetails;