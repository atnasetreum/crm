import { useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "sonner";

import { removeProject } from "@actions";

interface Props {
  idCurrent: number;
  handleClose: () => void;
}

export default function DialogConfirmProjects({
  idCurrent,
  handleClose,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const remove = async () => {
    setIsLoading(true);

    const resp = await removeProject(idCurrent).finally(() =>
      setIsLoading(false)
    );

    if (!resp.ok) {
      return toast.error(resp.message);
    }

    toast.success("Proyecto eliminado");

    handleClose();
  };

  return (
    <Dialog
      open={!!idCurrent}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"¿Confirma la eliminación del registro?"}
      </DialogTitle>
      <DialogActions>
        <LoadingButton
          loading={isLoading}
          onClick={handleClose}
          variant="contained"
          color="error"
          fullWidth
        >
          Cancelar
        </LoadingButton>
        <LoadingButton
          loading={isLoading}
          onClick={remove}
          autoFocus
          variant="contained"
          color="primary"
          fullWidth
        >
          Confirmar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
