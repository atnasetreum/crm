import Grid from "@mui/material/Grid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import ListComments from "./ListComments";

const CalendarClient = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7} lg={7}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          aspectRatio={2}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={5}>
        <ListComments />
      </Grid>
    </Grid>
  );
};

export default CalendarClient;
