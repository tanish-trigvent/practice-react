// material-ui
import { Typography } from "@mui/material";

// project imports
import menuItem from "menu-items";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const userRole = useSelector((state) => state?.userReducer?.user?.role);
  const [items, setItems] = useState([]);

  useMemo(() => {
    if (userRole === "user") {
      setItems(menuItem?.items?.filter((item) => item?.title !== "Users"));
    } else {
      setItems(menuItem?.items);
    }
  }, [userRole]);

  const navItems = items?.map((item) => {
    switch (item?.type) {
      case "item":
        return <NavItem key={item?.id} item={item} />;
      default:
        return (
          <Typography key={item?.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
