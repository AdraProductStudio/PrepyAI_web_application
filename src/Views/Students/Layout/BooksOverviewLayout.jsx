import LinkComponent from "Components/Router_components/LinkComponent";
import { useParams } from "react-router-dom";
import PdfViewer from "ResuableFunctions/PdfViewer";
import Icons from "Utils/Icons";
import { Card } from "react-bootstrap";
import IndividualBookTestPerformance from "Components/Card/IndividualBookTestPerformance";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import AttachmentBookHistoryCard from "Components/Card/AttachmentBookHistoryCard";
import { handleGetBookTestHistory } from "../Actions/StudentAction";
import { useEffect } from "react";
import Img from "Components/Img/Img";
import Image from "Utils/Image";

const BooksOverviewLayout = () => {
    const { subject_id, book_idx } = useParams()
    const { studentState } = useCommonState()
    const dispatch = useDispatch()
    
    const book = studentState?.subject_books[book_idx]
    
    useEffect(() => {
        dispatch(handleGetBookTestHistory(book?.book_id))
    }, [])

    return (
        <div className="container-fluid">
            <div className="w-100 border-bottom pb-3">
                <LinkComponent to={`/student_dashboard/subjects/${subject_id}`} className="brand-link-color">
                    <span>{Icons.back_button_icon_blue}</span>
                    <span className="align-middle">{book?.book_name}</span>
                </LinkComponent>
            </div>

            <div className="w-100 small_header_content_main d-flex overflowY">
                <div className="col-8 p-1">
                {
                    <Card className="border-0 rounded-3 shadow-sm px-3 h-100 overflowY">
                        <Card.Body>
                                {/* <PdfViewer pdfUrl={book?.url} className="col-12" /> */}
                                {
                                    book?.url !== 'url not found' ?
                                        <iframe
                                            src={book?.url}
                                            width="100%"
                                            height="700px"
                                            style={{ border: 'none' }}
                                            title="PDF Viewer"
                                        />
                                        : <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '600px' }}>
                                            <span><Img src={Image.no_data_found} width={100} /></span>
                                            <p>Url not found</p>
                                        </div>
                                }

                        </Card.Body>
                    </Card>
                }
                </div>

                <div className="col-4">
                    <div className="col p-1">
                        <IndividualBookTestPerformance />
                    </div>
                    <div className="col p-1">
                        <AttachmentBookHistoryCard bookTestHistory={studentState?.book_test_history} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BooksOverviewLayout;