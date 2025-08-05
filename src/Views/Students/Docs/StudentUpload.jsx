import React from "react"
import { useDispatch } from 'react-redux';
import { Card, Row, Col } from "react-bootstrap";

import Icons from 'Utils/Icons';
import BookCard from 'Components/Card/BookCard';
import ButtonComponent from 'Components/Button/Button';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import JsonData from 'Views/Students/Utils/JsonData';
import { SearchComponent } from 'ResuableFunctions/SearchFun';


const StudentUpload = () => {
  const { jsonOnly } = JsonData();
  const dispatch = useDispatch();

  return (
    <Card className="rounded-4 shadow-sm border-0 h-100">
      <Card.Header className="row py-3 bg-transparent justify-content-between align-items-stretch">
        <div className="col-md-5 col-lg-4">
          <ButtonComponent className="btn w-100" clickFunction={() => dispatch(updateModalShow({ show: true, modal_close_btn: true }))} >
            <span className="d-flex">{Icons.StudentUpload} Upload Your Book</span>
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
          {jsonOnly?.bookData?.map((book, i) => (
            <Col key={i} className="d-flex">
              <div className="w-100 p-1">
                <BookCard
                  className="col border"
                  title={book.BookName}
                  Chapter={book.Chapter}
                  QuestionSets={book.QuestionSets}
                  Perfomance={book.Perfomance}
                  ViewFunction={() => console.log(`View ${book.BookName}`)}
                  GenerateFunction={() => console.log(`Generate ${book.BookName}`)}
                  DeleteFunction={() => console.log(`Delete ${book.BookName}`)}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body> 
    </Card>
  )
}

export default StudentUpload