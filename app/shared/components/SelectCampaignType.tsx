import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  disabled?: boolean;
  options: string[];
}

export function SelectCampaignType({
  value,
  onChange,
  disabled = false,
  options,
}: Props) {
  return (
    <Box sx={{ minWidth: 250 }} component={Paper} elevation={0}>
      <FormControl fullWidth>
        <InputLabel id="campaign-types-simple-select-label">
          Tipo de campaña
        </InputLabel>
        <Select
          labelId="campaign-types-simple-select-label"
          id="campaign-types-simple-select"
          value={value}
          label="Tipo de campaña"
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
