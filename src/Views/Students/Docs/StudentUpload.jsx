import React, { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { Card, Row, Col } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import Icons from 'Utils/Icons';
import BookCard from 'Components/Card/BookCard';
import ButtonComponent from 'Components/Button/Button';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import {handleGetLearnerBooks } from "../Actions/StudentAction"
import { useCommonState, useCustomNavigate } from "Components/CustomHooks"
import Image from "Utils/Image";
import Img from "Components/Img/Img";
import Spinner from "Components/Spinner/CustomSpinner";
import ReactPaginate from "react-paginate";
import { update_dashboard_pagination_inputs } from "../Slices/StudentSlice";



const StudentUpload = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate()
  const { studentState} = useCommonState()
  const itemsPerPage = 6
  const pageCount = Math.ceil(studentState?.all_learner_books?.total_count / itemsPerPage)

  useEffect(() => {
    dispatch(handleGetLearnerBooks({
      page:studentState?.dashboard_pagination_inputs?.page+1,
      search_query:studentState?.dashboard_pagination_inputs?.search_query}))
  }, [studentState?.dashboard_pagination_inputs?.page,studentState?.dashboard_pagination_inputs?.search_query])

  const handlePageClick = ({ selected }) => {
     dispatch(update_dashboard_pagination_inputs({page:selected}))
     dispatch(handleGetLearnerBooks({page:selected+1, search_query:studentState?.dashboard_pagination_inputs?.search_query}))
  }

  return (
    <Card className="rounded-4 shadow-sm border-0 h-100">
      <Card.Header className="row py-3 bg-transparent justify-content-between align-items-stretch gap-3 gap-md-0">
        <div className="col-md-5 col-lg-4">
          <ButtonComponent className="Uploadbtn w-100" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "dashboard", modal_type: "upload_book" }))} >
            <span className="d-flex justify-content-between py-1">{Icons.studentUpload} Upload your book</span>
          </ButtonComponent>
        </div>

        <div className="col-md-5 col-lg-4">
          <div className="w-100 w-md-auto position-relative">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                style={{ minWidth: "200px" }}
                value={studentState?.dashboard_pagination_inputs?.search_query}
                onChange={(e) => {
                  dispatch(update_dashboard_pagination_inputs({search_query:e.target.value}))
                  dispatch(handleGetLearnerBooks({page:studentState?.dashboard_pagination_inputs?.page+1, search_query:e.target.value}))
                
                }}

              />
              <CiSearch
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#6c757d",
                }}
                size={20}
              />
            </form>
          </div>
        </div>
      </Card.Header>

      <Card.Body className='p-2 student_upload_body d-flex flex-column justify-content-between'>
        <Row className="row-cols-1 row-cols-md-2">
          {studentState?.loading["learner_books"] ?
            <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '600px' }}>
              <div className="col-5 text-center">
               <Spinner />
              </div>
            </div>
            :(
              studentState?.all_learner_books?.books?.length > 0 ? (
                studentState?.all_learner_books?.books?.map((book, idx) => (
                  <Col key={idx} className="d-flex">
                    <div className="w-100 p-1">
                      <BookCard
                        className="col border"
                        data={book}
                        viewFunction={() =>  navigate(`/student_dashboard/learner_book/${book.book_id}`)}
                        generateFunction={() => console.log(`Generate ${book.book_name}`)}
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
        <Row className="">
           <footer className="d-flex justify-content-end pt-1">
                    {pageCount > 0 ? <div className=" pe-2">
                        <ReactPaginate
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination justify-content-center"}
                            pageClassName={"page-item mx-1"}
                            pageLinkClassName={"page-link rounded"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link text-dark rounded"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link text-dark rounded"}
                            activeClassName={"active pagination_btn_active"}
                            breakLabel="..."
                            breakClassName="page-item text-dark"
                            breakLinkClassName="page-link rounded text-dark"
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={1}
                            forcePage={studentState?.dashboard_pagination_inputs?.page}
                        />
                    </div> : null
                    }

                </footer>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default StudentUpload