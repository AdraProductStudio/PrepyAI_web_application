import React from "react"
import ReactPaginate from 'react-paginate'

const ReactPaginateComp = () => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      // onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      pageCount={150}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="pagination justify-content-end"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
    />
  )
}

export default ReactPaginateComp