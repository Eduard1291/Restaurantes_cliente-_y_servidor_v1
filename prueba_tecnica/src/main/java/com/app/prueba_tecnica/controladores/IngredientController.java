package com.app.prueba_tecnica.controladores;

import com.conexion.ConexionIngredientes;
import com.modelo.Ingredientes;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class IngredientController {
    ConexionIngredientes DbIngredientes=new ConexionIngredientes();
    //devuelve una lista de ingredientes pertenecientes a un menu
    @GetMapping("/ingredientes")
    public List<Ingredientes> getIngredientes(@RequestParam(value = "NombreMenu", defaultValue = "0") String id){
        List<Ingredientes> listaIngredientes=DbIngredientes.getIngredientes(id);
        return listaIngredientes;
    }
    //crea un ingrediente asociado a un menu
    @PutMapping("/ingredientes/create")
    public int putIngredientes(@RequestBody Ingredientes nuevoIngrediente){
        return DbIngredientes.save(nuevoIngrediente);
    }
    //modifica la informacion de un registro en la tabal ingrediente Menu de la base de datos
    @PatchMapping("/ingredientes/update")
    public void updateIngrediente(@RequestBody Ingredientes targetIngrediente){
        DbIngredientes.update(targetIngrediente);
    }
    //elimina un registro de la tabla ingrediente_menus de la base de datos
    @DeleteMapping("/ingredientes/delete")
    public void deleteIngredientes(@RequestParam(value = "idIngrediente", defaultValue = "0") String id){
        DbIngredientes.delete(id);
    }
}
