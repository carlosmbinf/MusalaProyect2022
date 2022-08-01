import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Zoom,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  useMediaQuery,
  Grid,
  FormControl,
  TextField,
} from "@material-ui/core";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Badge from "@material-ui/core/Badge";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./Table.css";
//icons
import ListAltIcon from "@material-ui/icons/ListAlt";
import DeleteIcon from "@material-ui/icons/Delete";


//Collections
import {
  GatewaysCollection,
} from "./collections/collections";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/styles";
import PeripheralTableByGateway from "./PeripheralTableByGateway";

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

export default function GatewayTable(option) {
  const classes = useStyles();
  const dt = React.useRef(null);
  const history = useHistory();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xl');
  const [nameChange, setNameChange] = React.useState();
  const [ip4Change, setIp4Change] = React.useState();

  const [idGateway, setIdGateway] = React.useState();
  
  const theme = useTheme();

  const handleClickAlertOpen = (id) => {
    setOpenAlert(true);
    setIdGateway(id);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
    setIdGateway(null);
  };
  const updateGate = async () => {
    let gatew = {
      name:nameChange,
      ip4:ip4Change
    }

    await Meteor.call("updateGateway", idGateway, gatew, function (error, mensaje) {
      if (error) {
        console.log(error);
      } else {
        
        alert(mensaje.error?mensaje.error:mensaje.result);
        mensaje.result&&setOpenDetails(false);
        mensaje.result&&setIdGateway("")
        mensaje.result&&setIp4Change("")
        mensaje.result&&setNameChange("")
      }
    })

   
  }
  const gatewayRegister = useTracker(() => {
    Meteor.subscribe("gateway", option.selector ? option.selector : {});

    let a = [];

    GatewaysCollection.find(option.selector ? option.selector : {}, {
      sort: { name: 1 },
    }).map(
      (data) =>
        data &&
        a.push({
          serialNumber: data._id,
          name: data.name,
          ip4: data.ip4,
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
  const serialNumberBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.serialNumber}
      </React.Fragment>
    );
  };
  const nombreBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.name}
      </React.Fragment>
    );
  };
  const ip4BodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.ip4}
      </React.Fragment>
    );
  };

  const eliminarGateway = async (id) => {
    await Meteor.call("removeGateway", id, (error, message) => {
      if (error) {
        setOpenAlert(false);
        alert("An unexpected error occurred");
        console.log(error);
      } else {
        setOpenAlert(false);
        message.error ? alert(message.error) : alert(message.result)

      }
    });

  };
  const eliminarBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title"></span>
        <Tooltip title={"Remove:" + rowData.name}>
          <IconButton
            // disabled
            aria-label="delete"
            color="primary"
            onClick={() => {
              handleClickAlertOpen(rowData.serialNumber);
            }}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };
  const detailsBodyTemplate = (rowData) => {
    return (
      <>
        <React.Fragment>
          <span className="p-column-title"></span>
          <Tooltip title={"Details: " + rowData.name}>
            <IconButton
              // disabled
              aria-label="delete"
              color="primary"
              onClick={() => {
                setIdGateway(rowData.serialNumber)
                setIp4Change(rowData.ip4)
                setNameChange(rowData.name)
                setOpenDetails(true);
              }}
            >
              <ListAltIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      </>
      
    );
  };
  return (
    <>
      <Dialog
        open={openAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alert!!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to remove the Gateway and its corresponding Peripherals?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              eliminarGateway(idGateway);
            }}
            color="secondary"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDetails}
        // onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">{"Update Gateway"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Here you can update the data corresponding to the selected Gateway`}
          </DialogContentText>
          <Grid container 
            direction="row"
            alignItems="center"
            spacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  fullWidth
                  // className={classes.margin}
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  color="secondary"
                  value={nameChange}
                  onInput={(e) =>
                    setNameChange(e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  fullWidth
                  // className={classes.margin}
                  id="ip4"
                  name="ip4"
                  label="IP4"
                  variant="outlined"
                  color="secondary"
                  value={ip4Change}
                  onInput={(e) =>
                    setIp4Change(e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <PeripheralTableByGateway peripherals={GatewaysCollection.findOne(idGateway)&&GatewaysCollection.findOne(idGateway).peripherals}/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenDetails(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => updateGate()}
            color="secondary"
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.drawerHeader}></div>
      <Chip
        style={{ width: "100%", fontSize: "1.1em" }}
        label="Gateway Table"
      />
      <Zoom in={true}>
        <div style={{ width: "100%", padding: 10 }}>
          <div className="datatable-responsive-demo">
            <div className="card">
              <DataTable
                ref={dt}
                className="p-shadow-5 p-datatable-responsive-demo"
                value={gatewayRegister}
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
                  field="serialNumber"
                  body={serialNumberBodyTemplate}
                  wrap="nowrap"
                  header="Serial Number"
                  filter
                  filterPlaceholder="ID"
                  filterMatchMode="contains"
                />
                <Column
                  field="name"
                  header="Name"
                  body={nombreBodyTemplate}
                  filter
                  filterPlaceholder="Name"
                  filterMatchMode="contains"
                />
                <Column
                  field="ip4"
                  header="IP4"
                  body={ip4BodyTemplate}
                  filter
                  filterPlaceholder="IP4"
                  filterMatchMode="contains"
                />
                <Column
                  field="details"
                  header=""
                  body={detailsBodyTemplate}
                />
                
                <Column
                  field="remove"
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
