import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

export interface OptionType {
  inputValue?: string;
  title: string;
}

const filter = createFilterOptions<OptionType>();

interface Props {
  value: string;
  onChange: (event: OptionType | null) => void;
  disabled?: boolean;
  options: OptionType[];
}

export default function SelectCampaignType({
  value,
  onChange,
  disabled = false,
  options,
}: Props) {
  return (
    <Autocomplete
      disabled={disabled}
      value={value}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          onChange({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          onChange({
            title: newValue.inputValue,
          });
        } else {
          onChange(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;

        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="campaign-type-free-solo-with-text-demo"
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }

        if (option.inputValue) {
          return option.inputValue;
        }

        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      fullWidth
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Tipo de campaña" />
      )}
    />
  );
}
