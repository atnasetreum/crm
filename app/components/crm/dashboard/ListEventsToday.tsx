import { useRouter } from "next/navigation";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";

import { stringToDateWithTime } from "@shared/utils";
import { Event } from "@interfaces";

interface Props {
  events: Event[];
}

export function ListEventsToday({ events }: Props) {
  const { replace } = useRouter();

  return (
    <Paper style={{ maxHeight: 300, overflow: "auto" }}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {events
          .sort(
            (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
          )
          .map((event) => {
            return (
              <ListItemButton
                key={event.id}
                onClick={() =>
                  replace(`/crm/clients?id=${event.client.id}&edit=1`)
                }
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.vecteezy.com/system/resources/thumbnails/017/060/777/small/3d-calendar-with-clock-checkmark-icons-marked-date-notification-bell-isolated-schedule-appointment-concept-3d-render-illustration-png.png"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${event.client.name} - ${event.project.name}`}
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
                          event.date
                        )}`}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </ListItemButton>
            );
          })}
      </List>
    </Paper>
  );
}
