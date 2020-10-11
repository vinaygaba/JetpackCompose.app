// import { ComponentPreviewCardsSection } from "../components/wip/ComponentPreviewCardsSection";
import FAQPageComponent from "../components/faq/FAQ";
import { mockQnA } from "../utils/Data";
// import { mockComponentPreviewCardMetadataArray } from "../utils/Mocks";
import NavigationBar from "../components/core/NavigationBar";
import IfThisThenThatComponent from "../components/ifttt/IfThisThenThat";
import QuickBitesComponent from "../components/quickbites/QuickBites";
import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Router, Link } from "@reach/router";

export default function JetpackComposeApp() {
  return (
    <>
      <Router>
        <IfThisThenThatComponent path="/"/>
        <QuickBitesComponent path="/quick-bites" />
        <FAQPageComponent listOfQnA={mockQnA} path="/faq" />
      </Router>

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
