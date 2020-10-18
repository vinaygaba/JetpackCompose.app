exports.createPages = async ({ actions: { createPage }, graphql }) => {
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

  let qnaArray = qnaResult.data.allQnaJson.edges.map((edges) => {
    return edges.node;
  });

  let componentsArray = componentsResult.data.allComponentsJson.edges.map(
    (edges) => {
      return edges.node;
    }
  );

  createPage({
    path: "/faq",
    component: require.resolve("./src/components/faq/FAQ.tsx"),
    context: {
      qnaArray: qnaArray,
    },
  });
  createPage({
    path: "/quick-bites",
    component: require.resolve("./src/components/quickbites/QuickBites.tsx"),
  });

  createPage({
    path: "/",
    component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
    context: {
      iftttArray: iftttArrray,
    },
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

  createPage({
    path: `wip`,
    component: require.resolve(
      "./src/components/wip/ComponentPreviewCardsSection.tsx"
    ),
    context: {
      componentsArray: componentsArray,
    },
  });
};
