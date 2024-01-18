import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

import { Client } from "@interfaces";

import "dayjs/locale/es";

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
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [comment, setComment] = useState<string>("");

  const closeDialog = () => {
    setDate(dayjs());
    setComment("");
    handleClose();
  };

  const add = () => {
    if (eventNew && date) {
      addEvent({
        title: "Cita",
        start: date.toISOString(),
        comment,
      });
    }
    closeDialog();
  };

  useEffect(() => {
    console.log({ clientCurrent });
  }, [clientCurrent]);

  useEffect(() => {
    console.log({ eventNew });
    if (eventNew) {
      setDate(dayjs(eventNew.date));
    }
  }, [eventNew]);

  useEffect(() => {
    console.log({ eventSelected });
  }, [eventSelected]);

  return (
    <Dialog open={!!eventNew || !!eventSelected} onClose={closeDialog}>
      <DialogTitle>{eventNew ? "Agregar cita" : "Editar cita"}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <MobileDateTimePicker
            defaultValue={dayjs("2022-04-17T15:30")}
            slotProps={{
              textField: { fullWidth: true },
            }}
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Comentarios"
          type="text"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="contained" color="error">
          Cancelar
        </Button>
        <Button onClick={add} variant="contained" color="primary">
          Agrega
        </Button>
      </DialogActions>
    </Dialog>
  );
}
