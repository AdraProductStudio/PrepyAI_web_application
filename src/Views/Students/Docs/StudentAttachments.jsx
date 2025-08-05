import AttachmentCard from "Components/Card/AttachmentCard";
import { useCustomNavigate } from "Components/CustomHooks";
import { useParams } from "react-router-dom";
import JsonData from "Views/Students/Utils/JsonData";

const StudentAttachments = () => {
    const { jsonOnly } = JsonData();
    const { subject_id } = useParams();
    const navigate = useCustomNavigate();


    return (
        <div className="py-4">
            {Object.entries(jsonOnly?.attachments || []).map(([key, value]) => (
                <div className="row mb-3" key={key}>
                    <div className="col-12 attachment_title">
                        <p>{key}</p>
                    </div>
                    {value.map((item, index) => (
                        <div className="col-2 mt-4" key={index}>
                            <AttachmentCard className="student_attachment" onClickViewBook={() => navigate(`/student_dashboard/subjects/${subject_id}/attachments/${index}`)} delete_function={() => console.log("Delete function called")} download_function={() => console.log("Download function called")} />
                        </div>
                    ))}
                </div >
            ))}
        </div>
    )
}

export default StudentAttachments;