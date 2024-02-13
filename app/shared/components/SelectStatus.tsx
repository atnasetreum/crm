import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const options = [
  "Apartado",
  "Cita",
  // "Cliente descartado",
  "Contactado",
  "Descartado",
  "Interesado",
  "No contesta",
  "Nuevo",
  "Venta ganada",
  "Visita",
];

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  disabled?: boolean;
  isFilter?: boolean;
}

export function SelectStatus({
  value,
  onChange,
  disabled = false,
  isFilter = false,
}: Props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="status-simple-select-label">Estatus</InputLabel>
        <Select
          labelId="status-simple-select-label"
          id="status-simple-select"
          value={value}
          label="Estatus"
          onChange={onChange}
          disabled={disabled}
        >
          {isFilter && <MenuItem value="">Ninguno</MenuItem>}
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
