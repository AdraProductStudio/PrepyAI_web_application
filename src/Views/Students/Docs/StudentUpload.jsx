import React, { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { Card, Row, Col } from "react-bootstrap";

import Icons from 'Utils/Icons';
import BookCard from 'Components/Card/BookCard';
import ButtonComponent from 'Components/Button/Button';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import JsonData from 'Views/Students/Utils/JsonData';
import { SearchComponent } from 'ResuableFunctions/SearchFun';
import { handleGetLearnerBooks } from "../Actions/StudentAction"
import { useCommonState } from "Components/CustomHooks"


const StudentUpload = () => {
  const { jsonOnly } = JsonData();
  const dispatch = useDispatch();
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
            <span className="d-flex justify-content-between">{Icons.studentUpload} Upload Your Book</span>
          </ButtonComponent>
        </div>

        <div className="col-md-5 col-lg-4">
          <div className="input-group h-100 rounded overflow-hidden">
            <SearchComponent />
          </div>
        </div>
      </Card.Header>

      <Card.Body className='p-2 student_upload_body'>
        <Row className="row-cols-1 row-cols-md-2">
          {searchRegex.length > 0 ? (
            studentState?.all_learner_books?.books
              ?.filter((book) => book.book_name?.toLowerCase().includes(searchRegex.toLowerCase()))
              .map((book, idx) => (
                <Col key={idx} className="d-flex">
                  <div className="w-100 p-1">
                    <BookCard
                      className="col border"
                      data={book}
                      viewFunction={() => console.log(`View ${book.url}`)}
                      generateFunction={() => console.log(`Generate ${book.book_name}`)}
                      deleteFunction={() => console.log(`Delete ${book.book_name}`)}
                    />
                  </div>
                </Col>
              ))
          ) : (
            studentState?.all_learner_books?.books?.length > 0 ? (
            studentState?.all_learner_books?.books?.map((book, idx) => (
              <Col key={idx} className="d-flex">
                <div className="w-100 p-1">
                  <BookCard
                    className="col border"
                    data={book}
                    viewFunction={() => window.open(book.url, "_blank")}
                    generateFunction={() => console.log(`Generate ${book.book_name}`)}
                    deleteFunction={() => console.log(`Delete ${book.book_name}`)}
                  />
                </div>
              </Col>
            ))
            ):(
              <p>No uploaded books</p>
            )
          )
          }
        </Row>
      </Card.Body>
    </Card>
  )
}

export default StudentUpload