import React from "react";

// import Button from "../components/RoundedButton";
// import InputText from "../components/InputText";
// import Card from "../components/LoginCard";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useHistory } from "react-router-dom";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  let history = useHistory();

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const signIn = async () => {
    console.log(username);
    console.log(password);
    await fetch("http://localhost:3001/api/getUser", {
      username: username,
      password: password
    }).then(async data => {
      const response = await data.json();
      if (response.success) {
        console.log(response.data);
        history.push("/home");
      } else {
        console.log("Fail");
      }
    });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Usuario"
                  name="email"
                  autoComplete="email"
                  value={username}
                  onChange={handleUsername}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePassword}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={async () => await signIn()}
            >
              Entrar
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
