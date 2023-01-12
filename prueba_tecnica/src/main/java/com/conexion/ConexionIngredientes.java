package com.conexion;

import com.modelo.Ingredientes;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ConexionIngredientes {
    private String Url =
            "jdbc:sqlserver://localhost:52579;"
                    + "databaseName=prueba_tecnica;"
                    + "user=eduard;"
                    + "password=123456789;"
                    +"TrustServerCertificate=True;";
    //comando para consltar los registro de la tabla Menus de la base de datos
    private String consulta= "select * from Igredientes_Menus where NombreMenu=";
    //establece la conexion con la base de datos
    private Connection conexion;
    //permite enviar consultas a la base de datos
    private Statement instruccion;
    // permite enviar comando a la base de datos
    private PreparedStatement preinstruccion;
    public ConexionIngredientes(){
        try {
            conexion= DriverManager.getConnection(Url);
            instruccion=conexion.createStatement();
        }catch (Exception e){
            System.out.println("ERROR AL ESTABLECER CONEXION CON LA BASE DE DATOS DELOS INGREDIENTES");
        }
    }
    //inserta un registro nuevo en la base de datos
    public int save(Ingredientes targetIngrediente){
        String comandoInsert="INSERT INTO Igredientes_Menus values ('"+targetIngrediente.getNombreMenu()+"','"+targetIngrediente.getNombreIngrediente()+"',"+targetIngrediente.getCaloria()+")";
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
    public void update(Ingredientes targetIngrediente){
        String comandoUpdate ="UPDATE Igredientes_Menus SET NombreIngrediente='"+targetIngrediente.getNombreIngrediente()
                +"',Caloria=" +targetIngrediente.getCaloria()
                +"WHERE idIngredientes=" +targetIngrediente.getIdIngredientes();
        try {
            //cargamos la instruccion
            preinstruccion=conexion.prepareStatement(comandoUpdate);
            //ejecitamos la instruccion
            preinstruccion.execute();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
    //elimina un registro en la base de datos
    public void delete(String idIngrediente){
        String comandoDelete="DELETE FROM Igredientes_Menus WHERE idIngredientes="+idIngrediente;
        try {
            //cargamos la instruccion
            preinstruccion=conexion.prepareStatement(comandoDelete);
            //ejecitamos la instruccion
            preinstruccion.execute();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
    // retorna una lista de ingredientes qeu corresponda a un menu
    public List<Ingredientes> getIngredientes(String NombreMenu){
        String comandoSELECT=consulta+"'"+NombreMenu+"'";
        List<Ingredientes> listaIngredientes=new ArrayList<>();
        try {
            ResultSet registros=instruccion.executeQuery(comandoSELECT);
            while (registros.next()){

                listaIngredientes.add(new Ingredientes(registros.getInt(1), registros.getString(2),registros.getString(3),registros.getInt(4)));
            }

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return listaIngredientes;
    }
}
