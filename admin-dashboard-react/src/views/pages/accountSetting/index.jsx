import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import React from "react";
import SubCard from "ui-component/cards/SubCard";
import Profile from "./Profile";
import Security from "./Security";

const AccountSetting = () => {
  const [value, setValue] = React.useState("profile");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <SubCard title={<Typography variant="h3">Account-settings</Typography>}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Profile" value="profile" />
            <Tab label="Security" value="security" />
          </TabList>
        </Box>
        <TabPanel value="profile">
          <Profile />
        </TabPanel>
        <TabPanel value="security">
          <Security />
        </TabPanel>
      </TabContext>
    </SubCard>
  );
};

export default AccountSetting;
