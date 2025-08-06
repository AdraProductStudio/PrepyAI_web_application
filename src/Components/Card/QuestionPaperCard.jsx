import { Card } from "react-bootstrap";
import PdfViewer from "ResuableFunctions/PdfViewer";

const QuestionPaperCard = ({
    title, onClickCard
}) => {

    return (
        <Card className="border-0 shadow-sm w-100" onClick={onClickCard}>
            <Card.Body>
                <PdfViewer pdfUrl="https://devcdn.2ndcareers.com/professional/resume/Anil_Menon.pdf" className="col-12" />
                <Card.Title className="text-center">{title}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default QuestionPaperCard;