import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import RingComponent from "./AnimatedRing";

const CustomizeRing = ({ selectedRing, setRings }) => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [colorCombination, setColorCombination] = useState([]);

  useEffect(() => {
    const generateRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const colorCombinations = [];
    for (let i = 1; i <= 400; i++) {
      colorCombinations.push({
        name: `Color Combo ${i}`,
        background: generateRandomColor(),
      });
    }

    setColorCombination(colorCombinations);
  }, []);

  useEffect(() => {
    setBackgroundColor("");
  }, [selectedRing]);

  const handleColorClick = (combination) => {
    setRings((rings) => {
      const updatedRings = rings.map((ring) => {
        if (ring.id === selectedRing.id) {
          return { ...ring, color: combination.background };
        }
        return ring;
      });
      return updatedRings;
    });
    setBackgroundColor(combination.background);
  };

  return (
    <Grid container bgcolor={"#f0f0f0"} spacing={2}>
      <Grid item xs={6}>
        <RingComponent color={backgroundColor} />
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ maxHeight: "300px", overflowY: "scroll" }}>
          <Grid container spacing={1}>
            {colorCombination?.map((combination, index) => (
              <Grid item key={index} xs={1}>
                <Box
                  onClick={() => handleColorClick(combination)}
                  sx={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: combination.background,
                    cursor: "pointer",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomizeRing;
