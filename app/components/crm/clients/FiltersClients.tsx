"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useDebouncedCallback } from "use-debounce";
import { SelectChangeEvent } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import * as XLSX from "xlsx";

import { OptionType } from "@shared/components/AutocompleteCampaignType";
import { SelectCampaignType } from "@shared/components/SelectCampaignType";
import { SelectStatus } from "@shared/components";
import { SelectProjects } from "@shared/components/SelectProjects";
import { SelectOrigins } from "@shared/components/SelectOrigins";
import { findOneClient, refreshClients } from "@actions";
import { Client } from "@interfaces";
import FormClients from "./FormClients";
import { stringToDateWithTime } from "@app/shared/utils";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  //borderRadius: theme.shape.borderRadius,
  border: "1px solid #CBC",
  //backgroundColor: "#FFF",
  borderRadius: "5px",
  //backgroundColor: alpha(theme.palette.common.black, 0.15),
  //"&:hover": {
  //backgroundColor: alpha(theme.palette.common.black, 0.25),
  //},
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    //padding: theme.spacing(1, 1, 1, 0),
    padding: theme.spacing(2, 2, 2, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface Props {
  campaignTypes: OptionType[];
  clients: Client[];
}

export default function FiltersClients({ campaignTypes, clients }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [clientCurrent, setClientCurrent] = useState<Client | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = useDebouncedCallback((term: string, key: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(key, term);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <AddIcon />
        </IconButton>
        <p>Agregar</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <RefreshIcon />
        </IconButton>
        <p>Refrescar</p>
      </MenuItem>
    </Menu>
  );

  const findOne = async (id: number) => {
    const { client } = await findOneClient(id);

    if (client) {
      setClientCurrent(client as Client);
    }
  };

  const createExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      clients.map((client) => {
        return {
          Nombre: client.name,
          Telefonos: client.phone,
          ["Correos"]: client.email,
          Estatus: client.status,
          Proyectos: client.projects.map((project) => project.name).join("| "),
          Origen: client.origin,
          Campaña: client.campaignType,
          creadoPor: client.createdBy.name,
          Comentarios: client.comments
            .map(
              (comment) =>
                `${comment.createdBy.name}: ${
                  comment.comment
                }: ${stringToDateWithTime(comment.createdAt)}`
            )
            .join("| "),
          Eventos: client.events
            .map(
              (event) =>
                `${stringToDateWithTime(event.date)}: ${event.comment}: ${
                  event.type
                }: ${event.createdBy.name}`
            )
            .join("| "),
        };
      })
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    XLSX.writeFile(wb, "clientes.xlsx");
  };

  const getCurrentValueFilter = (key: string) =>
    searchParams.get(key)?.toString() || "";

  const callClient = async (id: number) => {
    const { client } = await findOneClient(id);
    if (client && client.phone) {
      const firstPhone = `${client.phone.split(",")[0]}`.trim();
      const link = document.createElement("a");
      link.href = `tel:${firstPhone}`;
      link.click();
      link.remove();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const id = Number(params.get("id") || 0);
    const call = Number(params.get("call") || 0);

    if (call) {
      callClient(call);
    }

    if (id) {
      findOne(id);
    }
  }, [searchParams]);

  return (
    <>
      <FormClients
        handleClose={() => {
          const params = new URLSearchParams(searchParams);
          setClientCurrent(null);
          params.delete("id");
          params.delete("edit");
          replace(`${pathname}?${params.toString()}`);
        }}
        clientCurrent={clientCurrent}
        campaignTypes={campaignTypes}
      />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="inherit"
          elevation={1}
          sx={{
            p: 1,
            border: "2px solid #1976d2",
            backgroundColor: "#FFF",
            borderRadius: "5px",
          }}
        >
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} lg={2}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Buscar…"
                    inputProps={{ "aria-label": "search" }}
                    defaultValue={getCurrentValueFilter("query")}
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => handleSearch(e.target.value, "query")}
                  />
                </Search>
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <SelectStatus
                  isFilter={true}
                  value={getCurrentValueFilter("status")}
                  onChange={(e: SelectChangeEvent) =>
                    handleSearch(e.target.value, "status")
                  }
                />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <SelectProjects
                  value={getCurrentValueFilter("project")}
                  onChange={(e: SelectChangeEvent) =>
                    handleSearch(e.target.value, "project")
                  }
                />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <SelectOrigins
                  isFilter={true}
                  value={getCurrentValueFilter("origin")}
                  onChange={(e: SelectChangeEvent) =>
                    handleSearch(e.target.value, "origin")
                  }
                />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <SelectCampaignType
                  options={campaignTypes.map((item) => item.title)}
                  value={getCurrentValueFilter("campaignType")}
                  onChange={(e: SelectChangeEvent) =>
                    handleSearch(e.target.value, "campaignType")
                  }
                />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <Box sx={{ mt: 1 }}>
                  <Tooltip
                    title={`${
                      getCurrentValueFilter("deletedUsers") === "true"
                        ? "Excluir"
                        : "Incluir"
                    } usuarios eliminados`}
                  >
                    <Checkbox
                      icon={<PersonOffIcon />}
                      checkedIcon={<PersonOffIcon />}
                      checked={getCurrentValueFilter("deletedUsers") === "true"}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleSearch(
                          e.target.checked ? `${e.target.checked}` : "",
                          "deletedUsers"
                        )
                      }
                    />
                  </Tooltip>
                  <Tooltip title="Descargar clientes">
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => createExcel()}
                    >
                      <SimCardDownloadIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => setClientCurrent({} as Client)}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => refreshClients()}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}
