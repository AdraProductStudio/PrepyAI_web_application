import BookCard from "Components/Card/BookCard";
import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useParams } from "react-router-dom";
import Image from "Utils/Image";

const StudentsBooks = () => {
    const { subject_id } = useParams()
    const navigate = useCustomNavigate()
    const { studentState, commonState } = useCommonState()
    const searchRegex = commonState?.search?.value

    return (
        <div className="row">
            {studentState?.loading['subject_books'] ? 
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px" }}>
                    <div className="col-5 text-center">
                        <SpinnerComponent />
                        <p className="m-0">Loading...</p>
                    </div>
                </div> 
                :
                searchRegex.length > 0 ? (
                (() => {
                    const filteredBooks = studentState?.subject_books?.filter((book) =>
                        book.book_name?.toLowerCase().includes(searchRegex.toLowerCase())
                    ) || []

                    return filteredBooks.length > 0 ? (
                        filteredBooks.map((book, idx) => (
                            <div className="col-12 col-md-6 col-lg-4 p-1" key={idx}>
                                <BookCard
                                    className="border"
                                    data={book}
                                    previewFunction={() =>navigate(`/student_dashboard/subjects/${subject_id}/books/${idx}`)}
                                    generateFunction={() => navigate(`/student_dashboard/generate_question/${book.book_id}`)}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '500px' }}>
                            <span><Img src={Image.no_data_found} width={100} /></span>
                            <p>No uploaded books</p>
                        </div>
                    );
                })()
            ) : (
                studentState?.subject_books?.length > 0 ? (
                    studentState?.subject_books?.toReversed().map((book, idx) => (
                        <div className="col-12 col-md-6 col-lg-4 p-1" key={idx}>
                            <BookCard
                                className="border"
                                data={book}
                                previewFunction={() =>navigate(`/student_dashboard/subjects/${subject_id}/books/${idx}`)}
                                generateFunction={() => navigate(`/student_dashboard/generate_question/${book.book_id}`)}
                            />
                        </div>
                    ))
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '500px' }}>
                        <span><Img src={Image.no_data_found} width={100} /></span>
                        <p>No uploaded books</p>
                    </div>
                )
            )}
        </div>
    )
}

export default StudentsBooks