import { useCommonState } from "Components/CustomHooks";
import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { update_app_data } from "Views/Common/Slices/Common_slice";

const ReactPaginateComp = ({ totalPages, onClick, filter_options }) => {
  const { commonState } = useCommonState();
  const dispatch = useDispatch();

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    if (typeof onClick === 'function') {
      dispatch(update_app_data({ type: "pagination", data: { currentPage: selectedPage } }));
      if (typeof filter_options === 'object') {
        onClick({ filter_options, page: selectedPage })
      }
    }
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      pageCount={totalPages}
      currentPage={commonState?.pagination?.currentPage - 1}
      forcePage={commonState?.pagination?.currentPage - 1}
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
