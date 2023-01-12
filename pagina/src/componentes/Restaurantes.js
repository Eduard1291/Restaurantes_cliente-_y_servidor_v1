import axios from 'axios'
import React,{useEffect,useState} from 'react'
import './estilosComponentes/restaurante.css'
import ListaEelemento from './ListaEelemento'
import servidores from './servidores.json'
const Restaurantes = () => {
  //link de la api para los registros
  const url=servidores.urlserver+"/restaurantes"
  //crea una variable de dinamica para almacenar los registros
  const [restaurantes,setrestaurantes]=useState([])
  //llama a los registros de la api
  async function peticionRestaurantes(){
      const peticion= await axios.get(url);
      setrestaurantes(peticion.data);
  }
  //ejecta la funcion para traer la informacion de la api al cuando se renderisa el componente
  useEffect(()=>{
    peticionRestaurantes();
  },[]);
  
  const registros=restaurantes.map((datos,index)=>
    <ListaEelemento index={index} nombreComercial={datos.nombreComercial} 
    tipoRestaurante={datos.tipoRestaurante} ciudad={datos.ciudad} horaApertura={datos.horaApertura}
    horaCierre={datos.horaCierre} razonSocial={datos.razonSocial} peticionRestaurantes={peticionRestaurantes}/>
  );
  //funcion para regresar a la pagina de inicio
  function regresar(){
    window.location.assign(servidores.urlpaginweb);
  }
  function añadirRestaurantes(){
    window.location.assign(servidores.urlpaginweb+"/Restaurantes/Add");
  }
  function listavacia(){
    if (restaurantes.length===0){
      return(
        <li key={1} className='elementoRestaurante'>
            <h1>No hay Restaurantes creados</h1>
        </li>        
      )
    }
  }
  return (
    <div className='restaurantes'>
      <header>
        <div className='titulo'>
          <button className='regresarInicio' onClick={regresar} ></button>
          <h1>Restaurantes</h1>
          <button className='añadirRestarante' onClick={añadirRestaurantes} ></button>
        </div>
        <hr color='black'/>
        <div className='registroRestaurantes'>
        <div className='atributosRestaurantes'>
          <p>Nombre</p>
          <p>Tipo</p>
          <p>Ciudad</p>
          <p>Activo de </p>
          <p>editar/eliminar</p>
        </div>
        <hr className='lineaRestarantes'/>
          <ul>
            {listavacia()}
            {registros}
          </ul>
        </div>
      </header>
    </div> 
  )
}

export default Restaurantes