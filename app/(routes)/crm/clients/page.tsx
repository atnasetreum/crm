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
  page?: number;
  limit?: number;
}

const loadData = async (searchParams: SearchParamsProps) => {
  const {
    query,
    campaignType,
    project,
    origin,
    status,
    deletedUsers,
    page = 1,
    limit = 5,
  } = searchParams;

  const where: any = {
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
  };

  const numRows = await prisma.client.count({
    where,
  });

  const limitNumber = Number(limit);

  const numPerPage = limitNumber;
  const numPages = Math.ceil(numRows / numPerPage);
  const skip = (Number(page) - 1) * numPerPage;

  const clients = await prisma.client.findMany({
    where,
    include: {
      projects: true,
      comments: {
        include: {
          createdBy: true,
        },
      },
      events: {
        include: {
          createdBy: true,
          project: true,
        },
      },
      createdBy: true,
      updatedBy: true,
    },
    ...(limitNumber === -1 ? {} : { take: limitNumber }),
    ...(limitNumber === -1 ? {} : { skip }),
    orderBy: {
      id: "desc",
    },
  });

  return { clients, count: numRows, numPages };
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

  const campaignTypes = (await loadCampaignTypes()) as {
    campaignType: string;
  }[];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <FiltersClients
          campaignTypes={
            campaignTypes.map((item) => ({
              title: item.campaignType,
            })) as OptionType[]
          }
          clients={clients.clients as Client[]}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TableClients
          rows={clients.clients as Client[]}
          count={clients.count}
        />
      </Grid>
    </Grid>
  );
}
