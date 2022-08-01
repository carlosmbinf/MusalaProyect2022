import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useTracker } from "meteor/react-meteor-data";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import PersistentDrawerLeft from './App'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function App() {
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark' ,
          // type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className={classes.root}>
      
        <CssBaseline />
        <Switch>
          <Route path="/">
            <PersistentDrawerLeft />
          </Route>
        </Switch>
      </div>
    </Router>
    </ThemeProvider>
  );
}

