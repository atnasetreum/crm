import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { stringToDate } from "@shared/utils";
import { Event } from "@interfaces";

interface Props {
  events: Event[];
}

export default function ListEventsToday({ events }: Props) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {events
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((event) => {
          return (
            <div key={event.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://static.vecteezy.com/system/resources/thumbnails/017/060/777/small/3d-calendar-with-clock-checkmark-icons-marked-date-notification-bell-isolated-schedule-appointment-concept-3d-render-illustration-png.png"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${event.client.name} ${
                    event.comment ? `— ${event.comment}` : ""
                  } `}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {event.project.name}
                      </Typography>
                      {` — ${stringToDate(event.date)}`}
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          );
        })}
    </List>
  );
}
