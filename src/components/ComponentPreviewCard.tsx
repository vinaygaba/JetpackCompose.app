import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";

export interface ComponentPreviewCardProps {
  title: string;
  contributor: string;
  imageUrl: string;
  resourceLink: string;
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
          // window.open(props.resourceLink, "_blank");
        }}
      >
        <CardMedia image={props.imageUrl} className={classes.media} />
      </Card>
      <Typography variant="body1" className={classes.title} noWrap={true} align="center">
        {props.title}
      </Typography>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    width: 350,
    "&:hover": {
      cursor: "pointer",
    },
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  title: {
    fontSize: 14,
    textOverflow: "ellipsis",
  },
});
