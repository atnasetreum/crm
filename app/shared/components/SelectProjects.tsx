import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { findAllProjects } from "@actions";

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  disabled?: boolean;
}

export function SelectProjects({ value, onChange, disabled = false }: Props) {
  const [options, setOptions] = useState<string[]>([]);

  const findProjects = async () => {
    const resp = await findAllProjects();

    if (resp.ok && resp?.projects) {
      setOptions(resp.projects.map((project) => project.name));
    }
  };

  useEffect(() => {
    findProjects();
  }, []);

  return (
    <Box component={Paper} elevation={0}>
      <FormControl fullWidth>
        <InputLabel id="project-simple-types-simple-select-label">
          Proyecto
        </InputLabel>
        <Select
          labelId="project-simple-types-simple-select-label"
          id="project-simple-types-simple-select"
          value={value}
          label="Proyecto"
          onChange={onChange}
          disabled={disabled}
        >
          <MenuItem value="">Ninguno</MenuItem>
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
