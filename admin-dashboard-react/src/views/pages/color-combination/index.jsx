import React, { useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import ColorPicker from "./ColorPicker";
import Ring from "./Ring";
import { useModal } from "components/Modal";
import AnimateButton from "ui-component/extended/AnimateButton";
import useColorSurvey from "hooks/useColorSurvey";
import { useSelector } from "react-redux";
import { useSnackbar } from "components/Snackbar";

const ColorCombination = () => {
  const [selectedRing, setSelectedRing] = useState({});
  const userId = useSelector((state) => state?.userReducer?.user?._id);
  const { submitSurvey } = useColorSurvey();
  const { showModal, closeModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const [rings, setRings] = useState([
    {
      id: 1,
      color: "",
    },
    {
      id: 2,
      color: "",
    },
    {
      id: 3,
      color: "",
    },
    {
      id: 4,
      color: "",
    },
    {
      id: 5,
      color: "",
    },
    {
      id: 6,
      color: "",
    },
    {
      id: 7,
      color: "",
    },
  ]);

  const handleRingSelected = (selectedRing) => {
    showModal({
      title: "Color Picker",
      content: <ColorPicker selectedRing={selectedRing} setRings={setRings} />,
      maxWidth: "md",
      onSubmit: () => closeModal(),
    });
    setSelectedRing(selectedRing);
  };

  const handleSurvey = async () => {
    try {
      const response = await submitSurvey({ userId, data: rings });
      showSnackbar(response, "success");
    } catch (error) {
      showSnackbar(error?.message, "error");
    }
  };

  return (
    <SubCard>
      <Grid container>
        <Grid item xs={8}>
          <SubCard sx={{ bgcolor: "whiteSmoke" }}>
            <Grid container spacing={1}>
              {rings.map((ring, i) => (
                <Grid
                  item
                  key={ring?.id}
                  onClick={() => {
                    handleRingSelected(ring);
                  }}
                  xs={4}
                >
                  <Ring ring={ring} index={i} />
                </Grid>
              ))}
            </Grid>
            <Stack width={100} sx={{ float: "right" }} p={1}>
              <AnimateButton>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSurvey}
                >
                  Save
                </Button>
              </AnimateButton>
            </Stack>
          </SubCard>
        </Grid>
      </Grid>
    </SubCard>
  );
};

export default ColorCombination;
