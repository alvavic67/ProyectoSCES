import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function ContainedButtons(props) {
  return (
    <Button variant="contained" color={props.color} onClick={props.onClick}>
      {props.value}
    </Button>
  );
}
