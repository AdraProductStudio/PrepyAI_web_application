import ButtonComponent from "Components/Button/Button"
import { useDispatch } from "Components/CustomHooks"
import Img from "Components/Img/Img"
import { Card } from "react-bootstrap"
import Icons from "Utils/Icons"
import Image from "Utils/Image"
import { updateModalShow } from "Views/Common/Slices/Common_slice"
import { updateDeleteAttachment } from "Views/Teachers/Slice/teachersSlice"

const AttachmentCard = ({
    data, delete_function,
    className, onClickViewBook
     
}) => {
 const dispatch = useDispatch();
 const deleteData = {id:data?.id,subject_id:data?.subject_id}
    return (
        <Card className={`border-0 rounded-4 ${className}`} onClick={onClickViewBook}>
            <Card.Body className="position-relative">
                <Img src={Image.book_image} alt="book image" className="book_image" />

                <div className="delete_icon">
                    <ButtonComponent
                        type="button"
                        className="btn-transparent"
                        buttonName={Icons?.delete_icons}
                        clickFunction={() =>{
                            dispatch(updateDeleteAttachment(deleteData))
                            dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "teacher", modal_type: "delete_attachments" }))}
                        }
                            
                    />
                </div>

                <div className="download_icon">
                    <ButtonComponent
                        type="button"
                        className="btn-transparent"
                        clickFunction={() => {
                            if (!data?.url) return;

                            const link = document.createElement("a");
                            link.href = data.url;
                            link.download = ""; // keeps original filename, or set "myfile.pdf"
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                    >
                        {Icons?.attachment_download_icon}
                    </ButtonComponent>

                </div>
            </Card.Body>
            <Card.Footer className="border-0 bg-transparent p-1">
                <p className="text-truncate">{data?.name || ''}</p>
            </Card.Footer>
        </Card >
    )
}

export default AttachmentCard