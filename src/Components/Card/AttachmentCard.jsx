import ButtonComponent from "Components/Button/Button"
import { CustomUseLocationHook, useDispatch } from "Components/CustomHooks"
import Img from "Components/Img/Img"
import { Card } from "react-bootstrap"
import Icons from "Utils/Icons"
import Image from "Utils/Image"
import { updateModalShow } from "Views/Common/Slices/Common_slice"
import { updateDeleteAttachment } from "Views/Teachers/Slice/teachersSlice"

const AttachmentCard = ({
    data, delete_function, download_function,
    className, onClickViewBook
     
}) => {
 const dispatch = useDispatch();
 const deleteData = {id:data?.id,subject_id:data?.subject_id}
 const path = CustomUseLocationHook()
    return (
        <Card className={`border-0 rounded-4 ${className}`} onClick={onClickViewBook}>
            <Card.Body className="position-relative">
                <Img src={Image.book_image} alt="book image" className="book_image" />
                {["student_dashboard"].includes(path) ? 
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
                </div> : null }
                <div className="download_icon">
                    <ButtonComponent
                        type="button"
                        className="btn-transparent"
                        clickFunction={download_function}
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