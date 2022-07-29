import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Paper, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Fade from 'react-reveal/Fade';

//icons
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const useStyles = makeStyles((theme) => ({
  boton: {
    margin: 15,
    borderRadius: 20,
    padding: 0,
  },
  rootADD: {
    minWidth: 220,
    maxWidth: 220,
    borderRadius: 20,
    padding: "2em",
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
}));

export default function AddCard(option) {
  const classes = useStyles();
 
    return (
      <Fade top
      >
        <Grid className={classes.root2}>
        <Link to={option.dir} className={classes.link}>
          <Button color="inherit" className={classes.boton}>
            
              <Paper elevation={5} className={classes.rootADD}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item>
                          <Typography fontSize="large" color="secondary">
                            <AddCircleRoundedIcon />
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography color="secondary">
                            {option.name}
                          </Typography>
                        </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              </Button>
            </Link>
          
        </Grid>
      </Fade>
    );
  
}
