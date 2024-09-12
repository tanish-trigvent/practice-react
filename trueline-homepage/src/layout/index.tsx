import { Box, Stack } from "@mui/material";
import Footer from "./footer";
import Header from "./header";
import HomePage from "../pages/HomePage";
import { useState } from "react";

const MainLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Stack>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      <Box mt={10}>
        <HomePage showMenu={showMenu} setShowMenu={setShowMenu} />
      </Box>
      <Footer />
    </Stack>
  );
};

export default MainLayout;
