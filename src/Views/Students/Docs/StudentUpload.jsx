import React, { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { Card, Row, Col } from "react-bootstrap";

import Icons from 'Utils/Icons';
import BookCard from 'Components/Card/BookCard';
import ButtonComponent from 'Components/Button/Button';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import { SearchComponent } from 'ResuableFunctions/SearchFun';
import { handleGetLearnerBooks } from "../Actions/StudentAction"
import { useCommonState, useCustomNavigate } from "Components/CustomHooks"
import Image from "Utils/Image";
import Img from "Components/Img/Img";
import SpinnerComponent from "Components/Spinner/Spinner";


const StudentUpload = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate()
  const { studentState, commonState } = useCommonState()
  const searchRegex = commonState?.search?.value

  useEffect(() => {
    dispatch(handleGetLearnerBooks())
  }, [])

  return (
    <Card className="rounded-4 shadow-sm border-0 h-100">
      <Card.Header className="row py-3 bg-transparent justify-content-between align-items-stretch">
        <div className="col-md-5 col-lg-4">
          <ButtonComponent className="Uploadbtn w-100" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "dashboard", modal_type: "upload_book" }))} >
            <span className="d-flex justify-content-between py-1">{Icons.studentUpload} Upload your book</span>
          </ButtonComponent>
        </div>

        <div className="col-md-5 col-lg-4">
          <div className="input-group h-100 rounded overflow-hidden">
            <SearchComponent placeholder="Search..." />
          </div>
        </div>
      </Card.Header>

      <Card.Body className='p-2 student_upload_body'>
        <Row className="row-cols-1 row-cols-md-2">
          {studentState.loading["learner_books"] ?
            <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '600px' }}>
              <div className="col-5 text-center">
                <SpinnerComponent />
                <p className="m-0">Loading...</p>
              </div>
            </div>
            :
            searchRegex.length > 0 ? (
              (() => {
                const filteredBooks = studentState?.all_learner_books?.books?.filter((book) =>
                  book.book_name?.toLowerCase().includes(searchRegex.toLowerCase())
                ) || []

                return filteredBooks.length > 0 ? (
                  filteredBooks.map((book, idx) => (
                    <Col key={idx} className="d-flex">
                      <div className="w-100 p-1">
                        <BookCard
                          className="col border"
                          data={book}
                          viewFunction={() => navigate(`/student_dashboard/learner_book/${book.book_id}`) }
                          generateFunction={() => console.log(`Generate ${book.book_name}`)}
                          // onClickDelete={book?.owned ? () => console.log(`Delete ${book.book_name}`) : null}
                        />
                      </div>
                    </Col>
                  ))
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '700px' }}>
                    <span><Img src={Image.no_data_found} width={100} /></span>
                    <p>No uploaded books</p>
                  </div>
                );
              })()
            ) : (
              studentState?.all_learner_books?.books?.length > 0 ? (
                studentState?.all_learner_books?.books?.toReversed().map((book, idx) => (
                  <Col key={idx} className="d-flex">
                    <div className="w-100 p-1">
                      <BookCard
                        className="col border"
                        data={book}
                        viewFunction={() =>  navigate(`/student_dashboard/learner_book/${book.book_id}`)}
                        generateFunction={() => console.log(`Generate ${book.book_name}`)}
                        // onClickDelete={book?.owned ? () => console.log(`Delete ${book.book_name}`) : null}
                      />
                    </div>
                  </Col>
                ))
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '600px' }}>
                  <span><Img src={Image.no_data_found} width={100} /></span>
                  <p>No uploaded books</p>
                </div>
              )
            )}
        </Row>
      </Card.Body>
    </Card>
  )
}

export default StudentUpload