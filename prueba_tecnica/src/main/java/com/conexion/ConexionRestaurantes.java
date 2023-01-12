package com.conexion;

import com.modelo.Menu;
import com.modelo.Restaurantes;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ConexionRestaurantes {
    //contiene las comfigraciones necesarias para establecer una conexion con la base de datos
    private String Url =
            "jdbc:sqlserver://localhost:52579;"
                    + "databaseName=prueba_tecnica;"
                    + "user=eduard;"
                    + "password=123456789;"
                    +"TrustServerCertificate=True;";

    private String consultaunica="select * from Restaurantes where RazonSocial='";
    //comando para consltar los registro de la tabla Menus de la base de datos
    private String consulta= "select * from Restaurantes";
    //establece la conexion con la base de datos
    private Connection conexion;
    //permite enviar consultas a la base de datos
    private Statement instruccion;
    // permite enviar comando a la base de datos
    private PreparedStatement preinstruccion;
    public ConexionRestaurantes(){
        try {
            conexion= DriverManager.getConnection(Url);
            instruccion=conexion.createStatement();
        }catch (Exception e){
            System.out.println("ERROR AL ESTABLECER CONEXION CON LA BASE DE DATOS DE RESTAURANTES");
        }
    }
    //inserta un registro nuevo en la base de datos
    public int save(Restaurantes targetRestaurante){
        String comandoInsert="INSERT INTO Restaurantes values ('"+targetRestaurante.getRazonSocial()
                +"','"+targetRestaurante.getNombreComercial()+"',"+targetRestaurante.getTipoRestaurante()+",'"+
                targetRestaurante.getCiudad()+"','"+targetRestaurante.getHoraApertura()+"','"+
                targetRestaurante.getHoraCierre()+"')";
        try {
            //cargamos la instruccion
            preinstruccion=conexion.prepareStatement(comandoInsert);
            //ejecitamos la instruccion
            preinstruccion.execute();
            return 1;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return 0;
        }
    }
    //modifica informacion un registro existentes
    public void update(Restaurantes targetRestaurante,String RazonSocial){
        String comandoUpdate ="UPDATE Restaurantes SET RazonSocial='"+targetRestaurante.getRazonSocial()
                +"',NombreComercial='" +targetRestaurante.getNombreComercial()
                +"',TipoRestaurante="+targetRestaurante.getTipoRestaurante()+
                ",Ciudad='"+targetRestaurante.getCiudad()+
                "',HoraApertura='"+targetRestaurante.getHoraApertura()+
                "',HoraCierre='"+targetRestaurante.getHoraCierre()
                +"'WHERE RazonSocial='" +RazonSocial+"'";
        String comandoUpdateMenusRestaurantes="UPDATE Menus_Restaurantes SET RazonSocial='"+targetRestaurante.getRazonSocial()
                +"'WHERE RazonSocial='" +RazonSocial+"'";
        try {
            //cargamos la instruccion de actualizar datos de la tabla menus_restaurantes
            preinstruccion=conexion.prepareStatement(comandoUpdateMenusRestaurantes);
            //ejecitamos la instruccion
            preinstruccion.execute();
            //cargamos la instruccion
            preinstruccion=conexion.prepareStatement(comandoUpdate);
            //ejecitamos la instruccion
            preinstruccion.execute();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
    //elimina un registro en la base de datos
    public void delete(Restaurantes targetRestaurante){
        String comandoDelete="DELETE FROM Restaurantes WHERE RazonSocial='"+targetRestaurante.getRazonSocial()+"'";
        String comandoDeleteMenusRestaurante="DELETE FROM Menus_Restaurantes WHERE RazonSocial='"+targetRestaurante.getRazonSocial()+"'";
        try {
            //cargamos la instruccion para eliminar un registro de la tabla menu_restaurantes
            preinstruccion=conexion.prepareStatement(comandoDeleteMenusRestaurante);
            //ejecitamos la instruccion
            preinstruccion.execute();
            //cargamos la instruccion para eliminar un registro de la tabla restaurantes
            preinstruccion=conexion.prepareStatement(comandoDelete);
            //ejecitamos la instruccion
            preinstruccion.execute();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
    // retorna los registros de los menus
    public List<Restaurantes> get(){
        List<Restaurantes> registrosRestaurantes=new ArrayList<>();
        try {
            ResultSet registros=instruccion.executeQuery(consulta);
            while (registros.next()){
                registrosRestaurantes.add(new Restaurantes(registros.getString(1),registros.getString(2),registros.getInt(3),
                        registros.getString(4),registros.getString(5),registros.getString(6)));
            }

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return registrosRestaurantes;
    }
    //devuelve un registro de la tabla restaurante dependiendo de la razon social
    public Restaurantes get(String nombreRestaurante){
        try {
            ResultSet registros=instruccion.executeQuery(consultaunica+nombreRestaurante+"'");
            registros.next();
            Restaurantes nuevoRestaurante=new Restaurantes(registros.getString(1),registros.getString(2),registros.getInt(3),
                    registros.getString(4),registros.getString(5),registros.getString(6));
            return nuevoRestaurante;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
}
