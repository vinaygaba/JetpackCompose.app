import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// import { withRouter } from "react-router-dom";
// import { Link } from "@material-ui/core";
import { Link, navigate } from "gatsby";
import { useLocation } from "@reach/router";

interface IProps {
  history?: any;
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function NavigationBar(props: IProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  const handleChange = (event: any, value: any) => {
    navigate(value);
    setValue(value);
  };

  useEffect(() => handleChange("", location.pathname), []);

  return (
    <div className={classes.root}>
      <Paper square className={classes.header} elevation={0}>
        <Tabs
          value={value}
          className={classes.tabs}
          classes={{
            indicator: classes.tabsIndicator,
          }}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="scrollable"
        >
          <Link to="/" className={classes.logo}>
            <Typography className={classes.logoText}>
              🚀 JetpackCompose.app
            </Typography>
          </Link>
          <Tab
            label="Compose Catalog"
            {...a11yProps(0)}
            className={classes.tab}
            value="/"
          />
          <Tab
            label="Which Compose API to use?"
            {...a11yProps(0)}
            className={classes.tab}
            value="/What-is-the-equivalent-of--in-Jetpack-Compose"
          />
          <Tab
            label="FAQ's"
            {...a11yProps(1)}
            className={classes.tab}
            value="/faq"
          />
          <Tab
            label="Quick Bites"
            {...a11yProps(2)}
            className={classes.tab}
            value="/quick-bites"
          />
          <Tab
            label="Writing"
            {...a11yProps(2)}
            className={classes.tab}
            value="/writing"
          />
        </Tabs>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  header: {
    // backgroundColor: "#000000",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "8%",
    marginLeft: "10%",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  logoText: {
    fontSize: 22,
    fontFamily: "Libre Baskerville",
    color: "#222222",
  },
  tabs: {
    height: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tabsIndicator: {
    backgroundColor: "#ccff90",
  },
  tab: {
    color: "#222222",
    fontSize: 15,
    fontWeight: "bolder",
  },
  typography: {
    color: "#FFFFFF",
  },
});

export default NavigationBar;
