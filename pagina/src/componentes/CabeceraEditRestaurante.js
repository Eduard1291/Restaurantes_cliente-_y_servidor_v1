import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './estilosComponentes/CabeceraEditRestaurante.css'
import servidores from './servidores.json'
const CabeceraEditRestaurante = (datos) => {
  const [Restaurante,setEditRestaurante]=useState(Object)
  const [razonSocial,setrazonSocial]=useState(Object)
  const [nombreComercial,setnombreComercial]=useState(Object)
  const [tipoRestaurante,settipoRestaurante]=useState(Object)
  const [ciudad,setciudad]=useState(Object)
  const [horaApertura,sethoraApertura]=useState(Object)
  const [horaCierre,sethoraCierre]=useState(Object)
  const url=servidores.urlserver+"/restaurantes/get"
  async function peticiongetMenu(){
  const respuesta=await axios.get(url+"?RazonSocial="+datos.razonSocial)
        setEditRestaurante(respuesta.data)
        setrazonSocial(respuesta.data.razonSocial)
        setnombreComercial(respuesta.data.nombreComercial)
        settipoRestaurante(respuesta.data.tipoRestaurante)
        setciudad(respuesta.data.ciudad)
        sethoraApertura(respuesta.data.horaApertura)
        sethoraCierre(respuesta.data.horaCierre)
  
  }
  useEffect(()=>{
      peticiongetMenu();
  },[]);
  async function editar(){
      await axios.patch(servidores.urlserver+"/restaurantes/update?RazonSocial="+datos.razonSocial,{
        razonSocial:""+razonSocial,
        nombreComercial:""+nombreComercial,
        tipoRestaurante:""+tipoRestaurante,
        ciudad:""+ciudad,
        horaApertura:""+horaApertura,
        horaCierre:""+horaCierre
      })
      window.location.assign(servidores.urlpaginweb+"/Restaurantes");
  }
  return (
    <form onSubmit={evento=>{evento.preventDefault()}}>
        <div className='contenedorEditRestaurante'>
            <button type='button'  onClick={datos.regresarMenu} className='regresarInicio' ></button>
            <label>
                Razon social: 
                <input type='text' value={razonSocial} onChange={evento=>setrazonSocial(evento.target.value)}/>
            </label>
            <label>
                Nombre Comercial: 
                <input type='text' value={nombreComercial} onChange={evento=>setnombreComercial(evento.target.value)}/>
            </label>
            <label>
                Tipo: 
                    
                <select value={tipoRestaurante} onChange={evento=>settipoRestaurante(evento.target.value)}>
                    <option value='1'>Vegano</option>
                    <option value='2'>Vegetariano</option>
                    <option value='3'>Carnes Rojas</option>
                    <option value='4'>Aves</option>
                </select>
            </label>
            <label>
                Ciudad: 
                <input type='text' value={ciudad} onChange={evento=>setciudad(evento.target.value)}/>
            </label>
            <label>
                Abierto de : 
                <input type='time'value={horaApertura} onChange={evento=>sethoraApertura(evento.target.value)}/>
            </label>
            <label>
                hasta
                <input type='time'value={horaCierre} onChange={evento=>sethoraCierre(evento.target.value)}/>
            </label>
            <div>
                <button type='button' onClick={editar} className='botonEditar'></button>
            </div>  
        </div>
    </form>
  )
}

export default CabeceraEditRestaurante