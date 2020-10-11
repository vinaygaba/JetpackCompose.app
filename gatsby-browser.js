import JetpackComposeApp from "./src/pages/index";
import React from "react";

export const wrapRootElement = ({ element }) => {
  return <JetpackComposeApp>{element}</JetpackComposeApp>;
};
