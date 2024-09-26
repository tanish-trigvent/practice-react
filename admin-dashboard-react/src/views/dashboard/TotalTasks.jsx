import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonEarningCard from "ui-component/cards/Skeleton/EarningCard";

// assets
import EarningIcon from "assets/images/icons/earning.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import useTodo from "hooks/todo/useTodo";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TotalTasks = ({ isLoading }) => {
  const theme = useTheme();
  const userId = useSelector((state) => state?.userReducer?.user?._id);
  const { allTodo } = useTodo(userId);
  const [totalTasks, setTotalTasks] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useMemo(() => {
    setTotalTasks(allTodo?.data?.length);
  }, [allTodo]);

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: "secondary.dark",
            color: "#fff",
            overflow: "hidden",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: "50%",
              top: { xs: -105, sm: -85 },
              right: { xs: -140, sm: -95 },
            },
            "&:before": {
              content: '""',
              position: "absolute",
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: "50%",
              top: { xs: -155, sm: -125 },
              right: { xs: -70, sm: -15 },
              opacity: 0.5,
            },
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      {totalTasks}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "secondary.200",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  component={Link}
                  to={"/todo"}
                >
                  Total Tasks
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
};

TotalTasks.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalTasks;
