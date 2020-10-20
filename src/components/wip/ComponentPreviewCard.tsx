import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import StarBorderRounded from "@material-ui/icons/StarBorderRounded";
import { makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";

export interface ComponentPreviewCardProps {
  title: string;
  contributor: string;
  imageUrl: string;
  resourceLink: string;
  description: string;
  categories: string[];
  githubStars?: number;
}

export const ComponentPreviewCard: FunctionComponent<ComponentPreviewCardProps> = (
  props
) => {
  const classes = useStyles();
  return (
    <>
      <Card
        className={classes.root}
        onClick={() => {
          window.open(props.resourceLink, "_blank");
        }}
      >
        <CardMedia image={props.imageUrl} className={classes.media} />
        <CardContent className={classes.cardContent}>
          <Grid
            container
            className={classes.cardContentGrid}
            wrap="nowrap"
            direction="column"
          >
            <Grid item className={classes.cardTitleGrid}>
              <Grid container className={classes.cardContentGrid} wrap="nowrap">
                <Grid item xs={10}>
                  <Typography className={classes.cardTitle}>
                    {props.title}
                  </Typography>
                </Grid>
                {props.githubStars ? (
                  <Grid item xs={2} className={classes.starGridRow}>
                    <StarBorderRounded
                      className={classes.starIcon}
                      fontSize="small"
                    />
                    <span className={classes.starText}>
                      {props.githubStars}
                    </span>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid item className={classes.cardTitleGrid}>
              <Typography className={classes.cardSubtitle}>
                {props.description}
              </Typography>
            </Grid>
            <Grid item className={classes.cardChipGrid}>
              {props.categories.map((element) => (
                <span className={classes.chip}>{element}</span>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    "&:hover": {
      cursor: "pointer",
    },
  },
  media: {
    height: 0,
    paddingTop: "177%", // 16:9
  },
  cardContent: {},
  cardContentGrid: {
    width: "100%",
  },
  cardTitleGrid: {
    display: "inline-flex",
    verticalAlign: "middle",
  },
  cardChipGrid: {
    marginTop: "2%",
    display: "block!important" as "block",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Playfair Display",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  cardSubtitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#586069",
  },
  chip: {
    color: "#FFFFFF",
    backgroundColor: "#81c1eb",
    padding: "2%",
    borderRadius: "5px",
    float: "left",
    marginTop: "2%",
    "&:first-child": {
      marginLeft: "0",
    },
    "&:not(:first-child)": {
      marginLeft: "4px",
    },
  },
  starGridRow: {
    display: "inline-flex",
    verticalAlign: "middle",
  },
  starIcon: {
    color: "#586069",
  },
  starText: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#586069",
    display: "flex",
    verticalAlign: "middle",
  },
});
