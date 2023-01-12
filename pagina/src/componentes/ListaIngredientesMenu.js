import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './estilosComponentes/listaingredienteMenu.css'
import servidores from './servidores.json'
const ListaIngredientesMenu = (datos) => {
    const [ingredientes,setIngredientes]=useState([])

    async function registros(){
        const respuesta=await axios.get(servidores.urlserver+"/ingredientes?NombreMenu="+datos.parametros.nombreMenu)
        setIngredientes(respuesta.data)
    }
    useEffect(()=>{
        registros();
    },[]);
    const elementos=ingredientes.map((datos,index)=>
        <li key={index} className='listaIngredientess'>
            <p>{datos.nombreIngrediente} contiene {datos.caloria} calorias</p>
        </li>
    )
  return (
    <div className='ingredientesEdit'>
        <h2 className='tituloIngredientes'>Lista Ingredientes</h2>
        <hr className='lineaIngredientes'/>
        <ul className='lista'>
            {elementos}
        </ul>
    </div>

  )
}

export default ListaIngredientesMenu