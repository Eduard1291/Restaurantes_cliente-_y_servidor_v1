import React from 'react'
import './estilosComponentes/Limenus.css'
const PantallaAñadirMenu = (datos) => {
    function tipo(){
        if(datos.menusinfo.tipoMenu===1){
            return "Entrada"
        }else if(datos.menusinfo.tipoMenu===2){
            return "Plato Fuerte"
        }else if(datos.menusinfo.tipoMenu===3){
            return "Postres"
        }else{
            return "Bebidas"
        }
    }
    function añadirmenu(){
        datos.añadir(datos.menusinfo)
    }
  return (
    <li className='limenu'>
        <p>{datos.menusinfo.nombreMenu}</p>
        <p>Tipo: {tipo()}</p>
        <p>Precio: {datos.menusinfo.precio}</p>
        <button onClick={añadirmenu}>añadir</button>
    </li>
  )
}

export default PantallaAñadirMenu