import React from 'react'
import { useParams } from 'react-router-dom'
import InformacionEdit from './informacionEdit'
import './estilosComponentes/editMenu.css'
import ListaIngredientesEdit from './ListaIngredientesEdit'
import servidores from './servidores.json'

const EditMenu = () =>{
    const parametros=useParams()
    function regresarMenu(){
        window.location.assign(servidores.urlpaginweb+"/Menus");
    }
    return (
        <div className='editpage'>
            <InformacionEdit parametros={parametros} regresarMenu={regresarMenu}/>
            <ListaIngredientesEdit parametros={parametros} />
        </div>
    )
}

export default EditMenu