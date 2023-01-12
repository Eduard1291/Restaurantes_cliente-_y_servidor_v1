import React from 'react'
import { useParams } from 'react-router-dom'
import CabeceraEditRestaurante from './CabeceraEditRestaurante';
import MenusRestaurantes from './MenusRestaurantes';
import servidores from './servidores.json'
const EditRestaurante = () => {
  const parametros=useParams()
  function regresarMenu(){
    window.location.assign(servidores.urlpaginweb+"/Restaurantes");
}
  return (
    <div>
      <CabeceraEditRestaurante razonSocial={parametros.razonSocial} regresarMenu={regresarMenu}/>
      <MenusRestaurantes razonSocial={parametros.razonSocial}/>
    </div>
  )
}

export default EditRestaurante