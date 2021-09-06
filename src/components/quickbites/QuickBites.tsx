import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import JetpackComposeAppFooter from "../core/JetpackComposeAppFooter";
import NavigationBar from "../core/NavigationBar";
import NewsletterRow from "../newsletter/NewsletterRow";
import PageTitle from "../core/PageTitle";
import React from "react";
import TweetEmbed from "react-tweet-embed";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "@reach/router";

function QuickBitesComponent(props: RouteComponentProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>Jetpack Compose Quick Bites</title>
        <meta
          name="description"
          content="Learn Jetpack Compose with easy to consume bites of knowledge!"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://JetpackCompose.app/quick-bites"
        />
        <meta property="twitter:title" content="Jetpack Compose Quick Bites" />
        <meta
          property="twitter:description"
          content="Learn Jetpack Compose with easy to consume bites of knowledge!"
        />
        <meta
          property="twitter:image"
          content="https://jetpackcompose.app/quick_bites.png"
        />
      </Helmet>
      <main>
        <NavigationBar />
        <Grid container className={classes.container}>
          <Grid item xs={12} md={12}>
            <Grid container justify="center">
              <Grid key={"header"} item xs={12} md={4}>
                <PageTitle
                  header="Compose Quick Bites"
                  subheader=" Learn more about the core concepts of Jetpack Compose right
                    from your Twitter feed!"
                />
              </Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid key={"issue1"} item xs={12} md={4}>
                <Typography className={classes.issueTitle} align="center">
                  Issue #1: What is declarative UI?
                </Typography>
                <TweetEmbed id="1304904120868823040" />
              </Grid>
              <Grid key={"issue2"} item xs={12} md={4}>
                <Typography className={classes.issueTitle} align="center">
                  Issue #2: What is this @Composable thing?
                </Typography>
                <TweetEmbed id="1307528586174160896" />
              </Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid key={"issue3"} item xs={12} md={4} justify="center">
                <Typography className={classes.issueTitle} align="center">
                  Issue #3: Why should you care about recomposition?
                </Typography>
                <TweetEmbed id="1310042895546609664" />
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <div className={classes.newsletter}>
              <NewsletterRow />{" "}
            </div>
          </Grid>
        </Grid>
        <div className={classes.footer}>
          <JetpackComposeAppFooter />
        </div>
      </main>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    minHeight: "100vh",
  },
  container: {
    paddingBottom: "11.5rem",
  },
  issueTitle: {
    fontSize: 25,
    fontFamily: "Nunito Sans",
    marginBottom: "2%",
    marginTop: "5%",
    color: "#222",
  },
  newsletter: {
    marginBottom: 64,
    margin: "auto",
    maxWidth: 960,
    textAlign: "center",
    marginTop: 64,
  },
  footer: {
    marginTop: "2%",
    height: "11.5rem",
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
});

export default QuickBitesComponent;
