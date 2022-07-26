import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useTracker } from "meteor/react-meteor-data";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import "bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import UserCard from "../ui/pages/users/UserCard";
import UsersTable from "../ui/pages/users/UsersTable";
import UserCardDetails from "../ui/pages/users/UserCardDetails";
import CreateUsers from "../ui/pages/users/CreateUsers";

import { Grid, Zoom } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  root: {
    display: "flex",
    flexWrap: "nowrap",
    "& > *": {
      margin: theme.spacing(5),
      // width: 330,
      // height: 323,
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
  const useractual = useTracker(() => {
    return Meteor.user();
  });
  const user = (id) => {
    Meteor.subscribe("user", id,{fields:{
      'profile.role': 1
    }});
    return Meteor.users.findOne(id)
  }
  return (
    <>
      <div className={classes.toolbar} />

      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}

      <Switch>
      <Route path="/create-user">
          <div style={{ paddingBottom: "7em" }}>
          <Zoom in={true}>
          <CreateUsers />
              </Zoom>
              
          </div>

        </Route>
        <Route path="/users/:id">
          <div style={{ paddingBottom: "7em" }}>
            <UserCardDetails />
          </div>

        </Route>
        <Route path="/users">
          <div style={{ paddingBottom: "7em" }}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} className={classes.root}>
                  <UserCard withCreate="true" />
                </Grid>
                <Grid item xs={12}>
                  <UsersTable />
                 

                </Grid>
              </Grid>
            
          </div>

        </Route>
        <Route path="/">
          <div style={{ paddingBottom: "7em" }}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} className={classes.root}>
                  <UserCard withCreate="true" />
                </Grid>
                <Grid item xs={12}>
                  <UsersTable />
                 

                </Grid>
              </Grid>
            
          </div>

        </Route>

      </Switch>
    </>
  );
}