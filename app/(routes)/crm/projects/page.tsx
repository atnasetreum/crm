import Grid from "@mui/material/Grid";

import FiltersProjetcs from "@components/crm/projects/FiltersProjetcs";
import TableProjects from "@components/crm/projects/TableProjects";
import prisma from "@config/database";

const loadData = async (query: string) =>
  prisma.project.findMany({
    where: {
      active: true,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      clients: true,
      createdBy: true,
      updatedBy: true,
    },
    orderBy: {
      id: "desc",
    },
  });

export default async function ProjectsPage({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  const projects = await loadData(query);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <FiltersProjetcs />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TableProjects rows={projects} />
      </Grid>
    </Grid>
  );
}
