import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Paper,
  Box,
  Grid,
  Icon,
  Divider,
  Zoom,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { useTracker } from "meteor/react-meteor-data";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { Link, useParams } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./Table.css";
import { Dropdown } from "primereact/dropdown";
//icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import PermContactCalendarRoundedIcon from "@material-ui/icons/PermContactCalendarRounded";
import MailIcon from "@material-ui/icons/Mail";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import BlockIcon from "@material-ui/icons/Block";

//Collections
import {
  DescargasCollection,
  LogsCollection,
  MensajesCollection,
  OnlineCollection,
  PeripheralsCollection,
  RegisterDataUsersCollection,
  VentasCollection,
} from "./collections/collections";
import { useHistory } from "react-router-dom";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {
    columnSmoll: {},
  },
  clasificado: {
    background: theme.palette.secondary.main,
    padding: 10,
    borderRadius: 25,
  },
  noclasificado: {
    background: theme.palette.primary.main,
    padding: 10,
    borderRadius: 25,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  margin: {
    margin: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function PeripheralTable(option) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selectedOnline, setSelectedOnline] = React.useState(null);
  const [selectedVPN, setSelectedVPN] = React.useState(null);
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [selectedLimites, setSelectedLimites] = React.useState(null);
  const [selectedConProxy, setSelectedConProxy] = React.useState(null);
  const [selectedContandoProxy, setSelectedContandoProxy] =
    React.useState(null);
  const dt = React.useRef(null);
  const history = useHistory();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [peripheralId, setPeripheralId] = React.useState();

  const handleClickAlertOpen = (id) => {
    setOpenAlert(true);
    setPeripheralId(id);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
    setPeripheralId(null);
  };

  const peripheralRegister = useTracker(() => {
    Meteor.subscribe("peripherals", option.selector ? option.selector : {});
    let a = [];

    PeripheralsCollection.find(option.selector ? option.selector : {}, {
      sort: { createdAt: 1 },
    }).map(
      (data) =>
        data &&
        a.push({
          id: data._id,
          uid: data.uid,
          vendor: data.vendor,
          createdAt: data.createdAt.toString(),
          status: data.status,
        })
    );

    return a;
  });

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );
  const iDBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">ID</span> */}
        {rowData.id}
      </React.Fragment>
    );
  };
  const uidBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Nombre y Apellidos</span> */}
        {rowData.uid}
      </React.Fragment>
    );
  };
  const vendorBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Username</span> */}
        {rowData.vendor}
      </React.Fragment>
    );
  };
  const createdAtBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Username</span> */}
        {rowData.createdAt}
      </React.Fragment>
    );
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Username</span> */}
        {rowData.status}
      </React.Fragment>
    );
  };

  const eliminarGateway = async (id) => {
    await Meteor.call("removePeripheral", id, (error, message) => {
      if (error) {
        setOpenAlert(false);
        alert("An unexpected error occurred");
        console.log(error);
      } else {
        setOpenAlert(false);
        alert(message);
      }
    });

    history.push("/");
  };
  const eliminarBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title"></span>
        <Tooltip title={"Eliminar a " + rowData.name}>
          <IconButton
            // disabled
            aria-label="delete"
            color="primary"
            onClick={() => {
              handleClickAlertOpen(rowData.id);
            }}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };
  const urlBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title"></span>
        <Tooltip title={"Ver Detalles de " + rowData.name}>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => {
              history.push("/users/" + rowData.id);
            }}
          >
            <ListAltIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  return (
    <>
      <Dialog
        open={openAlert}
        // onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alerta!!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Usted desea eliminar el usuario y sus datos correspondientes?`}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              eliminarGateway(peripheralId);
            }}
            color="secondary"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.drawerHeader}></div>
      <Chip
        style={{ width: "100%", fontSize: "1.1em" }}
        label="Peripheral Table"
      />
      <Zoom in={true}>
        <div style={{ width: "100%", padding: 10 }}>
          <div className="datatable-responsive-demo">
            <div className="card">
              <DataTable
                ref={dt}
                className="p-shadow-5 p-datatable-responsive-demo"
                value={peripheralRegister}
                paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                rows={5}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
                reorderableColumns={true}
                // resizableColumns={true}
              >
                <Column
                  field="id"
                  body={iDBodyTemplate}
                  wrap="nowrap"
                  header="ID"
                  filter
                  filterPlaceholder="ID"
                  filterMatchMode="contains"
                />
                <Column
                  field="name"
                  header="Nombre"
                  body={uidBodyTemplate}
                  filter
                  filterPlaceholder="Nombre"
                  filterMatchMode="contains"
                />
                <Column
                  field="vendor"
                  header="Vendor"
                  body={vendorBodyTemplate}
                  filter
                  filterPlaceholder="Vendor"
                  filterMatchMode="contains"
                />
                <Column
                  field="createdAt"
                  header="CreatedAt"
                  body={createdAtBodyTemplate}
                  filter
                  filterPlaceholder="createdAt"
                  filterMatchMode="contains"
                />
                <Column
                  field="status"
                  header="Status"
                  body={statusBodyTemplate}
                  filter
                  filterPlaceholder="Status"
                  filterMatchMode="contains"
                />
                {/* <Column field="urlReal" header="" body={urlBodyTemplate} /> */}

                <Column
                  field="eliminar"
                  header=""
                  body={eliminarBodyTemplate}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </Zoom>
    </>
  );
}
