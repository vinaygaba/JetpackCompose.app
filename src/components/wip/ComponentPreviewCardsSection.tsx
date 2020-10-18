import { ComponentPreviewCard } from "./ComponentPreviewCard";
import ComponentsSearchBar from "./ComponentsSearchBar";
// import ComponentPreviewCardMetadata from "../../models/ComponentPreviewCardMetadata";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../core/NavigationBar";
import { RouteComponentProps } from "@reach/router";
import React, { useState, useEffect } from "react";

export interface ComponentPreviewCardsSectionProps extends RouteComponentProps {
  pageContext: {
    componentsArray: [
      {
        id: string;
        title: string;
        description: string;
        contributorName: string;
        url: string;
        imageUrl: string;
        categories: string[];
      }
    ];
  };
}

export default function ComponentPreviewCardsSection(
  props: ComponentPreviewCardsSectionProps
) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState<string[]>([]);

  return (
    <>
      <NavigationBar />
      <div className={classes.root}>
        {/* <Typography variant="h6" className={classes.title} noWrap={true}>
        {props.sectionTitle}
      </Typography> */}
        <Container maxWidth="lg">
          <Grid container className={classes.grid} spacing={2}>
            <Grid item xs={12} className={classes.searchBar}>
              <ComponentsSearchBar onChangeHandler={setSearchQuery} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={7}>
                {props.pageContext.componentsArray
                  .filter((element, index, array) =>
                    meetsSearchCriteria(element, index, array, searchQuery)
                  )
                  .map((metadata) => (
                    <Grid key={metadata.id} item>
                      <ComponentPreviewCard
                        title={metadata.title}
                        contributor={metadata.contributorName}
                        imageUrl={metadata.imageUrl}
                        resourceLink={metadata.url}
                        description={metadata.description}
                        categories={metadata.categories}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

function meetsSearchCriteria(
  element: any,
  index: number,
  array: any[],
  searchQuery: string[]
): boolean {
  return (
    searchQuery.length === 0 ||
    element.categories.filter((value: string) => searchQuery.includes(value))
      .length > 0
  );
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#FAFAFA",
    paddingLeft: "16px",
    paddingRight: "16px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    paddingTop: "1%",
  },
  title: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  searchBar: {},
});
