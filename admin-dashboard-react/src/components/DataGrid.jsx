import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataGridTable = ({
  rows = [],
  columns = [],
  pageSize,
  setPageSize,
  page = 1,
  setPage,
  sortModel,
  setSortModel,
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      page={page}
      // onPageChange={(newPage) => setPage(newPage)}
      // rowCount={rows?.length}
      // sortModel={sortModel}
      // onSortModelChange={(model) => setSortModel(model)}
      // pagination
      // paginationMode="client"
      rowSelection={false}
      getRowId={(row) => row._id || row.id}
      disableColumnSorting
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableColumnResize
    />
  );
};

export default DataGridTable;
