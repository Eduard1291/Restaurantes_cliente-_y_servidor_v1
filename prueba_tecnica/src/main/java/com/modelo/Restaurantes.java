package com.modelo;

public class Restaurantes {
    private String RazonSocial;
    private String NombreComercial;
    private int TipoRestaurante;
    private String Ciudad;
    private String HoraApertura;
    private String HoraCierre;

    public Restaurantes( String razonSocial, String nombreComercial, int tipoRestaurante, String ciudad, String horaApertura, String horaCierre) {

        RazonSocial = razonSocial;
        NombreComercial = nombreComercial;
        TipoRestaurante = tipoRestaurante;
        Ciudad = ciudad;
        HoraApertura = horaApertura;
        HoraCierre = horaCierre;
    }


    public String getRazonSocial() {
        return RazonSocial;
    }

    public String getNombreComercial() {
        return NombreComercial;
    }

    public int getTipoRestaurante() {
        return TipoRestaurante;
    }

    public String getCiudad() {
        return Ciudad;
    }

    public String getHoraApertura() {
        return HoraApertura;
    }

    public String getHoraCierre() {
        return HoraCierre;
    }
}
