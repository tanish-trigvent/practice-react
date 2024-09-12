import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";

interface props {
  fullWidth?: any;
  sx?: any;
  label?: string;
  placeHolder?: string;
  size?: any;
}

const MuiSearchField = ({
  fullWidth,
  sx,
  label,
  placeHolder,
  size = "small",
}: props) => {
  return (
    <>
      <OutlinedInput
        startAdornment={
          <InputAdornment position="start">
            <IconSearch stroke={2} color="white" />
          </InputAdornment>
        }
        fullWidth={fullWidth}
        sx={sx}
        label={label}
        placeholder={placeHolder}
        size={size}
      />
    </>
  );
};

export default MuiSearchField;
