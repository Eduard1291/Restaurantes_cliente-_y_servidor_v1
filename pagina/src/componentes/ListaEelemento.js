import axios from 'axios'
import React from 'react'
import './estilosComponentes/ListaElementos.css'
import servidores from './servidores.json'
const ListaEelemento = (restaurante) => {
  function tipo(){
    if(restaurante.tipoRestaurante===1){
        return "Vegano"
    }else if(restaurante.tipoRestaurante===2){
        return "Vegetariano"
    }else if(restaurante.tipoRestaurante===3){
        return "Carnes Rojas"
    }else{
        return "Aves"
    } 
  }
  function editar(){
      window.location.assign(servidores.urlpaginweb+"/Restaurantes/Edit/"+restaurante.razonSocial)
  }
  async function eliminar(){
    await axios.delete(servidores.urlserver+"/restaurantes/delete",{
            data: {
              razonSocial:""+restaurante.razonSocial
            }
        })
        restaurante.peticionRestaurantes()
  }
  function info(){
      window.location.assign(servidores.urlpaginweb+"/Restaurantes/Info/"+restaurante.razonSocial)
  }
  return (
    <li key={restaurante.index} className='elementoRestaurante'>
        <div onClick={info} className='contenedorRestaurantes'>
            <p>{restaurante.nombreComercial}</p>
            <p>{tipo()}</p>
            <p>{restaurante.ciudad}</p>
            <p>{restaurante.horaApertura} a {restaurante.horaCierre}</p>
        </div>
        <div className='contenedorbotones'>
                <button className='editar' onClick={editar}></button>
                <button className='eliminar' onClick={eliminar}></button>
        </div>
    </li>
  )
}

export default ListaEelemento