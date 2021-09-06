import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "./NavigationBar";
import JetpackComposeAppFooter from "./JetpackComposeAppFooter";
import React from "react";
import { Helmet } from "react-helmet";
import { Container } from "@material-ui/core";

interface LayoutProps {
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl";
  pageTitle?: string;
  pageDescription?: string;
  pageImageUrl?: string;
  pageSlug?: string;
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="./newsletter/mailer_lite.js"
        ></script>
        <title>{props.pageTitle}</title>
        <meta name="description" content={props.pageDescription} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://JetpackCompose.app/${props.pageSlug}`}
        />
        <meta property="twitter:title" content={props.pageTitle} />
        <meta property="twitter:description" content={props.pageDescription} />
        <meta property="twitter:image" content={props.pageDescription} />
      </Helmet>
      <main>
        <div className={classes.root}>
          <NavigationBar />
          <Container
            maxWidth={props.maxWidth}
            className={classes.pageContainer}
          >
            <div className={classes.page}>{props.children}</div>
          </Container>
          <div className={classes.footer}>
            <JetpackComposeAppFooter />
          </div>
        </div>
      </main>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    minHeight: "100vh",
  },
  pageContainer: {
    paddingBottom: "11.5rem",
  },
  page: {
    marginBottom: 32,
  },
  footer: {
    height: "11.5rem",
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
});
