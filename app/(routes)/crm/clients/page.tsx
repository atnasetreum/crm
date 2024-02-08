import Grid from "@mui/material/Grid";

import { OptionType } from "@shared/components/AutocompleteCampaignType";
import FiltersClients from "@components/crm/clients/FiltersClients";
import TableClients from "@components/crm/clients/TableClients";
import { Client } from "@interfaces";
import prisma from "@config/database";

interface SearchParamsProps {
  query: string;
  campaignType: string;
  project: string;
  origin: string;
  status: string;
  deletedUsers: string;
  discardedUsers: string;
}

const loadData = async (searchParams: SearchParamsProps) => {
  const { query, campaignType, project, origin, status, deletedUsers } =
    searchParams;

  const clients = await prisma.client.findMany({
    where: {
      ...(!deletedUsers && {
        active: true,
      }),
      ...(query && {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      }),
      ...(campaignType && {
        campaignType: campaignType,
      }),
      ...(project && {
        projects: {
          some: {
            name: project,
          },
        },
      }),
      ...(origin && {
        origin: origin,
      }),
      ...(status && {
        status: status,
      }),
    },
    include: {
      projects: true,
      comments: {
        include: {
          createdBy: true,
        },
      },
      events: true,
      createdBy: true,
      updatedBy: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return clients;
};

const loadCampaignTypes = () =>
  prisma.client.groupBy({
    by: ["campaignType"],
    where: {
      NOT: {
        campaignType: "",
      },
    },
  });

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const clients = await loadData(searchParams);

  const campaignTypes = await loadCampaignTypes();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <FiltersClients
          campaignTypes={
            campaignTypes.map((item) => ({
              title: item.campaignType,
            })) as OptionType[]
          }
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TableClients rows={clients as Client[]} />
      </Grid>
    </Grid>
  );
}
