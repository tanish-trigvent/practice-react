import { Box, Divider, Grid2, Stack, Typography } from "@mui/material";
import Logo from "../../components/Logo";
import {
  LocationOn as LocationOnIcon,
  Mail as MailIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Pinterest as PinterestIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <>
      <Grid2 sx={{ bgcolor: "black" }} p={2}>
        <Grid2 container justifyContent={"space-around"} p={4} gap={4}>
          <Grid2 size={4}>
            <Stack gap={2}>
              <Box>
                <Logo sx={{ width: 300, height: 150 }} />
              </Box>
              <Stack
                sx={{ bgcolor: "rgb(16 19 27)", p: 2, borderRadius: 2 }}
                spacing={1}
                width={250}
              >
                <Stack
                  color={"white"}
                  width={250}
                  direction={"row"}
                  spacing={1}
                >
                  <LocationOnIcon />
                  <Typography sx={{ fontSize: "14px" }}>
                    37297 S Groesbeck Hwy Clinton Township, MI 48036
                  </Typography>
                </Stack>
                <Stack
                  color={"white"}
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}
                >
                  <MailIcon />
                  <Typography sx={{ fontSize: ".875rem" }}>
                    sales@truelineautomotive.com
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={2.5} alignItems={"center"}>
                <Box>
                  <YouTubeIcon
                    sx={{
                      color: "white",
                      borderRadius: 10,
                      border: "1px solid white",
                      p: 1,
                      "&:hover": {
                        color: "black",
                        bgcolor: "white",
                        transition: "0.3s",
                      },
                      cursor: "pointer",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Box>
                  <LinkedInIcon
                    sx={{
                      color: "white",
                      borderRadius: 10,
                      border: "1px solid white",
                      p: 1,
                      "&:hover": {
                        color: "black",
                        bgcolor: "white",
                        transition: "0.3s",
                      },
                      cursor: "pointer",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Box>
                  <PinterestIcon
                    sx={{
                      color: "white",
                      borderRadius: 10,
                      border: "1px solid white",
                      p: 1,
                      "&:hover": {
                        color: "black",
                        bgcolor: "white",
                        transition: "0.3s",
                      },
                      cursor: "pointer",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Box>
                  <InstagramIcon
                    sx={{
                      color: "white",
                      borderRadius: 10,
                      border: "1px solid white",
                      p: 1,
                      "&:hover": {
                        color: "black",
                        bgcolor: "white",
                        transition: "0.3s",
                      },
                      cursor: "pointer",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Box>
                  <FacebookIcon
                    sx={{
                      color: "white",
                      borderRadius: 10,
                      border: "1px solid white",
                      p: 1,
                      "&:hover": {
                        color: "black",
                        bgcolor: "white",
                        transition: "0.3s",
                      },
                      cursor: "pointer",
                    }}
                    fontSize="large"
                  />
                </Box>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={4} p={3} color={"white"}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              fontFamily={"Racing Sans One,sans-serif"}
              mb={3}
            >
              CATEGORIES
            </Typography>
            <Stack gap={2}>
              <Typography fontSize={"0.875rem"}>Auto</Typography>
              <Typography fontSize={"0.875rem"}>Home</Typography>
              <Typography fontSize={"0.875rem"}>Craft</Typography>
              <Typography fontSize={"0.875rem"}>Sign</Typography>
              <Typography fontSize={"0.875rem"}>Tint & Protection</Typography>
              <Typography fontSize={"0.875rem"}>Wraps</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={4} p={3} color={"white"}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              fontFamily={"Racing Sans One,sans-serif"}
              mb={3}
            >
              INSTALLATION
            </Typography>
            <Stack gap={2}>
              <Typography fontSize={"0.875rem"}>Instructions</Typography>
              <Typography fontSize={"0.875rem"}>Rebates</Typography>
              <Typography fontSize={"0.875rem"}>Guides & Articles</Typography>
              <Typography fontSize={"0.875rem"}>Installer Directory</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={4} p={3} color={"white"}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              fontFamily={"Racing Sans One,sans-serif"}
              mb={3}
            >
              PRODUCTS
            </Typography>
            <Stack gap={2}>
              <Typography fontSize={"0.875rem"}>Dash Kits</Typography>
              <Typography fontSize={"0.875rem"}>Window Tint</Typography>
              <Typography fontSize={"0.875rem"}>Vinyl Wraps</Typography>
              <Typography fontSize={"0.875rem"}>Paint Protection</Typography>
              <Typography fontSize={"0.875rem"}>Caliper Wraps </Typography>
              <Typography fontSize={"0.875rem"}>
                Headlight Tint Covers
              </Typography>
              <Typography fontSize={"0.875rem"}>
                Tail Light Tint Covers
              </Typography>
              <Typography fontSize={"0.875rem"}>Pillar Post Trim</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={4} p={3} color={"white"}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              fontFamily={"Racing Sans One,sans-serif"}
              mb={3}
            >
              Support
            </Typography>
            <Stack gap={2}>
              <Typography fontSize={"0.875rem"}>My Account</Typography>
              <Typography fontSize={"0.875rem"}>Contact Us</Typography>
              <Typography fontSize={"0.875rem"}>Returns </Typography>
              <Typography fontSize={"0.875rem"}>Shipping</Typography>
            </Stack>
          </Grid2>
        </Grid2>
        <Divider sx={{ color: "white", border: "1px solid #ffffff14" }} />
        <Grid2
          container
          size={12}
          justifyContent={"center"}
          spacing={2}
          alignItems={"center"}
          height={100}
        >
          <Grid2 color="white">
            © Trueline Automotive. All Rights Reserved
          </Grid2>
          <Typography sx={{ color: "white" }}>|</Typography>
          <Grid2
            color="white"
            sx={{ "&:hover": { color: "rgb(75 86 99)", cursor: "pointer" } }}
          >
            Privacy Policy
          </Grid2>
          <Typography sx={{ color: "white" }}>|</Typography>
          <Grid2
            color="white"
            sx={{ "&:hover": { color: "rgb(75 86 99)", cursor: "pointer" } }}
          >
            Terms of Services
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Footer;
