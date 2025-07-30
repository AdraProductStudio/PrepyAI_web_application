import { useParams } from "react-router-dom";

import Icons from "Utils/Icons";
import JsonData from "Views/Teachers/Utils/JsonData";
import SubjectOptionsCard from "Components/Card/SubjectOptionsCard";
import LinkComponent from "Components/Router_components/LinkComponent";
import StudentsTableCard from "./StudentsTableCard";
import ReactPaginateComp from "Components/Pagination/ReactPaginateComp";

const SubjectDetails = () => {
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
            <div className="row pt-3">
                {jsonOnly?.subject_options.map((item, index) => (
                    <div className="col-2 p-1" key={index}>
                        <SubjectOptionsCard icon={item?.icon} title={item?.title} onClickCard={item?.route ? item?.route : item?.onClick} />
                    </div>
                ))}
            </div>
            <div className="w-100 py-4 subject_details_content_height overflowY pe-3">
                <StudentsTableCard className="h-100" navigate_to="students_details" />
            </div>
            <div className="mt-3">
                <ReactPaginateComp />
            </div>
        </div>
    )
}

export default SubjectDetails;