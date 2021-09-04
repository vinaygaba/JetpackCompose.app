import "./articlePost.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { StringLiteralLike } from "typescript";

interface ArticleCardProps {
  title: string;
  imageUrl: string;
  description: string;
  date: string;
  tags?: [string];
}

export default function ArticleCard(props: ArticleCardProps) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardMedia className={classes.cardMedia} image={props.imageUrl} />
        <CardContent>
          <div className={classes.date}>{props.date}</div>
          <div className={classes.title}>{props.title}</div>
          <div className={classes.description}>{props.description}</div>
        </CardContent>
      </Card>
    </>
  );
}

const useStyles = makeStyles({
  card: {
    borderRadius: 12,
    width: "100%",
  },
  cardMedia: {
    height: 0,
    paddingTop: "60%", // 16:9
  },
  title: {
    fontSize: 28,
    fontFamily: "Nunito Sans",
    fontWeight: "bolder",
    color: "#222",
    marginTop: 8,
  },
  description: {
    fontSize: 18,
    fontFamily: "Nunito Sans",
    fontWeight: 400,
    color: "#222",
    marginTop: 20,
  },
  date: {
    fontSize: 14,
    fontFamily: "Merriweather",
    fontWeight: 100,
    color: "#444444",
  },
});
