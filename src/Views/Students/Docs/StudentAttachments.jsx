import AttachmentCard from "Components/Card/AttachmentCard";
import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import { useParams } from "react-router-dom";
import JsonData from "Views/Students/Utils/JsonData";

const StudentAttachments = () => {
    const { jsonOnly } = JsonData();
    const { subject_id } = useParams();
    const navigate = useCustomNavigate();
    const { studentState } = useCommonState()


    return (
        <div>
            {Object.entries(studentState?.subject_attachments || []).length > 0 ? (
                Object.entries(studentState?.subject_attachments || []).map(([key, value]) => (
                    <div className="row my-3" key={key}>
                        <div className="col-12 attachment_title">
                            <p>{key}</p>
                        </div>
                        {value.map((item, index) => (
                            <div className="col-2 mt-4 mx-3" key={index}>
                                {/* <AttachmentCard className="student_attachment" onClickViewBook={() => navigate(`/student_dashboard/subjects/${subject_id}/attachments/${index}`)} delete_function={() => console.log("Delete function called")} download_function={() => console.log("Download function called")} /> */}
                                <AttachmentCard className="student_attachment"  delete_function={() => console.log("Delete function called")} 
                                    download_function={() => {
                                        const link = document.createElement('a')
                                        link.href = item.url
                                        link.download = 'file.pdf'
                                        document.body.appendChild(link)
                                        link.click()
                                        document.body.removeChild(link)
                                    }} 

                                />
                            </div>
                        ))}
                    </div >
                ))
            ) : (
                <p>No attachments</p>
            )
            }
        </div>
    )
}

export default StudentAttachments;