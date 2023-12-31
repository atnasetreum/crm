import { useState } from "react";

import { toast } from "sonner";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import { Transition } from "@shared/components";
import { Client } from "@interfaces";
import { saveClient } from "@actions";
import TabsClients from "./TabsClients";

export interface ClientForm {
  name: string;
  phone: string;
  email: string;
  status: string;
  birthdate: Date | null;
  projects: string[];
}

interface Props {
  handleClose: () => void;
  clientCurrent: Client | null;
}

const formInitialClient: ClientForm = {
  name: "",
  phone: "",
  email: "",
  status: "Nuevo",
  birthdate: null,
  projects: [],
};

export default function FormClients({ clientCurrent, handleClose }: Props) {
  const [stateForm, setStateForm] = useState<ClientForm>(formInitialClient);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<string[]>([]);

  const closeDialog = () => {
    handleClose();
    setStateForm(formInitialClient);
    setComments([]);
  };

  const save = async () => {
    setIsLoading(true);
    closeDialog();

    if (clientCurrent) {
      setIsLoading(true);
      const resp = await saveClient({
        id: clientCurrent.id,
        ...stateForm,
        comments,
      }).finally(() => setIsLoading(false));

      if (!resp.ok) {
        return toast.error(resp.message);
      }

      toast.success(
        clientCurrent.id ? "Cliente actualizado" : "Cliente creado"
      );

      closeDialog();
    }
  };

  return (
    <Dialog
      fullScreen
      open={!!clientCurrent}
      onClose={closeDialog}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {clientCurrent?.id
              ? `Editar cliente ${clientCurrent?.id}`
              : "Nuevo cliente"}
          </Typography>
          <LoadingButton
            loading={isLoading}
            autoFocus
            color="inherit"
            onClick={save}
            startIcon={<SaveIcon />}
          >
            Guardar
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <TabsClients
        stateForm={stateForm}
        setStateForm={setStateForm}
        comments={comments}
        setComments={setComments}
        clientCurrent={clientCurrent}
      />
    </Dialog>
  );
}
