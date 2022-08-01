import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AddCard from "../ui/pages/AddCard";

import { Grid, Zoom } from "@material-ui/core";
import CreatePeripheral from "../ui/pages/CreatePeripheral";
import CreateGateway from "../ui/pages/CreateGateway";
import GatewayTable from "../ui/pages/GatewayTable";
import PeripheralTable from "../ui/pages/PeripheralTable";
const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  root: {
    display: "flex",
    flexWrap: "nowrap",
    "& > *": {
      margin: theme.spacing(5),
    },
  },
  toolbar: theme.mixins.toolbar,
  contents: {
    overflowX: "auto",
    flexGrow: 1,
    padding: 5,
    marginLeft: 0,
    height: "100%",
  },
}));

export default function Main() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar} />
      <Switch>
        <Route path="/add-peripheral">
          <div>
            <Zoom in={true}>
              <CreatePeripheral />
            </Zoom>
          </div>
        </Route>
        <Route path="/add-gateway">
          <div>
            <Zoom in={true}>
              <CreateGateway />
            </Zoom>
          </div>
        </Route>
        <Route path="/">
          <div >
            <Grid
              container
            >
              <Grid item
                container xs={12}
                direction="row"
                justify="center"
                alignItems="center">
                <Grid >
                  <AddCard dir="/add-gateway" name="Add Gateway" />
                </Grid>
                <Grid>
                  <AddCard dir="/add-peripheral" name="Add Peripheral" />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <GatewayTable />
                <PeripheralTable />
              </Grid>
            </Grid>
          </div>
        </Route>
      </Switch>
    </>
  );
}
