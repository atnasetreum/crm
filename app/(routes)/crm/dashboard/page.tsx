import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { ClientsByProject, TabsEvents } from "@components/crm/dashboard";
import { Event } from "@interfaces";
import prisma from "@config/database";

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

const clientsByProjects = async () => {
  const data = await prisma.project.findMany({
    where: {
      clients: {
        some: {},
      },
    },
    include: {
      clients: true,
    },
  });

  const clientesTotales = data.reduce(
    (acc, project) => acc + project.clients.length,
    0
  );

  return data.map((project) => {
    var porcentaje = Number((project.clients.length / clientesTotales) * 100);

    return {
      name: `${project.name} (${project.clients.length})`,
      y: Number(porcentaje.toFixed(2)),
    };
  });
};
export default async function DashboardPage() {
  const events = await loadEvents();

  const clientsByProjectsData = await clientsByProjects();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <TabsEvents events={events as Event[]} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ClientsByProject data={clientsByProjectsData} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}></Paper>
      </Grid>
    </Grid>
  );
}
