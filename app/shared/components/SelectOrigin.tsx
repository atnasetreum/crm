import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const options = [
  "Alianza",
  "Comentarios pauta",
  "Google",
  "Orgánico FB",
  "Orgánico IG",
  "Referidos",
  "WhatsApp",
];

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  disabled?: boolean;
}

export function SelectOrigins({ value, onChange, disabled = false }: Props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="origins-simple-select-label">Origen</InputLabel>
        <Select
          labelId="origins-simple-select-label"
          id="origins-simple-select"
          value={value}
          label="Origen"
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
