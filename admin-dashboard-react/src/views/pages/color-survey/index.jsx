import { Button, Stack, Typography } from "@mui/material";
import DataGridTable from "components/DataGrid";
import useColorSurvey from "hooks/useColorSurvey";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as XLSX from "xlsx";

const ColorSurvey = () => {
  const userId = useSelector((state) => state.userReducer.user._id);
  const { colorCombinations } = useColorSurvey(userId);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const columns = [
    {
      field: "fullName",
      headerName: "User Name",
      sortable: false,
      width: 200,
      valueGetter: (value, row) => {
        return `${row?.userId.firstName || ""} ${row?.userId.lastName || ""}`;
      },
    },
    ...Array(7)
      .fill()
      .map((_, index) => ({
        field: `color${index + 1}`, // Dynamically setting field name
        headerName: `Color ${index + 1}`, // Dynamically setting header name
        sortable: false,
        width: 100,
        valueGetter: (value, row) => {
          const colorObj = row?.colorCombination?.[index]; // Access object at index in colorCombination array
          const color = colorObj?.color; // Access color field from object
          return color ? color : "-"; // Render nothing if no color
        },
      })),
  ];

  useEffect(() => {
    setData(() =>
      colorCombinations?.map((entry) => {
        const { firstName } = entry.userId;
        const colors = entry.colorCombination;

        // Create a new object with the first name and color fields
        const transformedEntry = {
          Username: firstName,
          ...colors.reduce((acc, color, index) => {
            acc[`color${index + 1}`] = color?.color; // Create color1, color2, etc.
            return acc;
          }, {}),
        };
        return transformedEntry;
      })
    );
    setRows(colorCombinations);
  }, [colorCombinations]);

  const exportToExcel = (data, fileName) => {
    // Check if data exists and is an array
    if (!Array.isArray(data) || data.length === 0) {
      console.error("No data available to export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate Excel file and download
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExport = () => {
    exportToExcel(data, "colors_export");
  };

  return (
    <SubCard
      title={
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h3">Color Combinations</Typography>
          <AnimateButton>
            <Button variant="contained" onClick={handleExport}>
              Export data
            </Button>
          </AnimateButton>
        </Stack>
      }
    >
      <DataGridTable columns={columns} rows={rows} />
    </SubCard>
  );
};

export default ColorSurvey;
