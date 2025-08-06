import NoteCard from "Components/Card/NoteCard";

const Notes = () => {
    let data = { date: '2023-10-01', title: 'Sample Note Title', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s .", time: '10:00 AM' };

    return (
        <div className="container-fluid">
            <div className="w-100 border-bottom pb-3">
                <div className="col">
                    <h5>My Notes</h5>
                </div>
            </div>

            <div className="w-100 small_header_content_main row overflowY">
                {Array.from({ length: 18 }).map((_, index) => (
                    <div className="col-md-6 col-lg-4 col-xxl-3 p-1">
                        <NoteCard data={data} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notes;