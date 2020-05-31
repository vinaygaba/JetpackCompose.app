import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import Typography from "@material-ui/core/Typography";
import Header from "./components/Header";
import { Box } from "@material-ui/core";

export default function JetpackComposeApp() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Box height="100%" width="100%">
        <Box height="40%">
          <Header />
        </Box>
        <Box height="60%">
          <div style={{ backgroundColor: "white", height: "100%" }}>There</div>
        </Box>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ccff90",
    height: "100vh"
  },
  headerContainer: {
    // height: "30%",
  },
});

ReactDOM.render(<JetpackComposeApp />, document.getElementById("root"));
