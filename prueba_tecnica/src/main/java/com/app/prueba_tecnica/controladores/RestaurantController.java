package com.app.prueba_tecnica.controladores;


import com.conexion.ConexionMenusRestaurantes;
import com.conexion.ConexionRestaurantes;
import com.modelo.Menu;
import com.modelo.MenusDeRestaurantes;
import com.modelo.Restaurantes;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin( "*")
public class RestaurantController {
    ConexionRestaurantes DbRestaurantes=new ConexionRestaurantes();
    ConexionMenusRestaurantes DbMenuRestaurante=new ConexionMenusRestaurantes();
    //devuelve una lista con todos los restaurantes creados
    @GetMapping("/restaurantes")
    public List<Restaurantes> getRestaurantes(){
        return DbRestaurantes.get();
    }
    @GetMapping("/restaurantes/get")
    public Restaurantes getSingleDbRestaurante(@RequestParam(value = "RazonSocial", defaultValue = "0") String id){
        return DbRestaurantes.get(id);
    }
    //crea un registro de restaurante en la base de datos
    @PutMapping("/restaurantes/create")
    public int putRestaurantes(@RequestBody Restaurantes nuevoRestaurante){
        return DbRestaurantes.save(nuevoRestaurante);
    }
    //modifica la informacion de un registro en la tabla restaurante en la base de datos
    @PatchMapping("/restaurantes/update")
    public void updateRestaurantes(@RequestBody Restaurantes targetRestaurante,@RequestParam(value = "RazonSocial", defaultValue = "0") String id){
        DbRestaurantes.update(targetRestaurante,id);
    }
    //elimina un registro del la tabla restaurantes en la base de datos
    @DeleteMapping("/restaurantes/delete")
    public void deleteRestaurantes(@RequestBody Restaurantes targetRestaurante){
        DbRestaurantes.delete(targetRestaurante);
    }
    //agrega un registro en la tabla de relacion menu_restaurante
    @PutMapping("/restaurantes/addMenu")
    public void putMenusRestaurantes(@RequestBody MenusDeRestaurantes addMenu){
        DbMenuRestaurante.save(addMenu);
    }
    //elimina un registro en la tabla menu_restaurante en la base de datos
    @DeleteMapping("/restaurantes/deleteMenu")
    public void deleteMenuRestaurante(@RequestBody MenusDeRestaurantes deletetarget){
        DbMenuRestaurante.delete(deletetarget);
    }
    //devuelve una lista con los menus asociados a un Restaurante
    @GetMapping("/restaurantes/menu")
    public List<Menu> getMenusRestaurante(@RequestParam(value = "razonSocial", defaultValue = "0") String id){
        return DbMenuRestaurante.getMenusRestaurantes(id);
    }
    @GetMapping("/restaurantes/menudiff")
    public List<Menu> getMenusRestauranteDiff(@RequestParam(value = "razonSocial", defaultValue = "0") String id){
        return DbMenuRestaurante.getMenusRestaurantesDiferentes(id);
    }

}
