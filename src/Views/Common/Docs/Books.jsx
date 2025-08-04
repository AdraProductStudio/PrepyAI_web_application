import { useParams } from "react-router-dom";

import Icons from "Utils/Icons";
import LinkComponent from "Components/Router_components/LinkComponent";
import BookCard from "Components/Card/BookCard";

const Books = () => {
    const { class_id, subject_id } = useParams();

    function dynamicBackRoute() {
        const path = window.location.pathname;
        switch (true) {
            case path.includes("teachers_dashboard"):
                return `/teachers_dashboard/classrooms/${class_id}/${subject_id}`;

            default:
                return '/'
        }
    }

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 border-bottom pb-3">
                    <LinkComponent to={dynamicBackRoute()} className="brand-link-color">
                        <span>{Icons.back_button_icon_blue}</span>
                        <span className="align-middle">Back to classroom</span>
                    </LinkComponent>
                </div>

                <div className="books_layout py-3">
                    <div className="h-100 w-100 overflowY">
                        <div className="row">
                            {Array.from({ length: 34 }).map((_, index) => (
                                <div className="col-3 p-2" key={index}>
                                    <BookCard />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Books;