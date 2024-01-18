import { SyntheticEvent, useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";
import { EventInput } from "@fullcalendar/core/index.js";

import { TabPanel } from "@shared/components";
import { Client } from "@interfaces";
import MainInfoClients from "./MainInfoClients";
import ListComments from "./ListComments";
import CalendarClient from "./CalendarClient";
import { ClientForm } from "./FormClients";

interface Props {
  stateForm: ClientForm;
  setStateForm: (state: ClientForm) => void;
  comments: string[];
  setComments: (state: string[]) => void;
  clientCurrent: Client | null;
  events: EventInput[];
  setEvents: (state: EventInput[]) => void;
}

export default function TabsClients({
  stateForm,
  setStateForm,
  comments,
  setComments,
  clientCurrent,
  events,
  setEvents,
}: Props) {
  const [value, setValue] = useState(0);
  const [activateTab, setActivateTab] = useState(false);

  setTimeout(() => {
    setActivateTab(true);
  }, 100);

  const tabsArr = [
    {
      label: "Datos generales",
      key: `simple-tab-0`,
    },
    {
      label: "Comentarios",
      key: `simple-tab-1`,
    },
    {
      label: "Agenda",
      key: `simple-tab-2`,
    },
  ];

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            {activateTab &&
              tabsArr.map((item) => <Tab key={item.key} label={item.label} />)}
          </Tabs>
        </AppBar>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ p: 2 }}>
          <MainInfoClients stateForm={stateForm} setStateForm={setStateForm} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ p: 2 }}>
          <ListComments
            comments={comments}
            setComments={setComments}
            clientCurrent={clientCurrent}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ p: 2 }}>
          <CalendarClient
            clientCurrent={clientCurrent}
            events={events}
            setEvents={setEvents}
          />
        </Box>
      </TabPanel>
    </Box>
  );
}
