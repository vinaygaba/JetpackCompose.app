import Accordion from "@material-ui/core/ExpansionPanel";
import AccordionSummary from "@material-ui/core/ExpansionPanelSummary";
import AccordionDetails from "@material-ui/core/ExpansionPanelDetails";
import Container from "@material-ui/core/Container";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Helmet } from "react-helmet";
import JetpackComposeAppFooter from "../core/JetpackComposeAppFooter";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "gatsby";
import NavigationBar from "../core/NavigationBar";
import NewsletterRow from "../newsletter/NewsletterRow";
import parse from "html-react-parser";
import PageTitle from "../core/PageTitle";
import React, { useRef } from "react";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "@reach/router";
import QnA from "../../models/QnA";

interface FAQPageComponentProps extends RouteComponentProps {
  pageContext: {
    qnaArray: [any];
    lastUpdateDate: string;
    currentQnA?: QnA;
  };
}

export default function FAQPageComponent(props: FAQPageComponentProps) {
  const classes = useStyles();
  const executeScroll = () => ref.current.scrollIntoView();
  const title = !(props.pageContext.currentQnA?.question.length === 0)
    ? props.pageContext.currentQnA?.question
    : "Frequently Asked Questions about Jetpack Compose";
  const description = !(props.pageContext.currentQnA?.answer.length === 0)
    ? props.pageContext.currentQnA?.answer
    : "Find answers to frequently asked questions about Jetpack Compose!";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jetpackcompose.app/faq" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content="https://jetpackcompose.app/faq_poster.png"
        />
      </Helmet>
      <main>
        <NavigationBar />
        <div className={classes.root}>
          <Container maxWidth="md">
            <PageTitle
              header="Frequently Asked Questions"
              subheader="Find answers to frequently asked questions about Jetpack Compose!"
            />
            {/* Removing last update date for now 
            {/* <Typography className={classes.lastUpdated} align="center">
              Last updated: {props.pageContext.lastUpdateDate}
            </Typography> */}
            {props.pageContext.qnaArray.map((qna) => {
              return (
                <Accordion
                  variant="outlined"
                  expanded={
                    qna.question === props.pageContext.currentQnA?.question
                  }
                  onChange={(event, expanded) => {
                    if (expanded) {
                      navigate(
                        "/" + qna.question.replace(/\?/g, "").replace(/ /g, "-")
                      );
                    } else {
                      navigate("/faq");
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.question}>
                      {parse(qna.question)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={classes.answer}>
                      {parse(qna.answer)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
            <div className={classes.newsletter}>
              <NewsletterRow />{" "}
            </div>
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
    width: "100%",
  },
  lastUpdated: {
    fontSize: 15,
    fontFamily: "Playfair Display",
    marginBottom: "2%",
  },
  question: {
    fontSize: 20,
    fontFamily: "Playfair Display",
    color: "#222",
    "& span": {
      fontSize: 16,
    },
    "& a": {
      color: "#4285F4",
    },
  },
  answer: {
    fontSize: 18,
    fontFamily: "Nunito Sans",
    color: "#222",
    "& a": {
      color: "#FFFFFF",
      background: "#4285F4",
      padding: "5px",
      textDecoration: "none",
    },
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
    marginBottom: "0px",
    bottom: "0px",
  },
});
