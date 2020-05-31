import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        className={classes.message}
        variant="h3"
        display="inline"
        align="center"
      >
        <span role="img" aria-label="Rocket">
          🚀 
        </span>
        The #1 internet destination for Jetpack Compose
      </Typography>
      <br />
      <Typography
        className={classes.message}
        variant="subtitle2"
        display="inline"
      >
        JetpackCompose.app is a hub to find high quality compose components, tutorial and resources about Jetpack Compose!
      </Typography>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "green",
  },
  message: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Playfair Display",
  },
});
