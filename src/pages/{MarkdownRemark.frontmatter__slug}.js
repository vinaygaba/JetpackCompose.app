import "../components/writing/blogpost.css";
import Container from "@material-ui/core/Container";
import NavigationBar from "../components/core/NavigationBar";
import React from "react";
import { graphql } from "gatsby";
require("prismjs/themes/prism-tomorrow.css");

export default function BlogPost({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <NavigationBar />
      <Container maxWidth="md">
        <div className="blog-post">
          <div className="title">{frontmatter.title}</div>
          <h2>{frontmatter.date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </Container>
    </>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`;
