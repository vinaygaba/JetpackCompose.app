import ArticleCard from "./ArticleCard";
import Container from "@material-ui/core/Container";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import JetpackComposeAppFooter from "../core/JetpackComposeAppFooter";
import { Link, navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../core/NavigationBar";
require("prismjs/themes/prism-tomorrow.css");
import React from "react";
import { Grid } from "@material-ui/core";
import { transform } from "typescript";
import NewsletterRow from "../newsletter/NewsletterRow";

export default function Articles({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          Jetpack Compose Articles | JetpackCompose.app by Vinay Gaba
        </title>
        <meta name="description" content="" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://JetpackCompose.app/articles"
        />
        <meta
          property="twitter:title"
          content="Jetpack Compose Articles | JetpackCompose.app by Vinay Gaba"
        />
        <meta property="twitter:description" content="" />
        <meta property="twitter:image" content="" />
      </Helmet>
      <main>
        <div className={classes.root}>
          <NavigationBar />
          <Container maxWidth="lg" className={classes.articleContainer}>
            <div className={classes.title}>Articles</div>
            <Grid
              container
              lg={12}
              xs={12}
              spacing={3}
              className={classes.articleGridContainer}
            >
              {data.allMarkdownRemark.edges.map((edge) => {
                return (
                  <Grid item lg={4} xs={12}>
                    <Grid container justify="center">
                      <Link
                        to={edge.node.frontmatter.slug}
                        className={classes.blogLink}
                        partiallyActive={true}
                      >
                        <ArticleCard
                          title={edge.node.frontmatter.title}
                          description={edge.node.frontmatter.description}
                          imageUrl={edge.node.frontmatter.heroImageUrl}
                          date="Aug 21, 2021"
                        />
                      </Link>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
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
    position: "relative",
    minHeight: "100vh",
  },
  articleContainer: {
    paddingBottom: "11.5rem",
  },
  articleGridContainer: {
    marginBottom: "96px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    fontFamily: "Nunito Sans",
    color: "#222",
    marginTop: "64px",
    marginBottom: "96px",
    textAlign: "center",
  },
  blogLink: {
    textDecoration: "none",
    transition: "transform .3s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  newsletter: {
    marginBottom: 64,
    margin: "auto",
    maxWidth: 960,
    textAlign: "center",
  },
  footer: {
    marginTop: "2%",
    height: "11.5rem",
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
});

export const pageQuery = graphql`
  query AllBlogs {
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            title
            slug
            description
            heroImageUrl
          }
        }
      }
    }
  }
`;
