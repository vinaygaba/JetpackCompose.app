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
      allFaqJson {
        edges {
          node {
            question
            answer
          }
        }
      }
    }
  `);

  let qnaArray = qnaResult.data.allFaqJson.edges.map((edges) => {
    return edges.node;
  });

  qnaArray.map((qna) => {
    const question = String(qna.question);
    // Get rid of the question mark and replace spaces with "-"
    const normalizedQuestion = question.replace(/\?/g, "").replace(/ /g, "-");

    createPage({
      path: `/${normalizedQuestion}`,
      component: require.resolve("./src/components/faq/FAQ.tsx"),
      context: {
        qnaArray: qnaArray,
        lastUpdateDate: new Date().toISOString().slice(0, 10),
        currentQnA: qna,
      },
    });
  });

  createPage({
    path: "/faq",
    component: require.resolve("./src/components/faq/FAQ.tsx"),
    context: {
      qnaArray: qnaArray,
      lastUpdateDate: new Date().toISOString().slice(0, 10),
      currentQnA: null,
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
      allCatalogJson {
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
  componentsResult.data.allCatalogJson.edges.forEach((edge) => {
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

  let componentsArray = componentsResult.data.allCatalogJson.edges.map(
    (edges) => {
      return edges.node;
    }
  );

  createPage({
    path: `compose-catalog`,
    component: require.resolve(
      "./src/components/catalog/ComponentPreviewCardsSection.tsx"
    ),
    context: {
      componentsArray: componentsArray,
      githubMap: githubResultMap,
    },
  });

  createPage({
    path: "/",
    component: require.resolve(
      "./src/components/catalog/ComponentPreviewCardsSection.tsx"
    ),
    context: {
      componentsArray: componentsArray,
      githubMap: githubResultMap,
    },
  });

  /* Writing Page Generation */
  createPage({
    path: "/writing",
    component: require.resolve("./src/components/writing/Writing.tsx"),
  });
};
