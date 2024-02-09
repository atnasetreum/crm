import { useEffect, useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "sonner";

import { findOneClient, removeClient } from "@actions";

interface Props {
  idCurrent: number;
  handleClose: () => void;
}

export default function DialogConfirmClients({
  idCurrent,
  handleClose,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  const remove = async () => {
    setIsLoading(true);

    const resp = await removeClient(idCurrent).finally(() =>
      setIsLoading(false)
    );

    if (!resp.ok) {
      return toast.error(resp.message);
    }

    toast.success(
      `El cliente ha sido ${
        isActive ? "desactivado" : "activado"
      } correctamente`
    );

    handleClose();
  };

  const getDataClient = async () => {
    if (!idCurrent) {
      return;
    }

    const resp = await findOneClient(idCurrent);

    if (!resp.ok) {
      return toast.error(resp.message);
    }

    setIsActive(resp.client!.active);
  };

  useEffect(() => {
    getDataClient();
  }, [idCurrent]);

  return (
    <Dialog
      open={!!idCurrent}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`¿Estás seguro que deseas ${
          isActive ? "DESACTIVAR" : "ACTIVAR"
        } este cliente?`}
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
