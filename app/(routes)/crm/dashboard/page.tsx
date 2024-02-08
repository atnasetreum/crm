import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import TabsEvents from "@components/crm/dashboard/TabsEvents";
import prisma from "@config/database";
import { Event } from "@interfaces";

const loadEvents = async () =>
  prisma.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    include: {
      client: true,
      project: true,
      createdBy: true,
      updatedBy: true,
    },
  });

export default async function DashboardPage() {
  const events = await loadEvents();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabsEvents events={events as Event[]} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        ></Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}></Paper>
      </Grid>
    </Grid>
  );
}
