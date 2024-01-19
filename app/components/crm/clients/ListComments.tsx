import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";

import { stringToDateWithTime } from "@shared/utils";
import { Client } from "@interfaces";

interface Props {
  comments: string[];
  setComments: (state: string[]) => void;
  clientCurrent: Client | null;
  isConsult: boolean;
}

export default function ListComments({
  comments,
  setComments,
  clientCurrent,
  isConsult,
}: Props) {
  const [comment, setComment] = useState<string>("");

  const { data: session } = useSession();

  const saveComment = async () => {
    const newComment = comment.trim();
    if (newComment) {
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  useEffect(() => {
    console.log({ session });
  }, [session]);

  if (isConsult && !clientCurrent?.comments.length) {
    return (
      <Grid container spacing={2} textAlign="center">
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h6" component="div" gutterBottom>
            No hay comentarios
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      {!isConsult && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={10} lg={10}>
            <TextField
              label="Comentario"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <Button
              autoFocus
              onClick={() => saveComment()}
              color="primary"
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
              startIcon={<AddIcon />}
            >
              Agregar
            </Button>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {comments.map((item) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Comment_alt_font_awesome.svg/1200px-Comment_alt_font_awesome.svg.png"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {session?.user.name || ""}
                          </Typography>
                          {` — ${stringToDateWithTime(new Date())}`}
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
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {clientCurrent?.comments?.map((item) => (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Comment_alt_font_awesome.svg/1200px-Comment_alt_font_awesome.svg.png"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.comment}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.createdBy.name || ""}
                        </Typography>
                        {` — ${stringToDateWithTime(item.createdAt)}`}
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
    </>
  );
}
