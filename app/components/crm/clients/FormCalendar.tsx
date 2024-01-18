import { useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { EventClickArg, EventInput } from "@fullcalendar/core/index.js";

import { Client } from "@interfaces";

interface Props {
  eventNew: DateClickArg | null;
  eventSelected: EventClickArg | null;
  handleClose: () => void;
  clientCurrent: Client | null;
  addEvent: (event: EventInput) => void;
}

export default function FormCalendar({
  eventNew,
  eventSelected,
  handleClose,
  clientCurrent,
  addEvent,
}: Props) {
  const add = () => {
    if (eventNew) {
      addEvent({ title: "event 3", start: "2024-01-03T12:20:00" });
    }

    handleClose();
  };

  useEffect(() => {
    console.log({ clientCurrent });
  }, [clientCurrent]);

  useEffect(() => {
    console.log({ eventNew });
  }, [eventNew]);

  useEffect(() => {
    console.log({ eventSelected });
  }, [eventSelected]);

  return (
    <Dialog open={!!eventNew || !!eventSelected} onClose={handleClose}>
      <DialogTitle>{eventNew ? "Agregar cita" : "Editar cita"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          autoComplete="off"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Cancelar
        </Button>
        <Button onClick={add} variant="contained" color="primary">
          Agrega
        </Button>
      </DialogActions>
    </Dialog>
  );
}
