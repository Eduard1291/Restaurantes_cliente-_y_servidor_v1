package com.modelo;



public class Menu {

    private int TipoMenu;
    private String NombreMenu;
    private float Precio;

    public Menu( int tipoMenu, String nombreMenu, float precio) {
        TipoMenu = tipoMenu;
        NombreMenu = nombreMenu;
        Precio = precio;
    }


    public int getTipoMenu() {
        return TipoMenu;
    }

    public String getNombreMenu() {
        return NombreMenu;
    }

    public float getPrecio() {
        return Precio;
    }
}
