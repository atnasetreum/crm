import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: string[];
}

export default function SelectSingleProject({
  value,
  onChange,
  options,
}: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel id="project-sim-simple-select-label">Proyecto</InputLabel>
      <Select
        labelId="project-sim-simple-select-label"
        id="project-sim-simple-select"
        value={value}
        label="Proyecto"
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {!options.length && (
        <FormHelperText>
          Agregar primero los proyectos del usuario
        </FormHelperText>
      )}
    </FormControl>
  );
}
