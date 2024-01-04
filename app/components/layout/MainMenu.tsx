"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { logout } from "@actions";

const menu = [
  {
    href: "/crm/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    href: "/crm/clients",
    label: "Clientes",
    icon: <PeopleIcon />,
  },
];

export const MainListItems = () => {
  const pathname = usePathname();
  return (
    <>
      {menu.map((item) => (
        <ListItem disablePadding key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <ListItemButton component="a" selected={pathname === item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </>
  );
};

export const SecondaryListItems = () => {
  return (
    <>
      <ListSubheader component="div" inset>
        Reportes
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Mensual" />
      </ListItemButton>
      <ListItemButton onClick={() => logout()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItemButton>
    </>
  );
};
