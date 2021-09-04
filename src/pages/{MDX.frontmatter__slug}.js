require("../components/articles/articlePost.css");
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import NavigationBar from "../components/core/NavigationBar";
import React from "react";
require("prismjs/themes/prism-tomorrow.css");

export default function ArticlePost({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data; // data.mdx holds your post data
  const { frontmatter, body } = mdx;
  return (
    <>
      <Helmet>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={"https://jetpackcompose.app" + frontmatter.slug}
        />
        <meta property="twitter:title" content={frontmatter.title} />
        <meta
          property="twitter:description"
          content={frontmatter.description}
        />
        <meta property="twitter:image" content={frontmatter.heroImageUrl} />
      </Helmet>
      <main>
        <NavigationBar />
        <Container maxWidth="md">
          <div className="blog-post">
            <div className="postHeaderContainer">
              <div className="postHeader">{frontmatter.title}</div>
              <div className="postSubheader">
                <Avatar className="avatar" src={frontmatter.authorImageUrl} />
                <a href={frontmatter.authorProfileUrl} target="_blank">
                  {frontmatter.authorName + " "}
                </a>
                {"  on "}
                {frontmatter.date}
              </div>
            </div>
            <img src={frontmatter.heroImageUrl} className="heroImage"></img>
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </Container>
      </main>
    </>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        slug
        date(formatString: "MMMM DD, YYYY")
        title
        description
        authorName
        authorImageUrl
        authorProfileUrl
        heroImageUrl
      }
    }
  }
`;
