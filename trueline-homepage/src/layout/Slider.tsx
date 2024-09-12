import { Box, Button, Stack, Typography } from "@mui/material";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slider = ({ showMenu, setShowMenu }: any) => {
  let baseUrl = process.env.REACT_APP_BASE_URL;

  const sliderContent = [
    {
      id: 1,
      mainHeading: "WINDOW TINTS",
    },
    {
      id: 2,
      mainHeading: "CRAFT VINYL",
    },
    {
      id: 3,
      mainHeading: "CRAFT VINYL",
    },
    {
      id: 4,
      mainHeading: "CAR ACCESSORIES",
    },
  ];

  return (
    <>
      <Box
        sx={{
          background: `url(${baseUrl + "/assets/images/Header.png"})`,
          height: "88vh",
          backgroundRepeat: "no-repeat",
          alignContent: "center",
        }}
      >
        <Box p={2}>
          <Slide>
            {sliderContent.map((content, index) => (
              <Stack color={"white"} spacing={3} p={4} m={5}>
                <Typography
                  variant={"h3"}
                  fontWeight={"bold"}
                  className="Racing-font"
                >
                  {content?.mainHeading}
                </Typography>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Box
                    component={"img"}
                    src={baseUrl + "/assets/images/arrow.png"}
                    width={10}
                    height={15}
                  />
                  <Typography fontSize={"14px"}>
                    Custom Vinyl Films for a Unique, Head-Turning Look.
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Box
                    component={"img"}
                    src={baseUrl + "/assets/images/arrow.png"}
                    width={10}
                    height={15}
                  />
                  <Typography fontSize={"14px"}>
                    Protect your vehicle with high-quality vinyl.
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Box
                    component={"img"}
                    src={baseUrl + "/assets/images/arrow.png"}
                    width={10}
                    height={15}
                  />
                  <Typography fontSize={"14px"}>
                    Endless possibilities to express your style.
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  sx={{ width: 150, zIndex: showMenu ? -1 : 2 }}
                >
                  SHOP NOW
                </Button>
              </Stack>
            ))}
          </Slide>
        </Box>
      </Box>
    </>
  );
};

export default Slider;
