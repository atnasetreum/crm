import { useEffect, useState } from "react";

import { toast } from "sonner";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { BootstrapDialog } from "@shared/components";
import { saveProject } from "@actions";
import { Project } from "@interfaces";

interface Props {
  handleClose: () => void;
  projectCurrent: Project | null;
}

export default function FormProjects({ projectCurrent, handleClose }: Props) {
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const save = async () => {
    if (projectCurrent) {
      setIsLoading(true);
      const resp = await saveProject({
        id: projectCurrent.id,
        name: name.trim(),
      }).finally(() => setIsLoading(false));

      if (!resp.ok) {
        return toast.error(resp.message);
      }

      toast.success(
        projectCurrent.id ? "Proyecto actualizado" : "Proyecto creado"
      );

      setName("");
      handleClose();
    }
  };

  useEffect(() => {
    if (projectCurrent?.name) {
      setName(projectCurrent.name);
    }
  }, [projectCurrent]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={!!projectCurrent}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {projectCurrent?.id
          ? `Editar proyecto ${projectCurrent?.id}`
          : "Nuevo proyecto"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          color="error"
          variant="contained"
        >
          Cancelar
        </Button>
        <LoadingButton
          loading={isLoading}
          autoFocus
          onClick={() => save()}
          color="primary"
          variant="contained"
        >
          Guardar
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  );
}
