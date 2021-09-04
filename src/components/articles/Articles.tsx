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

export default function Articles({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title></title>
        <meta name="description" content="" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jetpackcompose.app/faq" />
        <meta property="twitter:title" content="" />
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
              {data.allMdx.edges.map((edge) => {
                return (
                  <Grid item lg={4} xs={12}>
                    <Grid container justify="center">
                      <Link
                        to={edge.node.frontmatter.slug}
                        className={classes.blogLink}
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
    paddingBottom: "10rem",
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
  footer: {
    marginTop: "2%",
    height: "10rem",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    background: "#000000",
    bottom: 0,
    position: "absolute",
    display: "flex",
  },
});

export const pageQuery = graphql`
  query AllBlogs {
    allMdx {
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
