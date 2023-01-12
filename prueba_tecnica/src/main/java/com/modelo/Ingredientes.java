package com.modelo;

public class Ingredientes {
    private int idIngredientes;
    private String NombreMenu;
    private String NombreIngrediente;
    private int Caloria;

    public Ingredientes(int idIngredientes, String nombreMenu, String nombreIngrediente, int caloria) {
        this.idIngredientes = idIngredientes;
        this.NombreMenu = nombreMenu;
        NombreIngrediente = nombreIngrediente;
        Caloria = caloria;
    }

    public String getNombreMenu() {
        return NombreMenu;
    }

    public String getNombreIngrediente() {
        return NombreIngrediente;
    }

    public int getCaloria() {
        return Caloria;
    }

    public int getIdIngredientes() {
        return idIngredientes;
    }
}
