import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Paper,
  Box,
  Grid,
  Icon,
  Divider,
  Zoom,
  IconButton,
  Switch,
  FormControl,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControlLabel,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { useTracker } from "meteor/react-meteor-data";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { ServersCollection, VentasCollection, PreciosCollection, MensajesCollection } from "./collections/collections"
//icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import PermContactCalendarRoundedIcon from "@material-ui/icons/PermContactCalendarRounded";
import MailIcon from "@material-ui/icons/Mail";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import DataUsageIcon from '@material-ui/icons/DataUsage';

import { OnlineCollection, LogsCollection, RegisterDataUsersCollection } from "./collections/collections";
import { Autocomplete } from "@material-ui/lab";


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
  root: {
    borderRadius: 20,
    padding: "2em",
    borderColor: '#f50057',
    borderWidth: 13,
    borderStyle: 'groove',
    margin: 20,
  },
  primary: {
    // minWidth: 370,
    width: "100%",
    borderRadius: 20,
    padding: "2em",
    background:
      // "linear-gradient(0deg, rgba(36,83,162,1) 15%, rgba(245,0,87,0) 100%)",
      "#3f4b5b",
    color: "#ffffff9c",
  },
  boton: {
    borderRadius: 20,
    padding: 0,
  },
  rootADD: {
    minWidth: 275,
    maxWidth: 275,
    borderRadius: 20,
    padding: "2em",
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
  createUsers: {
    color: "#114c84",
  },
  link: {
    borderRadius: 20,
    textDecoration: "none",
    color: "#8b8b8b",
    fontSize: 16,
    fontWeight: "bold",
  },
  root2: {
    display: "flex",
    alignItems: "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  padding10: {
    margin: "13px 0",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  drawerItem: {
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 5),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  margin: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function UserCardDetails() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  var [edit, setEdit] = useState(false);
  var [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [edad, setEdad] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [ip, setIP] = useState("");
  const [searchIP, setSearchIP] = useState("");
  const [searchPrecio, setSearchPrecio] = useState("");
  const [searchPrecioVPN, setSearchPrecioVPN] = useState("");
  const [searchAdmin, setSearchAdmin] = useState("");
  const [megas, setMegas] = useState();
  const [mensaje, setMensaje] = useState("");

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlertOpen = () => {
    setOpenAlert(true);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const { id } = useParams()
  const bull = <span className={classes.bullet}>•</span>;

  const users = useTracker(() => {
    Meteor.subscribe("userID", id);
    return Meteor.users.findOne({ _id: id });
  });


  const eliminarUser = async (id) => {
    
    await Meteor.users.remove(id);
    setOpenAlert(false);
    alert("Usuario Eliminado");

    history.push("/users");
  }


  const handleEdit = (event) => {
    setEdit(!edit);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>

      <div className={classes.drawerHeader}>
        <IconButton
          color="primary"
          aria-label="delete"
          className={classes.margin}
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBackIcon fontSize="large" color="secondary" />
        </IconButton>
      </div>
      <Dialog
        open={openAlert}
        // onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alerta!!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Usted desea eliminar el usuario ${users && users.profile && users.profile.firstName} ${users && users.profile && users.profile.lastName} y sus datos correspondientes?`}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => { eliminarUser(users._id) }} color="secondary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} >
        <DialogTitle>Atención!!!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mensaje}
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            // type="email"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
      <div className={classes.drawerItem}>
        {users && (
          <Zoom in={true}>
            <>
              <Paper elevation={5} className={classes.primary}>
                <Grid container spacing={3}>
                  {edit ? (
                    <>
                      <Grid item xs={12}>
                        <Grid container direction="row" justify="center">
                          <Avatar
                            className={classes.large}
                            alt={
                              users.profile.firstName
                                ? users.profile.firstName
                                : users.profile.name
                            }
                            src={
                              users.picture
                                ? users.picture
                                : "/"
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}> <Divider className={classes.padding10} /></Grid>

                          <Grid container className={classes.margin}>


                            Datos Personales
                          </Grid>
                          <Grid item xs={12} sm={4} lg={3}>
                            <FormControl variant="outlined">
                              <TextField
                                fullWidth
                                className={classes.margin}
                                id="firstName"
                                name="firstName"
                                label="Nombre"
                                variant="outlined"
                                color="secondary"
                                value={users.profile.firstName}
                                onInput={(e) =>
                                  Meteor.users.update(users._id, {
                                    $set: {
                                      "profile.firstName": e.target.value,
                                    },
                                  })
                                }
                                InputProps={{
                                  readOnly: true,
                                  // startAdornment: (
                                  //   <InputAdornment position="start">
                                  //     <AccountCircleIcon />
                                  //   </InputAdornment>
                                  // ),
                                }}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={4} lg={3}>
                            <FormControl variant="outlined">
                              <TextField
                                fullWidth
                                className={classes.margin}
                                id="lastName"
                                name="lastName"
                                label="Apellidos"
                                variant="outlined"
                                color="secondary"
                                value={users.profile.lastName}
                                onInput={(e) =>
                                  Meteor.users.update(users._id, {
                                    $set: {
                                      "profile.lastName": e.target.value,
                                    },
                                  })
                                }
                                InputProps={{
                                  readOnly: true,
                                  // startAdornment: (
                                  //   <InputAdornment position="start">
                                  //     <AccountCircleIcon />
                                  //   </InputAdornment>
                                  // ),
                                }}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>

                      </Grid>
                    </>
                  ) : (
                    <>
                    <Grid item xs={12}>
                          <Grid container direction="row" justify="center">
                            <Avatar
                              className={classes.large}
                              alt={users && users.profile &&
                                users.profile.firstName
                                ? users.profile.firstName
                                : users.profile.name
                              }
                              src={users &&
                                users.picture
                                ? users.picture
                                : "/"
                              }
                            />
                          </Grid>
                        </Grid>
                      <Paper elevation={5} style={{ width: "100%", padding: 25, marginBottom: 25 }}>
                        <Grid item xs={12}>
                          <Grid container direction="row">
                            <Typography>
                              Nombre: {users && users.profile && users.profile.firstName}{" "}
                              {users && users.profile && users.profile.lastName}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container direction="row">
                            <Typography>Rol: {users && users.profile && users.profile.role}</Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container direction="row">
                            <Typography>
                              {users.emails && "Email: " + users.emails[0].address}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container direction="row">
                            <Typography>Usuario: {users.username}</Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </>
                  )}
                      <Grid item xs={12}>
                        <Divider className={classes.padding10} />
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          <Button
                            color={edit ? "secondary" : "primary"}
                            variant="contained"
                            onClick={handleEdit}
                          >
                            {edit ? "Cancelar Edición" : "Editar"}
                          </Button>
                        </Grid>
                      </Grid>
                </Grid>
              </Paper>

            </>
          </Zoom>
        )}
      </div>
    </>
  );
}
