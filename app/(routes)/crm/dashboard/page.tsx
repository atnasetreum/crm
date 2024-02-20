import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import {
  ClientsByProjectChart,
  StatusByProjectsChart,
  TabsEvents,
} from "@components/crm/dashboard";
import { Event, Project } from "@interfaces";
import prisma from "@config/database";
import { groupBy } from "@shared/utils";

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
  const data = (await prisma.project.findMany({
    where: {
      clients: {
        some: {},
      },
    },
    include: {
      clients: true,
    },
  })) as Project[];

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

const statusByProjects = async () => {
  const projectWithClients = (await prisma.project.findMany({
    where: {
      clients: {
        some: {},
      },
      active: true,
    },
    include: {
      clients: true,
    },
    orderBy: {
      name: "asc",
    },
  })) as Project[];

  const clientsTotales = projectWithClients.reduce(
    (acc, project) => acc + project.clients.length,
    0
  );

  const statusByProjectsData = projectWithClients.map((project) => {
    const porcentaje = Number((project.clients.length / clientsTotales) * 100);
    return {
      name: `${project.name} (${project.clients.length})`,
      y: Number(porcentaje.toFixed(2)),
      drilldown: project.name,
    };
  });

  const statusByProjectsSeries = [];

  for (let i = 0, t = projectWithClients.length; i < t; i++) {
    const projectCurrent = projectWithClients[i];

    const clientsGroupStatus = groupBy(projectCurrent.clients, "status");

    const data = [];

    for (const key in clientsGroupStatus) {
      const clients = clientsGroupStatus[key];
      const porcentaje = Number(
        (clients.length / projectCurrent.clients.length) * 100
      );
      data.push([`${key} (${clients.length})`, Number(porcentaje.toFixed(2))]);
    }

    statusByProjectsSeries.push({
      name: `${projectCurrent.name}`,
      id: projectCurrent.name,
      data,
    });
  }

  return {
    statusByProjectsData,
    statusByProjectsSeries,
  };
};

export default async function DashboardPage() {
  const events = await loadEvents();

  const clientsByProjectsData = await clientsByProjects();

  const { statusByProjectsData, statusByProjectsSeries } =
    await statusByProjects();

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
          <ClientsByProjectChart data={clientsByProjectsData} />
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
          <StatusByProjectsChart
            data={statusByProjectsData}
            series={statusByProjectsSeries}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}></Paper>
      </Grid>
    </Grid>
  );
}
