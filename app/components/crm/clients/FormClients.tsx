import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { toast } from "sonner";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { EventInput } from "@fullcalendar/core/index.js";
import dayjs, { Dayjs } from "dayjs";

import { OptionType } from "@shared/components/SelectCampaignType";
import { Transition } from "@shared/components";
import TabsClients from "./TabsClients";
import { saveClient } from "@actions";
import { Client } from "@interfaces";

export interface ClientForm {
  name: string;
  phone: string;
  email: string;
  status: string;
  birthdate: Dayjs | null;
  projects: string[];
  newProject: string;
  reasonRejection: string;
  origin: string;
  campaignType: string;
}

interface Props {
  handleClose: () => void;
  clientCurrent: Client | null;
  campaignTypes: OptionType[];
}

const formInitialClient: ClientForm = {
  name: "",
  phone: "",
  email: "",
  status: "Nuevo",
  birthdate: null,
  projects: [],
  newProject: "",
  reasonRejection: "",
  origin: "",
  campaignType: "",
};

export default function FormClients({
  clientCurrent,
  handleClose,
  campaignTypes,
}: Props) {
  const [stateForm, setStateForm] = useState<ClientForm>(formInitialClient);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<string[]>([]);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isConsult, setIsConsult] = useState<boolean>(false);
  const [isNewProject, setIsNewProject] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const edit = Number(params.get("edit") || 0);
    setIsEdit(!!clientCurrent?.id && edit === 1);
  }, [clientCurrent, searchParams]);

  useEffect(() => {
    setIsConsult(!!clientCurrent?.id && !isEdit);
  }, [clientCurrent, isEdit]);

  useEffect(() => {
    if (clientCurrent?.id) {
      setStateForm({
        ...stateForm,
        name: clientCurrent.name,
        phone: clientCurrent.phone,
        email: clientCurrent.email,
        status: clientCurrent.status,
        birthdate: clientCurrent.birthdate
          ? dayjs(clientCurrent.birthdate)
          : null,
        reasonRejection: clientCurrent.reasonRejection || "",
        origin: clientCurrent.origin || "",
        projects: clientCurrent.projects.map((p) => p.name),
        campaignType: clientCurrent?.campaignType || "",
      });

      setEvents(
        clientCurrent.events.map((event) => ({
          id: `${event.id}`,
          title: "Cita",
          start: event.date,
          comment: event.comment,
          project: event.project.name,
        }))
      );
    }
  }, [clientCurrent]);

  const closeDialog = () => {
    handleClose();
    setStateForm(formInitialClient);
    setComments([]);
    setEvents([]);
    setIsEdit(false);
    setIsConsult(false);
    setIsNewProject(false);
  };

  const save = async () => {
    setIsLoading(true);

    if (clientCurrent) {
      setIsLoading(true);
      const resp = await saveClient({
        id: clientCurrent.id,
        ...stateForm,
        comments,
        events,
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
            {isEdit
              ? `Editar cliente ${clientCurrent?.id}`
              : isConsult
              ? `Cliente ${clientCurrent?.id}`
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
        events={events}
        setEvents={setEvents}
        isConsult={isConsult}
        isNewProject={isNewProject}
        setIsNewProject={setIsNewProject}
        campaignTypes={campaignTypes}
      />
    </Dialog>
  );
}
