import { useCommonState } from "Components/CustomHooks";
import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { update_app_data } from "Views/Common/Slices/Common_slice";

const ReactPaginateComp = ({totalPages}) => {
  const { commonState } = useCommonState();
  const { totalCount, currentPage, siblingCount } = commonState?.pagination;
  const dispatch = useDispatch();

  const handlePageClick = (e)=>{
          const selectedPage = e.selected + 1;
          const data = {
                currentPage: selectedPage,
                totalCount: 10,
                siblingCount: 5,
            }
            dispatch(update_app_data({type:"pagination" ,data}))
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      pageCount={totalPages}
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
  );
};

export default ReactPaginateComp;
