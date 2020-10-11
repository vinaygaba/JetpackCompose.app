import FAQPageComponent from "../components/faq/FAQ";
import { mockQnA } from "../utils/Data";
import IfThisThenThatComponent from "../components/ifttt/IfThisThenThat";
import { makeStyles } from "@material-ui/core/styles";
import QuickBitesComponent from "../components/quickbites/QuickBites";
import React from "react";
import { Router } from "@reach/router";

export default function JetpackComposeApp() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        
        <Router>
          <IfThisThenThatComponent path="/" />
          <QuickBitesComponent path="/quick-bites" />
          <FAQPageComponent listOfQnA={mockQnA} path="/faq" />
        </Router>
      </div>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    margin: "0px",
  },
});
