import React from 'react'
import { useParams } from 'react-router-dom'
import CabeceraInfoRestaurante from './CabeceraInfoRestaurante';
import MenusInforRestaurantes from './MenusInforRestaurantes';
import servidores from './servidores.json'

const InfoRestaurante = () => {
  const parametros=useParams()
  function regresarMenu(){
    window.location.assign(servidores.urlpaginweb+"/Restaurantes");
  }
  return (
    <div>
      <CabeceraInfoRestaurante razonSocial={parametros.razonSocial} regresar={regresarMenu}/>
      <MenusInforRestaurantes razonSocial={parametros.razonSocial}/>
    </div>
  )
}

export default InfoRestaurante