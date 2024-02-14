"use client";

import { ChangeEvent, MouseEvent, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";

import {
  StyledTableCell,
  StyledTableRow,
  TableDefault,
} from "@shared/components";
import { infoCreate, infoUpdate, stringToDateWithTime } from "@shared/utils";
import DialogConfirmClients from "./DialogConfirmClients";
import { Client } from "@interfaces";
import PopoverComments from "./PopoverComments";

interface Props {
  rows: Client[];
}

export default function TableClients({ rows }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idCurrent, setIdCurrent] = useState<number>(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: session } = useSession();

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
      <DialogConfirmClients
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
          "Telefonos",
          "Correos electrónicos",
          "Estatus",
          "Proyectos",
          "Origen",
          "Campaña",
          "Fecha de creación",
          "Fecha de actualización",
          "Acciones",
        ]}
        rowsRender={(row: Client) => (
          <StyledTableRow
            key={row.id}
            style={{ backgroundColor: row.active ? "" : "#ffcdd2" }}
          >
            <StyledTableCell component="th" scope="row">
              {row.id}
            </StyledTableCell>
            <StyledTableCell>{row.name}</StyledTableCell>
            <StyledTableCell>{row.phone}</StyledTableCell>
            <StyledTableCell>{row.email}</StyledTableCell>
            <StyledTableCell>
              {row.status}{" "}
              {row.status === "Descartado" ? `(${row.reasonRejection})` : ""}
            </StyledTableCell>
            <StyledTableCell>
              {row.projects.map((project) => project.name).join(", ")}
            </StyledTableCell>
            <StyledTableCell>{row.origin}</StyledTableCell>
            <StyledTableCell>{row.campaignType}</StyledTableCell>
            <StyledTableCell style={{ width: 250 }}>
              {infoCreate(row.createdAt, row.createdBy.name)}
            </StyledTableCell>
            <StyledTableCell style={{ width: 250 }}>
              {infoUpdate(row.createdAt, row.updatedAt, row.updatedBy?.name)}
            </StyledTableCell>
            <StyledTableCell style={{ width: 250 }}>
              <ButtonGroup
                variant="text"
                aria-label="outlined primary button group"
              >
                {!!row.comments.length && (
                  <PopoverComments clientCurrent={row} />
                )}
                <Tooltip title="Detalles">
                  <Button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("id", row.id.toString());
                      params.set("edit", "0");
                      replace(`${pathname}?${params.toString()}`);
                    }}
                  >
                    <InfoIcon color="primary" />
                  </Button>
                </Tooltip>
                <Tooltip title="Editar">
                  <Button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("id", row.id.toString());
                      params.set("edit", "1");
                      replace(`${pathname}?${params.toString()}`);
                    }}
                  >
                    <EditIcon color="warning" />
                  </Button>
                </Tooltip>
                {row.active ? (
                  <Tooltip title="Eliminar">
                    <Button onClick={() => setIdCurrent(row.id)}>
                      <DeleteIcon color="error" />
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Activar">
                    <Button onClick={() => setIdCurrent(row.id)}>
                      <BeenhereIcon color="success" />
                    </Button>
                  </Tooltip>
                )}
                {session?.user.email === "eduardo-266@hotmail.com" &&
                  row.events.length && (
                    <Tooltip title="Notificar">
                      <Button
                        onClick={() => {
                          fetch("/api/push", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              ...row,
                              date: stringToDateWithTime(row.events[0].date),
                              eventClient: row.events[0],
                            }),
                          });
                        }}
                      >
                        <SendToMobileIcon sx={{ cursor: "pointer" }} />
                      </Button>
                    </Tooltip>
                  )}
              </ButtonGroup>
            </StyledTableCell>
          </StyledTableRow>
        )}
      />
    </>
  );
}
