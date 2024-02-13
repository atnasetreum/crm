"use client";

import { SyntheticEvent, useEffect, useState } from "react";

import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Event } from "@interfaces";
import { ListEventsToday } from "./";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface Props {
  events: Event[];
}

export function TabsEvents({ events }: Props) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [calls, setCalls] = useState<Event[]>([]);
  const [eventsCurrent, setEventsCurrent] = useState<Event[]>([]);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  useEffect(() => {
    setCalls(events.filter(({ type }) => type === "Llamada"));
    setEventsCurrent(events.filter(({ type }) => type === "Cita"));
  }, [events]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  /*useEffect(() => {
    fetch("/api/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hola: "mundo" }),
    });
  }, []);*/

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={`Llamadas (${calls.length})`} {...a11yProps(0)} />
          <Tab label={`Citas (${eventsCurrent.length})`} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {isClient && <ListEventsToday events={calls} />}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {isClient && <ListEventsToday events={eventsCurrent} />}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
