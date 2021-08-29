import './blogpost.css'
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../core/NavigationBar";
import React from "react"
import { graphql } from "gatsby"
import BlogPostCard from './BlogPostCard';
import { Link, navigate } from "gatsby";
require("prismjs/themes/prism-tomorrow.css")

export default function BlogPost({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const classes = useStyles();
  return (
    <>
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
    </>
  )
}

const useStyles = makeStyles({
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