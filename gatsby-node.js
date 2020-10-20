var githubParser = require("parse-github-url");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  /* IFTTT Page Generation */
  const iftttResult = await graphql(`
    {
      allIftttJson {
        edges {
          node {
            classicAndroid
            compose
            documentationUrl
            exampleUrl
          }
        }
      }
    }
  `);

  let iftttArrray = [];
  iftttResult.data.allIftttJson.edges.forEach((edges) => {
    const element = edges.node;
    iftttArrray.push({
      classicAndroid: element.classicAndroid,
      compose: element.compose,
      exampleUrl: element.exampleUrl,
      documentationUrl: element.documentationUrl,
    });
  });

  iftttResult.data.allIftttJson.edges.forEach((edges) => {
    const element = edges.node;
    createPage({
      path: `What-is-the-equivalent-of-${element.classicAndroid}-in-Jetpack-Compose`,
      component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
      context: {
        classicAndroid: element.classicAndroid,
        iftttArray: iftttArrray,
      },
    });

    createPage({
      path: `${element.classicAndroid}`,
      component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
      context: {
        classicAndroid: element.classicAndroid,
        iftttArray: iftttArrray,
      },
    });
  });

  createPage({
    path: "/",
    component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
    context: {
      iftttArray: iftttArrray,
    },
  });

  // This is called when you clear out the selection using the 'x' in the text field.
  createPage({
    path: `What-is-the-equivalent-of--in-Jetpack-Compose`,
    component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
    context: {
      iftttArray: iftttArrray,
    },
  });

  /* FAQ Page Generation */
  const qnaResult = await graphql(`
    {
      allQnaJson {
        edges {
          node {
            question
            answer
          }
        }
      }
    }
  `);

  let qnaArray = qnaResult.data.allQnaJson.edges.map((edges) => {
    return edges.node;
  });

  createPage({
    path: "/faq",
    component: require.resolve("./src/components/faq/FAQ.tsx"),
    context: {
      qnaArray: qnaArray,
    },
  });

  /* Quick Bites */
  createPage({
    path: "/quick-bites",
    component: require.resolve("./src/components/quickbites/QuickBites.tsx"),
  });

  /* Compose Marketplace */
  const componentsResult = await graphql(`
    {
      allComponentsJson {
        edges {
          node {
            id
            title
            description
            contributorName
            url
            imageUrl
            categories
          }
        }
      }
    }
  `);

  let queryString = "";
  componentsResult.data.allComponentsJson.edges.forEach((edge) => {
    const element = edge.node;

    const url = element.url;
    const parsedGithubResult = githubParser(url);
    if (parsedGithubResult) {
      queryString +=
        "repo:" +
        parsedGithubResult.owner +
        "/" +
        parsedGithubResult.name +
        " ";
    }
  });

  const githubResult = await graphql(
    `
      query getStarCount($queryString: String!) {
        github {
          rateLimit {
            cost
            remaining
            resetAt
          }
          search(query: $queryString, type: REPOSITORY, first: 100) {
            edges {
              node {
                ... on GitHub_Repository {
                  name
                  url
                  owner {
                    avatarUrl
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    `,
    { queryString: queryString }
  );

  let githubResultMap = new Map();
  githubResult.data.github.search.edges.forEach((edge) => {
    const element = edge.node;
    githubResultMap[element.url] = element;
  });

  let componentsArray = componentsResult.data.allComponentsJson.edges.map(
    (edges) => {
      return edges.node;
    }
  );

  createPage({
    path: `wip`,
    component: require.resolve(
      "./src/components/wip/ComponentPreviewCardsSection.tsx"
    ),
    context: {
      componentsArray: componentsArray,
      githubMap: githubResultMap,
    },
  });
};
