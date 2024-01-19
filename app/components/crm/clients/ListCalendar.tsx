import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { EventInput } from "@fullcalendar/core/index.js";
import IconButton from "@mui/material/IconButton";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventBusyIcon from "@mui/icons-material/EventBusy";

import { stringToDateWithTime } from "@shared/utils";

interface Props {
  events: EventInput[];
  setEvents: (state: EventInput[]) => void;
  isConsult: boolean;
}

export default function ListCalendar({ events, setEvents, isConsult }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {events
            .sort(
              (a, b) =>
                new Date(a.start as string).getTime() -
                new Date(b.start as string).getTime()
            )
            .map((event) => (
              <>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    !isConsult && (
                      <>
                        <IconButton edge="end" aria-label="comments">
                          <EditCalendarIcon fontSize="large" color="warning" />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() =>
                            setEvents(
                              events.filter((e) => e.start !== event.start)
                            )
                          }
                        >
                          <EventBusyIcon fontSize="large" color="error" />
                        </IconButton>
                      </>
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.vecteezy.com/system/resources/thumbnails/017/060/777/small/3d-calendar-with-clock-checkmark-icons-marked-date-notification-bell-isolated-schedule-appointment-concept-3d-render-illustration-png.png"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {event.comment}
                        </Typography>
                        {` ${event.comment ? "—" : ""} ${stringToDateWithTime(
                          event.start as string
                        )}`}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
        </List>
      </Grid>
    </Grid>
  );
}
