exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const iftttElement = require("./src/data/ifttt.json");

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

  createPage({
    path: "/faq",
    component: require.resolve("./src/components/faq/FAQ.tsx"),
  });
  createPage({
    path: "/quick-bites", 
    component: require.resolve("./src/components/quickbites/QuickBites.tsx"),
  });

  iftttResult.data.allIftttJson.edges.forEach((edges) => {
    const element = edges.node;
    createPage({
      path: `What-is-the-equivalent-of-${element.classicAndroid}-in-Jetpack-Compose`,
      component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
      context: {
        classicAndroid: element.classicAndroid,
        compose: element.compose,
        exampleUrl: element.exampleUrl,
        documentationUrl: element.documentationUrl,
      },
    });

    createPage({
      path: `${element.classicAndroid}`,
      component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
      context: {
        classicAndroid: element.classicAndroid,
        compose: element.compose,
        exampleUrl: element.exampleUrl,
        documentationUrl: element.documentationUrl,
      },
    });
  });

  createPage({
    path: "/",
    component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
  });

  // This is called when you clear out the selection using the 'x' in the text field.
  createPage({
    path: `What-is-the-equivalent-of--in-Jetpack-Compose`,
    component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
  });
};
