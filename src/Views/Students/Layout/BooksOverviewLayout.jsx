import LinkComponent from "Components/Router_components/LinkComponent";
import { useParams } from "react-router-dom";
import PdfViewer from "ResuableFunctions/PdfViewer";
import Icons from "Utils/Icons";
import { Card } from "react-bootstrap";
import IndividualBookTestPerformance from "Components/Card/IndividualBookTestPerformance";
import AttachmentBookHistoryCard from "Components/Card/AttachmentBookHistoryCard";

const BooksOverviewLayout = () => {
    const { subject_id } = useParams();

    return (
        <div className="container-fluid">
            <div className="w-100 border-bottom pb-3">
                <LinkComponent to={`/student_dashboard/subjects/${subject_id}/attachments`} className="brand-link-color">
                    <span>{Icons.back_button_icon_blue}</span>
                    <span className="align-middle">12th_Botany_EM_Text_www.tntextbooks.in</span>
                </LinkComponent>
            </div>

            <div className="w-100 small_header_content_main d-flex overflowY">
                <div className="col-8 p-1">
                    <Card className="border-0 rounded-3 shadow-sm px-3 h-100 overflowY">
                        <Card.Body>
                            <PdfViewer pdfUrl="https://devcdn.2ndcareers.com/professional/resume/Anil_Menon.pdf" className="col-12" />
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-4">
                    <div className="col p-1">
                        <IndividualBookTestPerformance />
                    </div>
                    <div className="col p-1">
                        <AttachmentBookHistoryCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BooksOverviewLayout;