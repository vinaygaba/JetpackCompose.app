import './blogpost.css'
import BlogPostCard from './BlogPostCard';
import Container from "@material-ui/core/Container";
import { graphql } from "gatsby"
import JetpackComposeAppFooter from "../core/JetpackComposeAppFooter";
import { Link, navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../core/NavigationBar";
require("prismjs/themes/prism-tomorrow.css")
import React from "react"

export default function BlogPost({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <NavigationBar />
        <Container maxWidth="md">
            <div className={classes.title}>Writing</div>
            <div className="blog-post">
                {
                    data.allMarkdownRemark.edges.map((edge) => {
                        console.log('Slug ' + edge.node.frontmatter.slug)
                        return <Link to={edge.node.frontmatter.slug} className={classes.blogLink}>
                                    <BlogPostCard 
                                        title={edge.node.frontmatter.title}
                                        description="This is the description"
                                    />
                                </Link>
                    })   
                }
            </div>
        </Container>
        <div className={classes.footer}>
            <JetpackComposeAppFooter />
        </div>
    </div>
  )
}

const useStyles = makeStyles({
    root: {
        position: 'relative',
        minHeight: "100vh",
    },
    title: {
        fontSize: "38px",
        fontWeight: "bold",
        fontFamily: "Merriweather",
        color: "#222",
        marginTop: "64px",
        marginBottom: "96px",
        textAlign: "center"
    },
    blogLink: {
        textDecoration: "none"
    },
    footer: {
        marginTop: "2%",
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        background: "#000000",
        bottom: 0,
        position: 'absolute',
        display: "flex",
    }
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
            }
          }
        }
    }
  }
`