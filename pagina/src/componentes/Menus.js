import React,{useState, useEffect} from 'react'
import axios from 'axios'
import ListaElementoMenu from './ListaElementoMenu'
import servidores from './servidores.json'
const Menus = () => {
  //link de la api para los registros
  const url=servidores.urlserver+"/menus"
  //crea una variable de dinamica para almacenar los registros
  const [Menus,setMenu]=useState([])
  //llama a los registros de la api
  async function peticionMenu(){
      const peticion= await axios.get(url);
      setMenu(peticion.data);
  }
  //ejecta la funcion para traer la informacion de la api al cuando se renderisa el componente
  useEffect(()=>{
    peticionMenu();
  },[]);
  

  const registros=Menus.map((datos,index)=>
    <ListaElementoMenu tipoMenu={datos.tipoMenu} nombreMenu={datos.nombreMenu} 
    precio={datos.precio} index={index} peticionMenu={peticionMenu}/>
  );
  
  //funcion para regresar a la pagina de inicio
  function regresar(){
    window.location.assign(servidores.urlpaginweb);
  }
  function añadirMenus(){
    window.location.assign(servidores.urlpaginweb+"/Menus/Add");
  }
  function listavacia(){
    if (Menus.length===0){
      return(
        <li key={1} className='elementoRestaurante'>
            <h1>No hay menus creados</h1>
        </li>        
      )
    }
  }
  return (
    <div className='restaurantes'>
      <header>
        <div className='titulo'>
          <button className='regresarInicio' onClick={regresar} ></button>
          <h1>Menus</h1>
          <button className='añadirRestarante' onClick={añadirMenus} ></button>
        </div>
        <hr color='black'/>
        <div className='registroRestaurantes'>
        <div className='atributosRestaurantes'>
          <p>Nombre</p>
          <p>Tipo</p>
          <p>Precio</p>
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

export default Menus