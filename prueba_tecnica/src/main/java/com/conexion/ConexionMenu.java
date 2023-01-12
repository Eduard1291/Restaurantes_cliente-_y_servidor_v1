package com.conexion;

import com.modelo.Menu;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ConexionMenu {
    //contiene las comfigraciones necesarias para establecer una conexion con la base de datos
    private String Url =
            "jdbc:sqlserver://localhost:52579;"
                    + "databaseName=prueba_tecnica;"
                    + "user=eduard;"
                    + "password=123456789;"
                    +"TrustServerCertificate=True;";
    //comando para consltar los registro de la tabla Menus de la base de datos
    private String consulta= "select * from Menus";
    //comando para consultar un solo menu
    private String consultaunica="select * from Menus where NombreMenu='";
    //establece la conexion con la base de datos
    private Connection conexion;
    //permite enviar consultas a la base de datos
    private Statement instruccion;
    // permite enviar comando a la base de datos
    private PreparedStatement preinstruccion;
    public ConexionMenu(){
        try {
            //establecemos una conexion con la base de datos
            conexion= DriverManager.getConnection(Url);
            instruccion=conexion.createStatement();
        }catch (Exception e){
            System.out.println("ERROR AL ESTABLECER CONEXION CON LA BASE DE DATOS MENUS");
        }
    }
    //inserta un registro nuevo en la base de datos
    public int save(Menu targetMenu){
        String comandoInsert="INSERT INTO Menus values ("+targetMenu.getTipoMenu()+",'"+targetMenu.getNombreMenu()+"',"+targetMenu.getPrecio()+")";
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
    public void update(Menu targetMenu, String nombreMenu){
        String comandoUpdate ="UPDATE Menus SET TipoMenu="+targetMenu.getTipoMenu()
                +",NombreMenu='" +targetMenu.getNombreMenu()
                +"',Precio="+targetMenu.getPrecio()
                +" WHERE NombreMenu='" +nombreMenu+"'";
        String updateingredientes="update Igredientes_Menus set NombreMenu='"+targetMenu.getNombreMenu()+"' where NombreMenu='"+nombreMenu+"'";
        String pdateRestaurantesMenus="update Menus_Restaurantes set NombreMenu='"+targetMenu.getNombreMenu()+"' where NombreMenu='"+nombreMenu+"'";
        try {
            //actalisamos en la tabla de ingredientes
            preinstruccion=conexion.prepareStatement(updateingredientes);
            preinstruccion.execute();
            //actualizamos en la taba de relacion de restarantes y menus
            preinstruccion=conexion.prepareStatement(pdateRestaurantesMenus);
            preinstruccion.execute();
            //cargamos la instruccion para actualizar la tabla menus
            preinstruccion=conexion.prepareStatement(comandoUpdate);
            //ejecitamos la instruccion
            preinstruccion.execute();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
    //elimina un registro en la base de datos
    public void delete(Menu targetMenu){
        //comando para eliminar de la tabla menu
        String comandoDelete="DELETE FROM Menus WHERE NombreMenu='"+targetMenu.getNombreMenu()+"'";
        //comando para eliminar de la tabla menu_ingredientes
        String comandoDeleteMenu_Ingredientes="DELETE FROM Igredientes_Menus WHERE NombreMenu='"+targetMenu.getNombreMenu()+"'";
        //comando para eliminar de la tabla menus_restaurante
        String comandoDeleteMenus_Restaurantes="DELETE FROM Menus_Restaurantes WHERE NombreMenu='"+targetMenu.getNombreMenu()+"'";
        try {
            //cargamos la instruccion
            preinstruccion=conexion.prepareStatement(comandoDeleteMenu_Ingredientes);
            //ejecitamos la instruccion
            preinstruccion.execute();
            //cargamos la instruccion
            preinstruccion=conexion.prepareStatement(comandoDeleteMenus_Restaurantes);
            //ejecitamos la instruccion
            preinstruccion.execute();
            //cargamos la instruccion
            preinstruccion=conexion.prepareStatement(comandoDelete);
            //ejecitamos la instruccion
            preinstruccion.execute();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
    // retorna los registros de los menus
    public List<Menu> get(){
        List<Menu> registrosMenus=new ArrayList<>();
        try {
            ResultSet registros=instruccion.executeQuery(consulta);
            while (registros.next()){
                registrosMenus.add(new Menu(registros.getInt(1),registros.getString(2), registros.getFloat(3)));
            }

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return registrosMenus;
    }
    //devuelve un de acuerdo al nombre del menu
    public Menu get(String nombreMenu){
        try {
            ResultSet registros=instruccion.executeQuery(consultaunica+nombreMenu+"'");
            registros.next();
            Menu nuevoMenu=new Menu(registros.getInt(1),registros.getString(2), registros.getFloat(3));
            return nuevoMenu;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

}
