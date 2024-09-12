import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import {
  Menu as MenuIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import {
  Box,
  Grid2,
  IconButton,
  Stack,
  ToggleButton,
  Typography,
} from "@mui/material";
import Logo from "../../components/Logo";
import MuiSearchField from "../../components/MuiSearchField";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const Header = ({ showMenu, setShowMenu }: any) => {
  const [screenSize, setScreenSize] = useState(window?.screen?.width);
  const navItems = [
    {
      id: 1,
      name: "About Us",
    },
    {
      id: 2,
      name: "Instructions",
    },
    {
      id: 3,
      name: "Wraps",
    },
    {
      id: 4,
      name: "Tint",
    },
    {
      id: 5,
      name: "Precut Tint",
    },
    {
      id: 6,
      name: "PPF",
    },
    {
      id: 7,
      name: "Tools",
    },
    {
      id: 8,
      name: "Accessories",
    },
    {
      id: 9,
      name: "Seals",
    },
  ];

  useEffect(() => {
    window.addEventListener("resize", handleScreenSize);
  }, []);

  const handleScreenSize = (e: any) => {
    setScreenSize(e.currentTarget.screen.availWidth);
  };

  const handleToggler = () => {
    setShowMenu(true);
  };

  return (
    <>
      <Grid2
        size={12}
        container
        sx={{
          background: `url(${
            process.env.REACT_APP_BASE_URL +
            "/assets/images/Navbar_bg.1bcc4411.png"
          })`,
          height: 130,
          position: "fixed",
          zIndex: 11,
          justifyContent: "space-between",
        }}
      >
        <Grid2 size={{ lg: 3, sm: 4, xs: 2 }}>
          <Logo
            sx={{
              width: { sm: 175, xs: 110 },
              height: 84,
              ml: { md: 10, xs: 2, sm: 5 },
              mb: -10,
              position: "absolute",
            }}
          />
        </Grid2>
        <Grid2
          container
          size={{ lg: 9, xs: 8 }}
          p={2}
          direction={"row"}
          alignItems={"center"}
        >
          <Grid2 size={{ md: 9, xs: 9, sm: 9 }}>
            <MuiSearchField
              fullWidth
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(156 163 175)",
                },
                color: "rgb(156 163 175)",
                "&:hover": {
                  borderColor: "rgb(156 163 175) !important",
                },
              }}
              placeHolder="Search here"
            />
          </Grid2>
          <Grid2
            container
            size={{ sm: 3, xs: 3 }}
            spacing={{ xs: 1, sm: 2 }}
            justifyContent={"right"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
          >
            <PermIdentityIcon
              sx={{ color: "white", fontSize: { sm: "26px", md: "32px" } }}
            />
            <ShoppingCartOutlinedIcon
              sx={{ color: "white", fontSize: { sm: "26px", md: "32px" } }}
            />
          </Grid2>
        </Grid2>
        <Grid2
          size={12}
          sx={{
            background: `url(${
              process.env.REACT_APP_BASE_URL +
              "/assets/images/Navbar.d36ce78f.svg"
            })`,
            height: 120,
            backgroundRepeat: "no-repeat",
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"right"}
            alignSelf={"flex-end"}
            p={0.75}
          >
            {screenSize > 1230
              ? navItems?.map((item: any) => (
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      color: "white",
                      fontWeight: "600",
                      fontSize: ".75rem",
                      p: 2,
                      "&:hover": {
                        bgcolor: "white",
                        color: "#20a3fc",
                      },
                      cursor: "pointer",
                    }}
                  >
                    {item?.name}
                  </Typography>
                ))
              : !showMenu && (
                  <IconButton
                    sx={{ cursor: "pointer" }}
                    onClick={handleToggler}
                  >
                    <MenuIcon
                      sx={{ bgcolor: "white", borderRadius: 2 }}
                      fontSize="large"
                    />
                  </IconButton>
                )}
          </Stack>
          {showMenu && (
            <Box
              sx={{
                background: `url(${
                  process.env.REACT_APP_BASE_URL +
                  "/assets/images/Navbar_bg.1bcc4411.png"
                })`,
                position: "absolute",
                width: "100%",
                height: "100vh",
              }}
            >
              <IconButton
                sx={{ color: "white", float: "right" }}
                onClick={() => setShowMenu(false)}
              >
                <ClearIcon />
              </IconButton>
              {navItems?.map((item: any) => (
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "white",
                    fontWeight: "600",
                    fontSize: ".75rem",
                    p: 2,
                    cursor: "pointer",
                  }}
                >
                  {item?.name}
                </Typography>
              ))}
            </Box>
          )}
        </Grid2>
      </Grid2>
    </>
  );
};

export default Header;
