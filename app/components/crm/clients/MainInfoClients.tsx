import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

import { SelectReasonsRejection } from "@app/shared/components/SelectReasonsRejection";
import { SelectMultiProjects, SelectStatus } from "@shared/components";
import AutocompleteCampaignType, {
  OptionType,
} from "@shared/components/AutocompleteCampaignType";
import { SelectOrigins } from "@shared/components/SelectOrigins";
import { ClientForm } from "./FormClients";

interface Props {
  stateForm: ClientForm;
  setStateForm: (state: ClientForm) => void;
  isConsult: boolean;
  isNewProject: boolean;
  setIsNewProject: (state: boolean) => void;
  campaignTypes: OptionType[];
}

function MainInfoClients({
  stateForm,
  setStateForm,
  isConsult,
  isNewProject,
  setIsNewProject,
  campaignTypes,
}: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          autoComplete="off"
          disabled={isConsult}
          value={stateForm.name}
          onChange={(e) =>
            setStateForm({
              ...stateForm,
              name: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          label="Telefonos"
          variant="outlined"
          fullWidth
          autoComplete="off"
          disabled={isConsult}
          value={stateForm.phone}
          onChange={(e) =>
            setStateForm({
              ...stateForm,
              phone: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          autoComplete="off"
          disabled={isConsult}
          value={stateForm.email}
          onChange={(e) =>
            setStateForm({
              ...stateForm,
              email: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <SelectStatus
          disabled={isConsult}
          value={stateForm.status}
          onChange={(e) =>
            setStateForm({
              ...stateForm,
              status: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha de nacimiento"
            disabled={isConsult}
            value={stateForm.birthdate && dayjs(stateForm.birthdate)}
            onChange={(newValue) =>
              setStateForm({ ...stateForm, birthdate: newValue })
            }
            slotProps={{
              textField: { fullWidth: true },
            }}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={!isNewProject && !isConsult ? 10 : 12}
            lg={!isNewProject && !isConsult ? 10 : 12}
          >
            <SelectMultiProjects
              disabled={isConsult}
              value={stateForm.projects}
              onChange={(newValue) =>
                setStateForm({ ...stateForm, projects: newValue })
              }
            />
          </Grid>
          {!isNewProject && !isConsult && (
            <Grid item xs={12} md={2} lg={2} sx={{ mt: 1 }}>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={() => setIsNewProject(true)}
              >
                Nuevo
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      {isNewProject && (
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Nuevo proyecto"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={stateForm.newProject}
            onChange={(e) =>
              setStateForm({
                ...stateForm,
                newProject: e.target.value,
              })
            }
          />
        </Grid>
      )}
      {stateForm.status === "Descartado" && (
        <Grid item xs={12} md={6} lg={6}>
          <SelectReasonsRejection
            disabled={isConsult}
            value={stateForm.reasonRejection}
            onChange={(e) =>
              setStateForm({
                ...stateForm,
                reasonRejection: e.target.value,
              })
            }
          />
        </Grid>
      )}
      <Grid item xs={12} md={6} lg={6}>
        <SelectOrigins
          disabled={isConsult}
          value={stateForm.origin}
          onChange={(e) =>
            setStateForm({
              ...stateForm,
              origin: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <AutocompleteCampaignType
          disabled={isConsult}
          options={campaignTypes}
          value={stateForm.campaignType}
          onChange={(e) =>
            setStateForm({
              ...stateForm,
              campaignType: e ? e.title : "",
            })
          }
        />
      </Grid>
    </Grid>
  );
}

export default MainInfoClients;
