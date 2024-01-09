import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { SelectMultiProjects, SelectStatus } from "@shared/components";
import { ClientForm } from "./FormClients";

interface Props {
  stateForm: ClientForm;
  setStateForm: (state: ClientForm) => void;
}

function MainInfoClients({ stateForm, setStateForm }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          autoComplete="off"
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
            value={stateForm.birthdate}
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
        <SelectMultiProjects
          value={stateForm.projects}
          onChange={(newValue) =>
            setStateForm({ ...stateForm, projects: newValue })
          }
        />
      </Grid>
    </Grid>
  );
}

export default MainInfoClients;
