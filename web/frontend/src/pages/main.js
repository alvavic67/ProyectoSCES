import React, { useEffect, useState } from "react";

import Map from "../components/Map";
//import Button from "../components/Button";
import List from "../components/List";
import DialogoReporte from "../components/DialogoReporte";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";
import { useHistory } from "react-router-dom";

import * as config from "../config";
import "firebase/firestore";
const db = config.app.firestore();

const useStyles = makeStyles(theme => ({
  root: {
    // height: "800px",
    // width: "1280px",
    display: "center",
    justifyContent: "center"
  },
  rightDiv: {
    position: "absolute",
    alignItems: "left",
    align: "right",
    margin: theme.spacing(2, 10, 2),
    paddingLeft: "700px"
  },
  leftDiv: {
    alignItems: "right",
    paddingLeft: "25px",
    borderRadius: "10px",
    paddingTop: "25px"
  }
}));

export default function Main() {
  const [usuarios, setUsuarios] = useState([]);
  let history = useHistory();

  useEffect(async () => {
    // fetch("http://localhost:3001/api/getListUsers").then(async data => {
    //   const users = await data.json();
    //   setUsuarios(users.data);
    // });

    var response = await db
      .collection("usuarios")
      .get()
      .then(snapshot => snapshot.docs.map(doc => doc.data().usuario));
    console.log(response);
    setUsuarios(response);
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickCancel = () => {
    setOpen(false);
  };

  const logOut = () => {
    history.push("/");
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1 style={{ paddingLeft: "60px" }}>Dashboard</h1>
      <Container maxWidth="lg">
        <Grid container>
          <Grid
            style={{ paddingTop: "80px" }}
            item
            lg={6}
            sm={6}
            xs={6}
            className={classes.leftDiv}
          >
            <Map className="item-map" />
          </Grid>
          <Grid item className={classes.rightDiv}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleClickOpen()}
            >
              Generar Reporte
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => logOut()}
            >
              Cerrar Sesion
            </Button>
            <List
              style={{ backgroundColor: "red" }}
              title="Usuarios"
              className="item-lista"
              usuarios={usuarios}
            />
          </Grid>
        </Grid>
        <DialogoReporte open={open} close={handleClickCancel} />
      </Container>
    </div>
  );
}
