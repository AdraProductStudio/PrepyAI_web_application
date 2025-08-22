import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Icons from "Utils/Icons";
import LinkComponent from "Components/Router_components/LinkComponent";
import BookCard from "Components/Card/BookCard";
import { getBooks } from "../Actions/Common_action";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import SpinnerComponent from "Components/Spinner/Spinner";
import Img from "Components/Img/Img";
import Image from "Utils/Image";


const Books = () => {
    const { class_id, subject_id } = useParams();
    const dispatch = useDispatch();
    const { commonState } = useCommonState();

    useEffect(() => {
        dispatch(getBooks({ classroom_id: class_id, subject_id: subject_id }));
    }, []);

    function dynamicBackRoute() {
        const path = window.location.pathname;
        switch (true) {
            case path.includes("teachers_dashboard"):
                return `/teachers_dashboard/classrooms/${class_id}/${subject_id}`;
            default:
                return "/";
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
                        {commonState?.books?.loading ?
                            <div className="w-100 h-100 row align-items-center justify-content-center">
                                <div className="col-6 text-center">
                                    <SpinnerComponent />
                                    <p className="py-3">Getting Books...</p>
                                </div>
                            </div>
                            :
                            commonState?.books?.data?.length > 0 ?
                                <div className="row">
                                    {commonState.books.data.map((book, index) => (
                                        <div className="col-3 p-2" key={book.id || index}>
                                            <BookCard data={book} />
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className="w-100 h-100 row align-items-center justify-content-center">
                                    <div className="col-6 text-center">
                                        <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image" />
                                        <h6>No Data Found</h6>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Books;