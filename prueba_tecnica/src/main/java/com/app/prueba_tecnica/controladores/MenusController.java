package com.app.prueba_tecnica.controladores;

import com.conexion.ConexionMenu;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.modelo.Menu;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
public class MenusController {
    ConexionMenu DbMenus=new ConexionMenu();

    @GetMapping("/menus")
    public List<Menu> getMenus(){
        List<Menu> RegistroMenus=DbMenus.get();
        return RegistroMenus;
    }

    @GetMapping("/menus/get")
    public Menu getSingleMenu(@RequestParam(value = "NombreMenu", defaultValue = "0") String id){
        return DbMenus.get(id);
    }

    @PutMapping("/menus/create")
    public int putMenus(@RequestBody Menu nuevoMenu){
        return DbMenus.save(nuevoMenu);
    }

    @PatchMapping("/menus/update")
    public void updateMenus(@RequestBody Menu targetMenu,@RequestParam(value = "NombreMenu", defaultValue = "0") String id){
        DbMenus.update(targetMenu,id);

    }


    @DeleteMapping("/menus/delete")
    public void deleteMenus(@RequestBody Menu targetMenu){
        DbMenus.delete(targetMenu);
    }

}
