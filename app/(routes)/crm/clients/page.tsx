import Grid from "@mui/material/Grid";

import FiltersClients from "@components/crm/clients/FiltersClients";
import TableClients from "@components/crm/clients/TableClients";
import prisma from "@config/database";
import { Client } from "@interfaces";

const loadData = async (query: string) =>
  prisma.client.findMany({
    where: {
      active: true,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      projects: true,
      comments: true,
      events: true,
      createdBy: true,
      updatedBy: true,
    },
    orderBy: {
      id: "desc",
    },
  });

export default async function ClientsPage({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  const clients = await loadData(query);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <FiltersClients />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TableClients rows={clients as Client[]} />
      </Grid>
    </Grid>
  );
}
