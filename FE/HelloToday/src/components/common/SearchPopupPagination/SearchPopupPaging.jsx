import Pagination from "react-js-pagination";

function Paging({
  totalCount,
  postPerPage,
  pageRangeDisplayed,
  handlePageChange,
  page,
  setPage,
}) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postPerPage}
      totalItemsCount={totalCount ?? 0}
      pageRangeDisplayed={pageRangeDisplayed}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={(newPage) => setPage(newPage)}
    />
  );
}

export default Paging;
