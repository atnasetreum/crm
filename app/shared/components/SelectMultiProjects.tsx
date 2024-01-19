import { useEffect, useState } from "react";

import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { findAllProjects } from "@actions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function SelectMultiProjects({
  value: valueCurrent,
  onChange,
  disabled = false,
}: Props) {
  const [options, setOptions] = useState<string[]>([]);

  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof valueCurrent>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

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
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="project-multiple-name-label">Proyectos</InputLabel>
        <Select
          labelId="project-multiple-name-label"
          id="project-multiple-name"
          multiple
          value={valueCurrent}
          onChange={handleChange}
          input={<OutlinedInput label="Proyectos" />}
          MenuProps={MenuProps}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, valueCurrent, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
