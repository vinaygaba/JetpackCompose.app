import Card from "@material-ui/core/Card";
import { ComponentPreviewCard } from "./ComponentPreviewCard";
import ComponentPreviewCardMetadata from "../models/ComponentPreviewCardMetadata";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";

export interface ComponentPreviewCardsSectionProps {
  sectionTitle: string;
  metadataArray: Array<ComponentPreviewCardMetadata>;
}

export const ComponentPreviewCardsSection: FunctionComponent<ComponentPreviewCardsSectionProps> = (
  props
) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Typography variant="h6" className={classes.title} noWrap={true}>
        {props.sectionTitle}
      </Typography> */}
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={2}>
            {props.metadataArray.map((metadata) => (
              <Grid key={metadata.id} item>
                <ComponentPreviewCard
                  title={metadata.contributionTitle}
                  contributor={metadata.contributor}
                  imageUrl={metadata.contributionPreviewImageUrl}
                  resourceLink={metadata.contributionLink}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ccff90",
    paddingLeft: "16px",
    paddingRight: "16px", 
    alignContent: "center"
  },
  grid: {
    paddingTop: "1%",
  },
  title: {
    marginBottom: 0,
    paddingBottom: 0,
  },
});
