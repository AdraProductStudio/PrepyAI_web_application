// import { useParams } from "react-router-dom";
// import Icons from "Utils/Icons";
// import LinkComponent from "Components/Router_components/LinkComponent";
// import BookCard from "Components/Card/BookCard";

// const Books = () => {
//     const { class_id, subject_id } = useParams();

//     function dynamicBackRoute() {
//         const path = window.location.pathname;
//         switch (true) {
//             case path.includes("teachers_dashboard"):
//                 return `/teachers_dashboard/classrooms/${class_id}/${subject_id}`;

//             default:
//                 return '/'
//         }
//     }

//     return (
//         <div className="h-100">
//             <div className="container-fluid">
//                 <div className="w-100 border-bottom pb-3">
//                     <LinkComponent to={dynamicBackRoute()} className="brand-link-color">
//                         <span>{Icons.back_button_icon_blue}</span>
//                         <span className="align-middle">Back to classroom</span>
//                     </LinkComponent>
//                 </div>

//                 <div className="books_layout py-3">
//                     <div className="h-100 w-100 overflowY">
//                         <div className="row">
//                             {Array.from({ length: 34 }).map((_, index) => (
//                                 <div className="col-3 p-2" key={index}>
//                                     <BookCard />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Books;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Icons from "Utils/Icons";
import LinkComponent from "Components/Router_components/LinkComponent";
import BookCard from "Components/Card/BookCard";
import { getBooks } from "../Actions/Common_action";
import { useCommonState } from "Components/CustomHooks";
import SpinnerComponent from "Components/Spinner/Spinner";


const Books = () => {
    const { class_id, subject_id } = useParams();
    const dispatch = useDispatch();
    const { commonState } = useCommonState();

    // const {books} = commonState?.data?.books
    const { loading, data: books, error } = commonState?.books


    useEffect(() => {
        dispatch(getBooks({ classroom_id: "18", subject_id: "1" }));
    }, [dispatch, class_id, subject_id]);

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
        // <div className="h-100">
        //     <div className="container-fluid">
        //         <div className="w-100 border-bottom pb-3">
        //             <LinkComponent to={dynamicBackRoute()} className="brand-link-color">
        //                 <span>{Icons.back_button_icon_blue}</span>
        //                 <span className="align-middle">Back to classroom</span>
        //             </LinkComponent>
        //         </div>

        //         <div className="books_layout py-3">
        //             <div className="h-100 w-100 overflowY">
        //                 {loading && <p>Loading books...</p>}
        //                 {error && <p className="text-danger">{error}</p>}
        //                 <div className="row">
        //                    {commonState?.books?.data?.length > 0 ? (
        //                        commonState?.books?.data?.map((book, index) => (
        //                             <div className="col-3 p-2" key={book.id || index}>
        //                                 <BookCard data={book} />
        //                             </div>
        //                         ))
        //                     ) : (
        //                         !loading && <p>No books found</p>
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
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
                        {loading ? (
                            <div className="w-100 h-100 row align-items-center justify-content-center">
                                <div className="col-6 text-center">
                                    <SpinnerComponent />
                                    <p className="py-3">Getting Books...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <p className="text-danger">{error}</p>
                        ) : (
                            <div className="row">
                                {commonState?.books?.data?.length > 0 ? (
                                    commonState.books.data.map((book, index) => (
                                        <div className="col-3 p-2" key={book.id || index}>
                                            <BookCard data={book} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No books found</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Books;