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

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    display: "center",
    justifyContent: "center"
  },
  rightDiv: {
    position: "absolute",
    alignItems: "right",
    align: "right",
    margin: theme.spacing(2, 0, 2),
    paddingLeft: "150px",
    overflow: "auto"
  },
  leftDiv: {
    alignItems: "left",
    paddingLeft: "25px",
    borderRadius: "10px",
    paddingTop: "25px"
  }
}));

export default function Main() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/getListUsers").then(async data => {
      const users = await data.json();
      setUsuarios(users.data);
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickCancel = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item lg={6} className={classes.leftDiv}>
            <Map className="item-map" />
          </Grid>
          <Grid item lg={6} className={classes.rightDiv}>
            <Button onClick={() => handleClickOpen()}>Generar Reporte</Button>
            <Button>Cerrar Sesion</Button>
            <List title="Usuarios" className="item-lista" usuarios={usuarios} />
          </Grid>
        </Grid>
        <DialogoReporte open={open} close={handleClickCancel} />
      </Container>
    </div>
  );
}
