// assets
import { IconDashboard, IconUsers, IconListDetails } from "@tabler/icons-react";

// constant
const icons = { IconDashboard, IconUsers, IconListDetails };

const MenuItems = [
  {
    id: "default",
    title: "Dashboard",
    type: "item",
    url: "/",
    icon: icons?.IconDashboard,
    breadcrumbs: false,
  },
  {
    id: "2",
    title: "Users",
    type: "item",
    url: "/users",
    icon: icons?.IconUsers,
    breadcrumbs: false,
  },
  {
    id: "3",
    title: "Todo",
    type: "item",
    url: "/todo",
    icon: icons?.IconListDetails,
    breadcrumbs: false,
  },
];

export default MenuItems;
