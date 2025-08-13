import BookCard from "Components/Card/BookCard";
import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import { useParams } from "react-router-dom";

const StudentsBooks = () => {
    const { subject_id } = useParams()
    const navigate = useCustomNavigate()
    const { studentState, commonState } = useCommonState()
    const searchRegex = commonState?.search?.value

    return (
        <div className="row">
            {searchRegex.length > 0 ? (
                studentState?.subject_books
                    ?.filter((book) => book.book_name?.toLowerCase().includes(searchRegex.toLowerCase()))
                    .map((book, idx) => (
                        <div className="col-12 col-md-6 col-lg-4 p-1" key={idx}>
                            <BookCard className="border" data={book} previewFunction={() => navigate(`/student_dashboard/subjects/${subject_id}/books/${idx}`)} />
                        </div>
                    ))
            ) : (
                studentState?.subject_books.length > 0 ? (
                    studentState?.subject_books?.map((book, idx) => (
                        <div className="col-12 col-md-6 col-lg-4 p-1" key={idx}>
                            <BookCard className="border" data={book} previewFunction={() => navigate(`/student_dashboard/subjects/${subject_id}/books/${idx}`)} />
                        </div>
                    ))
                ) : (
                    <p>No uploaded books</p>
                )
            )
            }
        </div>
    )
}

export default StudentsBooks;