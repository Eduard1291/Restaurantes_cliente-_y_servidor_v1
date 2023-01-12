import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './estilosComponentes/infoRestaurante.css'
import servidores from './servidores.json'
const CabeceraInfoRestaurante = (datos) => {
    const [restaurante,setrestaurante]=useState(Object)
    async function infoRestaurante (){
        const respuesta=await axios.get(servidores.urlserver+"/restaurantes/get?RazonSocial="+datos.razonSocial)
        setrestaurante(respuesta.data)
    }
    useEffect(()=>{
        infoRestaurante();
      },[]);
    
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
  return (
    <div className='contenedorInfoRestaurante'>
        <button className='regresarInicio' onClick={datos.regresar} type='button'></button>
        <p><strong>{restaurante.nombreComercial}</strong></p>
        <p><strong>{tipo}</strong></p>
        <p>Ciudad : <strong>{restaurante.ciudad}</strong></p>  
        <p>Abierto de :<strong>{restaurante.horaApertura}</strong>a<strong>{restaurante.horaCierre}</strong> </p>
    </div>
  )
}

export default CabeceraInfoRestaurante