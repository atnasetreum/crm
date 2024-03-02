import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import { TablePaginationActions, StyledTableRow } from "@shared/components";

interface Props {
  rows: any[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  headers: string[];
  count?: number;
}

export default function TableFooterDefault({
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  headers,
  count,
}: Props) {
  return (
    <TableFooter>
      <StyledTableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={headers.length}
          count={count ?? rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </StyledTableRow>
    </TableFooter>
  );
}
