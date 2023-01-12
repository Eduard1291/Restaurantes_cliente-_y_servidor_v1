package com.conexion;

import com.modelo.Menu;
import com.modelo.MenusDeRestaurantes;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ConexionMenusRestaurantes {
    private String Url =
            "jdbc:sqlserver://localhost:52579;"
                    + "databaseName=prueba_tecnica;"
                    + "user=eduard;"
                    + "password=123456789;"
                    +"TrustServerCertificate=True;";
    //comando para consltar los registro de la tabla Menus de la base de datos
    private String consulta= "select * from Menus_Restaurantes where RazonSocial='";

    //establece la conexion con la base de datos
    private Connection conexion;
    //permite enviar consultas a la base de datos
    private Statement instruccion;
    // permite enviar comando a la base de datos
    private PreparedStatement preinstruccion;
    public ConexionMenusRestaurantes(){
        try {
            conexion= DriverManager.getConnection(Url);
            instruccion=conexion.createStatement();
        }catch (Exception e){
            System.out.println("ERROR AL ESTABLECER CONEXION CON LA BASE DE DATOS DE RELACION MENUS-RESTAURANTES");
        }
    }
    //inserta un registro nuevo en la base de datos
    public void save(MenusDeRestaurantes targetMenuRestaurante){
        String comandoInsert="INSERT INTO Menus_Restaurantes values ('"+targetMenuRestaurante.getNombreMenu()+"','"+targetMenuRestaurante.getRazonSocial()+"')";
        try {
            //cargamos la instruccion
            preinstruccion=conexion.prepareStatement(comandoInsert);
            //ejecitamos la instruccion
            preinstruccion.execute();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    //elimina un registro en la base de datos
    public void delete(MenusDeRestaurantes target ){
        String comandoDelete="delete from Menus_Restaurantes where NombreMenu='"+target.getNombreMenu()+"' and RazonSocial='"+target.getRazonSocial()+"'";
        try {
            //cargamos la instruccion
            preinstruccion=conexion.prepareStatement(comandoDelete);
            //ejecitamos la instruccion
            preinstruccion.execute();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
    // retorna los registros de los menus que coincidan con los restaurantes
    public List<Menu> getMenusRestaurantes(String RazonSocial){
        String consultaMenus="select * from Menus where NombreMenu in (";
        List<MenusDeRestaurantes> registrosMenuRestaurante=new ArrayList<>();
        List<Menu> registrosMenus=new ArrayList<>();
        try {
            ResultSet registros=instruccion.executeQuery(consulta+RazonSocial+"'");
            while (registros.next()){
                registrosMenuRestaurante.add(new MenusDeRestaurantes(registros.getString(1),registros.getString(2)));
            }
            for (int i=0;i<registrosMenuRestaurante.size();i++){
                consultaMenus+="'"+registrosMenuRestaurante.get(i).getNombreMenu();
                if (i<registrosMenuRestaurante.size()-1){
                    consultaMenus+="',";
                }
            }
            if (registrosMenuRestaurante.size()==0){
                consultaMenus+="'')";
            }else{
                consultaMenus+="')";
            }

            ResultSet registrosListasMenus=instruccion.executeQuery(consultaMenus);
            while (registrosListasMenus.next()){
                registrosMenus.add(new Menu(registrosListasMenus.getInt(1),registrosListasMenus.getString(2), registrosListasMenus.getFloat(3)));
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return registrosMenus;
    }
    //devuelve una lista con los menus no asociados a un restaurante
    public List<Menu> getMenusRestaurantesDiferentes(String RazonSocial){
        String consultaMenus="select * from Menus where NombreMenu !='";
        List<Menu> registrosMenus=new ArrayList<>();
        List<String> menus=new ArrayList<>();
        try {
            ResultSet registrosmenus=instruccion.executeQuery(consulta+RazonSocial+"'");
            while (registrosmenus.next()){
                menus.add(registrosmenus.getString(1));
            }

            for (int i=0;i<menus.size();i++){
                consultaMenus+="' and NombreMenu !='"+menus.get(i);

            }
            consultaMenus+="'";
            ResultSet registrosListasMenus=instruccion.executeQuery(consultaMenus);
            while (registrosListasMenus.next()){
                registrosMenus.add(new Menu(registrosListasMenus.getInt(1),registrosListasMenus.getString(2), registrosListasMenus.getFloat(3)));
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return registrosMenus;
    }
}
