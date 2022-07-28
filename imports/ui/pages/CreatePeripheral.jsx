import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Paper, Box, Grid, Icon, IconButton, Zoom, Dialog, CircularProgress } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { Link, useParams } from "react-router-dom";
import Rotate from 'react-reveal/Rotate';
//icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import PermContactCalendarRoundedIcon from "@material-ui/icons/PermContactCalendarRounded";
import { FormControl, TextField, InputAdornment } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Fade } from "react-reveal";
import { GatewaysCollection } from "./collections/collections";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    // maxWidth: 275,
    borderRadius: 20,
    padding: "2em",
    marginBottom:"2em"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  createUser: {
    color: "#114c84",
  },
  margin: {
    margin: theme.spacing(1),
  },
  flex: {
    display: "flex",
    justifyContent: "flex-end",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  load: {
    width: 50,
    height: 50,
  },
}));

export default function CreatePeripheral(option) {
  const [uid, setuid] = useState("");
  const [vendor, setvendor] = useState("");
  const [idGateway, setidGateway] = useState("");
  const [serialNumber, setserialNumber] = useState("");
  const [name, setname] = useState("");
  const [ip4, setip4] = useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [transition, setTransition] = React.useState(undefined);
  const [load, setLoad] = React.useState(false);
  
  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }
  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };
  const gatewayList = useTracker(() => {
    Meteor.subscribe("gateway", option.selector?option.selector:{});  
    return GatewaysCollection.find(option.selector?option.selector:{}).fetch();
  });

  function handleSubmitPeripheral(event) {
    event.preventDefault();
    
    

    async function makePostRequest() {
      setLoad(true);

      let periphe = {
        uid,
        vendor
      }
      await Meteor.call("addPeripheral", periphe,idGateway, function (error, mensaje) {
        if (error) {
          console.log(error);
        } else {
          setMessage(mensaje);
          handleClick(TransitionUp);
          setLoad(false);
          setOpen(true);
        }
      })


    }

    makePostRequest();
  }
  

   function handleChange(event) {
     setidGateway(event.target.value);
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.drawerHeader}>
        <IconButton
          color="primary"
          aria-label="delete"
          className={classes.margin}
        >
          <Link to={"/users"}>
            <ArrowBackIcon fontSize="large" color="secondary" />
          </Link>
        </IconButton>
      </div>
      <Dialog aria-labelledby="simple-dialog-title" open={load}>
        <Grid className={classes.load}>
          <CircularProgress />
        </Grid>
      </Dialog>
      <Snackbar
              autoHideDuration={3000}
              open={open}
              onClose={handleClose}
              TransitionComponent={transition}
              message={message}
              key={transition ? transition.name : ""}
            />
      <Zoom in={true}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          
        >
          <Paper elevation={5} className={classes.root}>
            
            {/* <Button onClick={handleClick(TransitionUp)}>Up</Button> */}

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12}>
                <Typography variant="h4" color="secondary" component="h2">
                  Add Peripheral
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form
                  className={classes.root}
                  onSubmit={handleSubmitPeripheral}
                  // noValidate
                  autoComplete="false"
                >
                  <Grid container>
                    <Grid item xs={12} md={4} lg={3}>
                      <FormControl required variant="outlined">
                        <TextField
                          required
                          className={classes.margin}
                          id="uid"
                          name="uid"
                          label="UID"
                          variant="outlined"
                          color="secondary"
                          type="number"
                          value={uid}
                          onInput={(e) => setuid(e.target.value)}
                        // InputProps={{
                        //   startAdornment: (
                        //     <InputAdornment position="start">
                        //       <AccountCircle />
                        //     </InputAdornment>
                        //   ),
                        // }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <FormControl required variant="outlined">
                        <TextField
                          required
                          className={classes.margin}
                          id="vendor"
                          name="vendor"
                          label="Vendor"
                          variant="outlined"
                          color="secondary"
                          type="string"
                          value={vendor}
                          onInput={(e) => setvendor(e.target.value)}
                        // InputProps={{
                        //   startAdornment: (
                        //     <InputAdornment position="start">
                        //       <AccountCircle />
                        //     </InputAdornment>
                        //   ),
                        // }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        required
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Gateway
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={idGateway}
                          onChange={handleChange}
                          label="Select the Gateway"
                          // defaultValue={""}
                          required={true}
                        >
                          {/* <MenuItem value="">
                              <em>None</em>
                            </MenuItem> */}
                          {gatewayList.map(element => <MenuItem key={element._id} value={element._id}>{element.name}</MenuItem>)}
                          
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>


                  <Grid item xs={12} className={classes.flex}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="secondary"
                    >
                      <SendIcon />
                      Send
                    </Button>
                  </Grid>

                </form>
              </Grid>
            </Grid>
          </Paper>
          
        </Grid>

      </Zoom>
    </>
  );
}
