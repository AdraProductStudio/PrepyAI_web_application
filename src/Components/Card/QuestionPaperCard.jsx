import { Card } from "react-bootstrap";
import PdfViewer from "ResuableFunctions/PdfViewer";
import filee from "../../Anil_Menon.pdf"

const QuestionPaperCard = ({
    title, onClickCard
}) => {

    return (
        <Card className="border-0 shadow-sm w-100" onClick={onClickCard}>
            <Card.Body>
                <PdfViewer pdfUrl={filee} className="col-12" />
                <Card.Title className="text-center">{title}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default QuestionPaperCard;