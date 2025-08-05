import BookCard from "Components/Card/BookCard";

const StudentsBooks = () => {

    return (
        <div className="row">
            {Array.from({ length: 36 }).map((_, index) => (
                <div className="col-12 col-md-6 col-lg-4 p-1" key={index}>
                    <BookCard className="border" />
                </div>
            ))}
        </div>
    )
}

export default StudentsBooks;