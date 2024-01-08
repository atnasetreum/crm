"use client";

import { ChangeEvent, MouseEvent, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  StyledTableCell,
  StyledTableRow,
  TableDefault,
} from "@shared/components";
import { stringToDateWithTime } from "@shared/utils";
import { Project } from "@interfaces";
import DialogConfirmProjects from "./DialogConfirmProjects";

interface Props {
  rows: Project[];
}

export default function TableProjects({ rows }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idCurrent, setIdCurrent] = useState<number>(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
    <>
      <DialogConfirmProjects
        idCurrent={idCurrent}
        handleClose={() => setIdCurrent(0)}
      />
      <TableDefault
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        headers={[
          "ID",
          "Nombre",
          "Fecha de creación",
          "Fecha de actualización",
          "Acciones",
        ]}
        rowsRender={(row: Project) => (
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
            <StyledTableCell>
              <ButtonGroup
                variant="text"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);

                    params.set("id", row.id.toString());

                    replace(`${pathname}?${params.toString()}`);
                  }}
                >
                  <EditIcon color="warning" />
                </Button>
                <Button onClick={() => setIdCurrent(row.id)}>
                  <DeleteIcon color="error" />
                </Button>
              </ButtonGroup>
            </StyledTableCell>
          </StyledTableRow>
        )}
      />
    </>
  );
}
