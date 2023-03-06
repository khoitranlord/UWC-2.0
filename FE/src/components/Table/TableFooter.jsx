import React from "react";
import { Pagination } from "react-bootstrap";

const TableFooter = ({ rowsPerPage, totalRows, paginate, currentPage }) => {
  let hasPrevPage = false;
  let hasNextPage = false;

  const items = [];
  let active = currentPage;
  const pageSize = Math.ceil(totalRows / rowsPerPage);

  if (currentPage == 1) {
    hasPrevPage = true;
  }
  if (currentPage == pageSize) {
    hasNextPage = true;
  }

  for (let i = 1; i <= pageSize; ++i) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === active}
        onClick={() => paginate(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={hasPrevPage}
      />
      {items}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={hasNextPage}
      />
    </Pagination>
  );
};

export default TableFooter;
