import ButtonComponent from "Components/Button/Button";
import { useCustomNavigate } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import { Card } from "react-bootstrap";
import Icons from "Utils/Icons";
import Image from "Utils/Image";

const BookCard = ({
    data = {},
    onClickDelete, className, viewFunction, previewFunction
}) => {
 const navigate = useCustomNavigate()
    function dynamicContent() {
        const path = window.location.pathname;
        switch (true) {
            case /student_dashboard\/subjects\//.test(path):
                return (
                    <Card.Footer className="bg-transparent border-0 border-top d-flex justify-content-between px-0">
                        <div className="col-4">
                            <ButtonComponent type="button" className="btn-transparent fs-14 text-primary" buttonName="View" clickFunction={previewFunction}  />
                        </div>
                        <div className="col text-end border-start">
                            <ButtonComponent type="button" className="btn-transparent fs-14 brand_text_color" buttonName="Generate Question" clickFunction={()=> navigate(`/student_dashboard/generate_question/${data?.book_id}`)} />
                        </div>
                    </Card.Footer>
                )

            default:
                break;
        }
    }
    return (
        <Card className={`${className?.includes("border") ? "border" : "border-0"} rounded-4 shadow-sm px-3 h-100 ${className}`}>
            <Card.Header className="bg-transparent border-0 border-bottom row align-items-center px-0">
                <div className="col-10"><h6 className="mb-0">{data?.book_name || 'Book title'}</h6></div>
                <div className="col-2 text-end">
                    {/* <ButtonComponent type="button" className="bg-transparent" onClick={onClickDelete} buttonName={Icons?.delete_icons} /> */}
                </div>
            </Card.Header>
            <Card.Body className="row align-items-center pointer" onClick={viewFunction}>
                <div className="col-3">
                    <Img src={Image?.pdfImage || ''} width="70%%" height="70%" alt="pdf-image" />
                </div>
                <div className="col-9">
                    <div className="w-100">
                        <p className="mb-1 fs-15"><span className="text-secondary">Chapters :</span>{data?.chapters || 0}</p>
                        <p className="mb-1 fs-15"><span className="text-secondary">Question sets :</span>{data?.question_sets || 0}</p>
                        <p className="mb-1 fs-15"><span className="text-secondary">Performance :</span>{data?.performance || 0}</p>
                    </div>
                </div>
            </Card.Body>
            {dynamicContent()}
        </Card>
    )
}

export default BookCard;