import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

import jsPDF from "jspdf";

export default function DialogProfessor(props) {
  const [role, setRole] = React.useState("");
  const handleRole = event => {
    setRole(event.target.value);
  };

  const reportes = ["Reporte 1", "Reporte 2", "Reporte 3", "Ultimo reporte"];
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/getReports").then(async data => {
      const reports = await data.json();
      console.log(reports.data);
      setUsers(reports.data);
    });
  }, []);

  const downloadPDF = () => {
    var doc = new jsPDF();

    let contenido = "";
    doc.text("Reportes", 20, 20);
    users.forEach(user => {
      contenido += `Nombre: ${user.name}\nHoras:${user.hours}\nDia:${user.day}\nFecha:${user.date}\n\n`;
    });
    doc.text(contenido, 15, 30);
    doc.save("reporte.pdf");
    props.close();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Generar Reporte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecciona uno de los siguientes reportes semanales
          </DialogContentText>
          <TextField
            id="filled-select-currency"
            select
            label="Buscar Reporte Semanal"
            margin="normal"
            fullWidth
            variant="filled"
            value={role}
            onChange={handleRole}
          >
            {reportes.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => downloadPDF()}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
