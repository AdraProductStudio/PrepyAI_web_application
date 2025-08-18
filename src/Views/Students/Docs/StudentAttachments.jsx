import AttachmentCard from "Components/Card/AttachmentCard";
import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useParams } from "react-router-dom";
import Image from "Utils/Image";
import JsonData from "Views/Students/Utils/JsonData";

const StudentAttachments = () => {
    const { jsonOnly } = JsonData();
    const { subject_id } = useParams();
    const navigate = useCustomNavigate();
    const { studentState } = useCommonState()


    return (
        <div>
            {studentState?.subject_attachments_loading ? 
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px" }}>
                    <SpinnerComponent /> <p className="m-0">loading...</p>
                </div> 
                :
                Object.entries(studentState?.subject_attachments || []).length > 0 ? (
                Object.entries(studentState?.subject_attachments || []).map(([key, value]) => (
                    <div className="row my-3" key={key}>
                        <div className="col-12 attachment_title">
                            <p>{key}</p>
                        </div>
                        {value.map((item, index) => (
                            <div className="col-2 mt-4 mx-3" key={index}>
                                {/* <AttachmentCard className="student_attachment" onClickViewBook={() => navigate(`/student_dashboard/subjects/${subject_id}/attachments/${index}`)} delete_function={() => console.log("Delete function called")} download_function={() => console.log("Download function called")} /> */}
                                <AttachmentCard className="student_attachment" delete_function={() => console.log("Delete function called")}
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
                <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '500px' }}>
                    <span><Img src={Image.no_data_found} width={100} /></span>
                    <p>No attachments</p>
                </div>
            )
            }
        </div>
    )
}

export default StudentAttachments;