import { useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  EventClickArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core/index.js";

import { Client } from "@interfaces";
import FormCalendar from "./FormCalendar";
import ListCalendar from "./ListCalendar";
import { ClientForm } from "./FormClients";

//import ListCalendar from "./ListCalendar";

function renderEventContent(event: EventContentArg) {
  return (
    <>
      <b>{event.timeText}</b>
      <i>{event.event.title}</i>
    </>
  );
}

interface Props {
  clientCurrent: Client | null;
  events: EventInput[];
  setEvents: (state: EventInput[]) => void;
  isConsult: boolean;
  stateForm: ClientForm;
}

const CalendarClient = ({
  clientCurrent,
  events,
  setEvents,
  isConsult,
  stateForm,
}: Props) => {
  const calendarRef = useRef<FullCalendar>(null!);
  const [eventNew, setEventNew] = useState<DateClickArg | null>(null);
  const [eventSelected, setEventSelected] = useState<EventClickArg | null>(
    null
  );

  const addEvent = (event: EventInput) => setEvents([...events, event]);

  return (
    <>
      <FormCalendar
        eventNew={eventNew}
        eventSelected={eventSelected}
        handleClose={() => {
          setEventNew(null);
          setEventSelected(null);
        }}
        clientCurrent={clientCurrent}
        addEvent={addEvent}
        stateForm={stateForm}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} lg={7}>
          <FullCalendar
            ref={calendarRef}
            locale={esLocale}
            plugins={[
              dayGridPlugin,
              listPlugin,
              timeGridPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridYear,dayGridMonth,dayGridWeek,dayGridDay,listDay",
            }}
            aspectRatio={2}
            /*initialEvents={[
              { title: "nice event", start: new Date(), resourceId: "a" },
            ]}*/
            events={events}
            eventAdd={(e) => {
              console.log(e);
            }}
            dateClick={(event) => !isConsult && setEventNew(event)}
            eventClick={(event) => !isConsult && setEventSelected(event)}
            eventContent={renderEventContent}
          />
        </Grid>
        <Grid item xs={12} md={5} lg={5}>
          <ListCalendar
            events={events}
            setEvents={setEvents}
            isConsult={isConsult}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CalendarClient;
