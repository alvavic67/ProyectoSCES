package com.example.qrmata.Models;

public class Contact {

    public String Nombre;

    public Contact(String nombre, String contra) {
        this.Nombre = nombre;
        this.Contra = contra;
    }

    public String Contra;

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        this.Nombre = nombre;
    }

    public String getContra() {
        return Contra;
    }

    public void setContra(String contra) {
        this.Contra = contra;
    }
}
