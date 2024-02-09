import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const options = [
  "Asesor externo",
  "Dejó de contestar",
  "Fake",
  "Nunca contestó",
  "Presupuesto",
  "Proveedor",
  "Tiempo de compra",
  "Tiempo de entrega",
  "Tipo de crédito",
  "Ubicación en Querétaro",
  "Ubicación estado",
  "Ya compró",
];

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  disabled?: boolean;
}

export function SelectReasonsRejection({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="reason-simple-select-label">
          Razon de rechazo
        </InputLabel>
        <Select
          labelId="reason-simple-select-label"
          id="reason-simple-select"
          value={value}
          label="Razon de rechazo"
          onChange={onChange}
          disabled={disabled}
        >
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
