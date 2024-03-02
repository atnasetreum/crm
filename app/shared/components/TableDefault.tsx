import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import { StyledTableRow, StyledTableCell } from "@shared/components";
import TableFooterDefault from "./TableFooterDefault";

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
  rowsRender: (value: any, index: number, array: any[]) => React.ReactNode;
  count?: number;
}

export function TableDefault({
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  headers,
  rowsRender,
  count,
}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            {headers.map((header) => (
              <StyledTableCell key={header} align="center">
                {header}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>{rows.map(rowsRender)}</TableBody>
        <TableFooterDefault
          count={count}
          headers={headers}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
