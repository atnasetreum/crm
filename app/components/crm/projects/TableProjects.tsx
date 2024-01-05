"use client";

import { ChangeEvent, MouseEvent, useState } from "react";

import {
  StyledTableCell,
  StyledTableRow,
  TableDefault,
} from "@shared/components";
import { stringToDateWithTime } from "@shared/utils";
import { Projects } from "@interfaces";

interface Props {
  rows: Projects[];
}

export default function TableProjects({ rows }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableDefault
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      headers={["ID", "Nombre", "Fecha de creación", "Fecha de actualización"]}
      rowsRender={(row: Projects) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {row.id}
          </StyledTableCell>
          <StyledTableCell>{row.name}</StyledTableCell>
          <StyledTableCell>
            {stringToDateWithTime(row.createdAt)}
          </StyledTableCell>
          <StyledTableCell>
            {stringToDateWithTime(row.updatedAt)}
          </StyledTableCell>
        </StyledTableRow>
      )}
    />
  );
}
