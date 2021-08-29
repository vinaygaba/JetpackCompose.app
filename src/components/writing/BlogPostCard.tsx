import './blogpost.css'
import { makeStyles } from "@material-ui/core/styles";
import React from "react";


interface BlogPostCardProps {
    title: string,
    description?: string,
    date?: string,
    tags?:[string]
}

export default function BlogPostCard(props: BlogPostCardProps) {
    const classes = useStyles();
    return (
        <>
            <div className={classes.title}>{props.title}</div>
            <div className={classes.description}>{props.description}</div>
        </>
    );
}

const useStyles = makeStyles({
    title: {
        fontSize: 28,
        fontFamily: "Merriweather",
        fontWeight: 'bold',
        color: "#222",
        // margin-top: 64px;
        // margin-bottom: 16px;
        // font-family: 'Merriweather';
        // font-weight: 900;
        // color: #222222;
        // text-rendering: optimizeLegibility;
    },
    description: {
        fontSize: 16,
        fontFamily: "Merriweather",
        fontWeight: 400,
        color: "#222",
        marginBottom: 32,
        marginTop: 16
    },
});