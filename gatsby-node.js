exports.createPages = ({ actions: { createPage } }) => {
  const iftttElement = require("./src/data/ifttt.json");
  const classicAndroidKeys = iftttElement.map(
    (element) => element.classicAndroid
  );
  const composeKeys = iftttElement.map((element) => element.compose);

  createPage({
    path: "/faq",
    component: require.resolve("./src/components/faq/FAQ.tsx"),
  });
  createPage({
    path: "/quick-bites",
    component: require.resolve("./src/components/quickbites/QuickBites.tsx"),
  });

  iftttElement.forEach((element) => {
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
  createPage({
    path: `What-is-the-equivalent-of--in-Jetpack-Compose`,
    component: require.resolve("./src/components/ifttt/IfThisThenThat.tsx"),
  });
};
