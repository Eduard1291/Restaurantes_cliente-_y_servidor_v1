import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ListaIngredientesMenu from './ListaIngredientesMenu';
import './estilosComponentes/menuinfo.css'
import servidores from './servidores.json'
const MenuInfo = () => {
    const parametros=useParams()
    const [infomenu,setinfomenu]=useState(Object)
    async function datosMenu(){
        const respuesta=await axios.get(servidores.urlserver+"/menus/get?NombreMenu="+parametros.nombreMenu)
        setinfomenu(respuesta.data)
        console.log(respuesta.data)
    }

    useEffect(()=>{
        datosMenu();
      },[]);
      function tipo(){
        if(infomenu.tipoMenu===1){
            return "Entrada"
        }else if(infomenu.tipoMenu===2){
            return "Plato Fuerte"
        }else if(infomenu.tipoMenu===3){
            return "Postres"
        }else{
            return "Bebidas"
        }
    }
    function regresar(){
        window.location.assign(servidores.urlpaginweb+"/Menus");
      }
  return (
    <div className='infoMenu'>
        <div className='headeinfoMenu'>
            <button className='regresarInicio' onClick={regresar} ></button>
            <p><strong>{infomenu.nombreMenu}</strong></p>
            <p>Tipo:<strong>{tipo()}</strong></p>
            <p>Precio:<strong>{infomenu.precio}</strong></p>
        </div>
        <ListaIngredientesMenu parametros={parametros} />
    </div>
  )
}

export default MenuInfo