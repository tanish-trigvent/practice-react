import { Box } from "@mui/material";

interface props {
  sx?: any;
}

const Logo = ({ sx }: props) => {
  return (
    <Box
      component={"img"}
      src={process.env.REACT_APP_BASE_URL + "/assets/images/logo.svg"}
      sx={sx}
    />
  );
};

export default Logo;
