import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const options = [
  "Nuevo",
  "Contactado",
  "Perdido",
  "Contactar en un futuro",
  "Venta",
  "Renta",
];

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export function SelectStatus({ value, onChange }: Props) {
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
