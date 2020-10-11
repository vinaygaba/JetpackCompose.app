import { classicAndroidVsJetpackComposeMap } from "../../utils/Data";
import Grid from "@material-ui/core/Grid";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import { IfThisThenThanColumnComponent } from "./IfThisThenThatColumnComponent";
import IfThisThenThatColumnComponentType from "../../models/IfThisThenThatColumnComponentType";
import NavigationBar from "../core/NavigationBar";
import JetpackComposeAppFooter from "../core/JetpackComposeAppFooter";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";

interface IfThisThenThatComponentProps extends RouteComponentProps {
  androidParam?: string;
  pageContext?: {
    classicAndroid?: any;
  };
}

export default function IfThisThenThatComponent(
  props: IfThisThenThatComponentProps
) {
  const classes = useStyles();
  const [selectedClassicAndroid, setClassicAndroidValue] = useState("");
  function handleChange(newValue: string) {
    setClassicAndroidValue(newValue);
  }

  useEffect(() => {
    if (
      (selectedClassicAndroid === undefined || selectedClassicAndroid === "") &&
      props.androidParam !== undefined &&
      classicAndroidVsJetpackComposeMap.get(props.androidParam) !== null
    ) {
      setClassicAndroidValue(props.androidParam);
    }
  }, [selectedClassicAndroid, props.androidParam]);

  return (
    <>
      <NavigationBar />
      <div className={classes.root}>
        <Helmet>
          <title>
            What's the equivalent of{" "}
            {props.androidParam ? props.androidParam : ""} in Jetpack Compose?
          </title>
          <meta
            name="description"
            content="Learn more about using Jetpack Compose in Android. How does Jetpack Compose compare to the existing Android UI Toolkit?"
          />
        </Helmet>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} lg={6} className={classes.firstColumn}>
            <IfThisThenThanColumnComponent
              prefix="If you used..."
              suffix="In Classic Android 🤖💚"
              selectedKey={
                props.pageContext ? props.pageContext.classicAndroid : ""
              }
              map={classicAndroidVsJetpackComposeMap}
              handleChange={handleChange}
              componentType={IfThisThenThatColumnComponentType.KEY}
            />
          </Grid>
          <Grid container item xs={12} lg={6} className={classes.secondColumn}>
            <IfThisThenThanColumnComponent
              prefix="Then, you could use..."
              suffix="In Jetpack Compose 🚀"
              selectedKey={
                props.pageContext ? props.pageContext.classicAndroid : ""
              }
              map={classicAndroidVsJetpackComposeMap}
              handleChange={handleChange}
              componentType={IfThisThenThatColumnComponentType.VALUE}
            />
          </Grid>
          <Grid item xs={12} className={classes.footer}>
            <JetpackComposeAppFooter />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "0%",
  },
  firstColumn: {
    background: "#FFFFFF",
    height: "90vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  secondColumn: {
    background: "#ccff90",
    height: "90vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: "20vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000000",
  },
});
