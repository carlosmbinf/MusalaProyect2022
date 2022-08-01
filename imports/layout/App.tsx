import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./Main";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
    },
    content: {
      minHeight: "100vh",
      minWidth: "100%",
      maxWidth: "100vw",
      flexGrow: 1,
      background: "#2a323d",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }
  })
);

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  return (
    <>
      <div
        className={classes.root}
      >
        <CssBaseline />
        <main
          className={clsx(
            classes.content
          )}
        >
          <Main />
        </main>
      </div>
    </>
  );
}
