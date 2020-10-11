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

      {/* <Switch> */}
      {/* <Route
            path="/What-is-the-equivalent-of-:androidParam-in-Jetpack-Compose"
            render={(props) => <IfThisThenThatComponent />}
          /> */}
      {/* <QuickBitesComponent path="/QuickBites" />
        <FAQPageComponent listOfQnA={mockQnA} path="/FAQ" />
        <IfThisThenThatComponent path="/What-is-the-equivalent-of-:androidParam-in-Jetpack-Compose" /> */}
      {/* <Route path="/quick-bites">
            <QuickBitesComponent />
          </Route> */}
      {/* <Route path="/wip">
            <ComponentPreviewCardsSection
              sectionTitle="title"
              metadataArray={mockComponentPreviewCardMetadataArray}
            />
          </Route> */}
      {/* <Route
            path="/:androidParam"
            render={(props) => <IfThisThenThatComponent />}
          /> */}
      {/* <Route path="/">
            <IfThisThenThatComponent />
          </Route> */}
      {/* </Switch> */}
      {/* </Router> */}
    </>
  );
}

// const RootApp = () => (
//   <div className="SectionThree">
//     <JetpackComposeApp />
//   </div>
// );

// export default RootApp;

// ReactDOM.render(<RootApp />, document.getElementById("root"));

const useStyles = makeStyles({
  root: {
    margin: "0px",
  },
});
