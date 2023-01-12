import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BotonQuitar from './BotonQuitar'
import servidores from './servidores.json'
const ListaIngredientesEdit = (datos) => {
    const [ingredientes,setIngredientes]=useState([])
    const [nombreingrediente,setnombreingrediente]=useState('')
    const [caloriaingrediente,setcaloriaingrediente]=useState('')


    async function registros(){
        const respuesta=await axios.get(servidores.urlserver+"/ingredientes?NombreMenu="+datos.parametros.nombreMenu)
        setIngredientes(respuesta.data)
    }
    useEffect(()=>{
        registros();
    },[]);
    async function agregarIngrediente(){
        let contador=parseInt(caloriaingrediente)
        let repuesta
        for(let i=0;i<ingredientes.length;i++){
            contador+=parseInt(ingredientes[i].caloria)
        }
        alert(contador)
        if (contador<=2000){
                repuesta=await axios.put(servidores.urlserver+"/ingredientes/create",{
                nombreMenu:''+datos.parametros.nombreMenu,
                nombreIngrediente:''+nombreingrediente,
                caloria:''+caloriaingrediente
            })
        }else{
            alert("la suma total de las calorias no pueden superar las 2000 calorias")
            
        }
        if (repuesta.data===1){
            registros()
        }else{
            alert("no se pudo añadir el ingrediente")
        }
    }

    async function quitarIngrediente(datosI){
        await axios.delete(servidores.urlserver+"/ingredientes/delete?idIngrediente="+datosI)
        registros()
    }
    const elementos=ingredientes.map((datosI,index)=>
        <li key={index} className='listaIngredientess'>
            <p>{datosI.nombreIngrediente} contiene {datosI.caloria} calorias</p>
            <BotonQuitar quitarIngrediente={quitarIngrediente} datosLista={datosI.idIngredientes} />        
        </li>
    )
    
  return (
    <div className='ingredientesEdit'>
        <div className='agregarIngrediente'>
            <label>
                Nombre:
                <input name='nombreIngrediente' value={nombreingrediente} onChange={evento=>setnombreingrediente(evento.target.value)} type='text'/>
            </label>
            <label>
            calorias:
                <input name='CaloriaIngrediente' value={caloriaingrediente} onChange={evento=>setcaloriaingrediente(evento.target.value)} type='number' min={0} max={2000}/>
            </label>      
            <button type='submit' onClick={agregarIngrediente}>agregar</button>
        </div>
        <hr className='lineaIngredientes'/>
        <h2 className='tituloIngredientes'>Lista Ingredientes</h2>
        <hr className='lineaIngredientes'/>
        <ul className='lista'>
            {elementos}
        </ul>
    </div>
  )
}

export default ListaIngredientesEdit