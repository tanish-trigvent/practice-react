import { Box } from "@mui/material";
import Banner from "../pages/home/Banner";
import Learner from "../pages/home/Learner";
import BuildSkills from "../pages/home/BuildSkills";
import Training from "../pages/home/Training";

const Content = () => {
  return (
    <div>
      <Box
        sx={{
          background: "black",
          paddingTop: "110px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ width: "90%" }}>
          <Banner />
        </div>
        <div style={{ width: "70%" }}>
          <Learner />
        </div>
        <div style={{ width: "90%" }}>
          <Training />
        </div>
        <div style={{ width: "100%" }}>
          <BuildSkills />
        </div>
        {/* <TextType
          text={["Hello, world!", "Hello, world!", "Hello, world!"]}
          textColors={["black"]}
        /> */}
      </Box>
    </div>
  );
};

export default Content;
