import { useEffect, useMemo, useState } from "react";

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
import Grid from "@mui/material/Grid";

import { Client } from "@interfaces";
import { ClientForm } from "./FormClients";

import "dayjs/locale/es";
import SelectSingleProject from "./SelectSingleProject";

interface Props {
  eventNew: DateClickArg | null;
  eventSelected: EventClickArg | null;
  handleClose: () => void;
  clientCurrent: Client | null;
  addEvent: (event: EventInput) => void;
  stateForm: ClientForm;
}

export default function FormCalendar({
  eventNew,
  eventSelected,
  handleClose,
  clientCurrent,
  addEvent,
  stateForm,
}: Props) {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [comment, setComment] = useState<string>("");
  const [project, setProject] = useState<string>("");

  const closeDialog = () => {
    setDate(dayjs());
    setComment("");
    handleClose();
  };

  const isDisabled = useMemo(() => {
    return eventNew && date && project;
  }, [eventNew, date, project]);

  const add = () => {
    if (eventNew && date && project) {
      addEvent({
        title: "Cita",
        start: date.toISOString(),
        comment,
        project,
      });
      closeDialog();
    }
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
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={12} lg={12}>
            <SelectSingleProject
              options={stateForm.projects}
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
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
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="contained" color="error">
          Cancelar
        </Button>
        <Button
          onClick={add}
          variant="contained"
          color="primary"
          disabled={!isDisabled}
        >
          Agrega
        </Button>
      </DialogActions>
    </Dialog>
  );
}
