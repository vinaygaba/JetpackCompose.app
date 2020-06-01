import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HeaderText/>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "yellow",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft:"0",
  },
});

export function HeaderText() {
  const classes = headerTextStyles()
  return(
    <>
      <Typography
        className={classes.message}
        display="inline"
        variant="h3"
        align="center"
        paragraph
      >
        <span role="img" aria-label="Rocket">
          🚀
        </span>
        &nbsp; The #1 internet destination for Jetpack Compose
      </Typography>
      <Typography
        className={classes.message}
        variant="subtitle2"
        display="inline"
        align="center"
        paragraph
      >
        JetpackCompose.app is a hub to find high quality compose components, tutorial and resources about Jetpack Compose!
      </Typography>
    </>
  );
}

const headerTextStyles = makeStyles({
  message: {
    fontWeight: "bold",
    color: "#33691e",
    fontFamily: "Playfair Display",
  },
});