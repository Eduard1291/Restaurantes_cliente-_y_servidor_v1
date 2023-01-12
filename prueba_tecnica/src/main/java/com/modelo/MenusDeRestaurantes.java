package com.modelo;

public class MenusDeRestaurantes {
    private String NombreMenu;
    private String RazonSocial;

    public MenusDeRestaurantes(String nombreMenu, String razonSocial) {
        this.NombreMenu = nombreMenu;
        this.RazonSocial = razonSocial;
    }

    public String getNombreMenu() {
        return NombreMenu;
    }

    public String getRazonSocial() {
        return RazonSocial;
    }
}
