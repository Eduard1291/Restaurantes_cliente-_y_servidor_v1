import axios from 'axios'
import React from 'react'
import './estilosComponentes/listaelementomenu.css'
import servidores from './servidores.json'
const ListaElementoMenu = (menu) => {
    function tipo(){
        if(menu.tipoMenu===1){
            return "Entrada"
        }else if(menu.tipoMenu===2){
            return "Plato Fuerte"
        }else if(menu.tipoMenu===3){
            return "Postres"
        }else{
            return "Bebidas"
        }
    }
    async function eliminar(){
        await axios.delete(servidores.urlserver+"/menus/delete",{
            data: {
                tipoMenu:""+menu.tipoMenu,
                nombreMenu:""+menu.nombreMenu,
                precio:""+menu.precio
            }
        })
        menu.peticionMenu()
    }
    
    
    function editar(){
        window.location.assign(servidores.urlpaginweb+"/Menus/Edit/"+menu.nombreMenu)
    }
    function info(){
        window.location.assign(servidores.urlpaginweb+"/Menus/Info/"+menu.nombreMenu)
    }
  return (
    <li key={menu.index} className='elementoRestaurante' >
        <div className='contenedorRestaurantes'>
            <div onClick={info} className='elementomenu'>
                <p>{menu.nombreMenu}</p>
                <p>{tipo()}</p>
                <p>{menu.precio}</p>
            </div>
            <div className='contenedorbotones'>
                <button className='editar' onClick={editar}></button>
                <button className='eliminar' onClick={eliminar}></button>
            </div>
        </div>
    </li>
  )
}

export default ListaElementoMenu