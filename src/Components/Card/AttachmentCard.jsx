import ButtonComponent from "Components/Button/Button"
import Img from "Components/Img/Img"
import { Card } from "react-bootstrap"
import Icons from "Utils/Icons"
import Image from "Utils/Image"

const AttachmentCard = ({
    delete_function, download_function
}) => {

    return (
        <Card className="attachment_books border-0 rounded-4">
            <Card.Body className="position-relative">
                <Img src={Image.book_image} alt="book image" className="book_image" />

                <div className="delete_icon">
                    <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.delete_icons} clickFunction={delete_function} />
                </div>

                <div className="download_icon">
                    <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.attachment_download_icon} clickFunction={download_function} />
                </div>
            </Card.Body>
        </Card >
    )
}

export default AttachmentCard