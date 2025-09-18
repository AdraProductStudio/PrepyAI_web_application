import LinkComponent from "Components/Router_components/LinkComponent";
import { useParams } from "react-router-dom";
import PdfViewer from "ResuableFunctions/PdfViewer";
import Icons from "Utils/Icons";
import { Card } from "react-bootstrap";
import IndividualBookTestPerformance from "Components/Card/IndividualBookTestPerformance";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import AttachmentBookHistoryCard from "Components/Card/AttachmentBookHistoryCard";
import { handleGetBookPerformance, handleGetBookTestHistory, handleGetBookUrl, handleGetSubjectBooks } from "../Actions/StudentAction";
import { useEffect, useState } from "react";
import Img from "Components/Img/Img";
import Image from "Utils/Image";
import ButtonComponent from "Components/Button/Button";
import SpinnerComponent from "Components/Spinner/Spinner";

const LearnerBooksOverview = () => {
 const { book_id } = useParams()
    const { studentState } = useCommonState()
    const [called, setCalled] = useState(false)
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()

    const book = studentState?.all_learner_books?.books.find((book) => book.book_id === Number(book_id))
    const book_url = studentState?.book_url
   
    useEffect(() => {
        if (!called && book?.book_id) {
            dispatch(handleGetBookUrl(book.book_id))
            dispatch(handleGetBookTestHistory(book.book_id, book.owned))
            dispatch(handleGetBookPerformance(book.book_id, book.owned))
            setCalled(true)
        }
    }, [ called, dispatch])


    const isValidUrl = (url) => {
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between w-100 border-bottom pb-3">
                <LinkComponent to={`/student_dashboard`} className="brand-link-color">
                    <span>{Icons.back_button_icon_blue}</span>
                    <span className="align-middle">{book?.book_name}</span>
                </LinkComponent>

                <ButtonComponent
                    type="button"
                    className="btn btn-brand-color px-2 py-2 mx-2"
                    buttonName="Generate questions"
                    clickFunction={() => navigate(`/student_dashboard/generate_question/${book.book_id}`)}
                />
            </div>

            <div className="w-100 small_header_content_main d-flex overflowY">
                <div className="col-8 p-1">
                    {
                        studentState?.loading['book_url'] ? (
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <div className="col-5 text-center">
                                    <SpinnerComponent />
                                    <p className="m-0">Loading...</p>
                                </div>
                            </div>
                        ) : (
                            <Card className="border-0 rounded-3 shadow-sm px-3 h-100 overflow-auto">
                                <Card.Body className="p-0">
                                    {isValidUrl(book_url?.url) ? (
                                        <iframe
                                            src={book_url.url}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 'none' }}
                                            title="PDF Viewer"
                                        />
                                    ) : (
                                        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '600px' }}>
                                            <span><Img src={Image.no_data_found} width={100} /></span>
                                            <p>URL not found</p>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        )
                    }
                </div>

                <div className="col-4">
                    <div className="col p-1">
                        <IndividualBookTestPerformance data={studentState?.book_performance} />
                    </div>
                    <div className="col p-1">
                        <AttachmentBookHistoryCard bookTestHistory={studentState?.book_test_history} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearnerBooksOverview;