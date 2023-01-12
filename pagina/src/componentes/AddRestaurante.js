import React,{useState,useEffect} from 'react'
import './estilosComponentes/AddRestaurante.css'
import axios from 'axios'
import ElementoMenu from './ElementoMenu'
import servidores from './servidores.json'
const AddRestaurante = () => {
  //link para traer las menus de la api
  const url=servidores.urlserver+"/menus"
  //variable dinamica para los Menus
  const [Menus,setrestaurantes]=useState([])
  //hace una peticion get a la api para taer los menus
  async function peticionMenus(){
    const peticion= await axios.get(url);
    setrestaurantes(peticion.data);
  }
  //ejecta la funcion de traer menus cuando de renderisa el componente
  useEffect(()=>{
    peticionMenus();
  },[]);

  const registros=Menus.map((datos,index)=>
    <ElementoMenu idMenu={datos.idMenu} indexkey={index}nombreMenu={datos.nombreMenu} tipoMenu={datos.tipoMenu} precio={datos.precio}/>
  );
  function regresar(){
    window.location.assign(servidores.urlpaginweb+"/Restaurantes");
  }
  async function crear(evento){
    if (evento.target.razonsocial.value!=='' && evento.target.nombrecomercial.value!=='' && evento.target.ciudad.value!=='' && evento.target.horaapertura.value!=='' && evento.target.horacierre.value!==''){
      const respuesta=await axios.put(servidores.urlserver+"/restaurantes/create",
      {razonSocial:''+evento.target.razonsocial.value,
        nombreComercial:''+evento.target.nombrecomercial.value,
        tipoRestaurante:''+evento.target.tipoRestaurante.value,
        ciudad:''+evento.target.ciudad.value,
        horaApertura:''+evento.target.horaapertura.value,
        horaCierre:''+evento.target.horacierre.value
      })
      if (respuesta.data===1){
        for (var i=8;i<8+Menus.length;i++){
          if(evento.target[i].checked===true){
            await axios.put(servidores.urlserver+"/restaurantes/addMenu",{
              nombreMenu:''+evento.target[i].id,
              razonSocial:''+evento.target.razonsocial.value
            })
          }
        }
        window.location.assign(servidores.urlpaginweb+"/Restaurantes");
      }else{
        alert("no se pudo registrar el restaurante ya existe uno con una razon social igual")
      }
      
    }else{
      alert("falta un campo por llenar")
    }
  }
  return (
    <form onSubmit={evento=>{evento.preventDefault();crear(evento);}}>
    <div className='AddRestaurante'>
      <header className='headerAddRestaurante'>
          <button className='regresarInicio' onClick={regresar} type='button'></button>
          <button className='botoncrear' type='submit'>Crear</button>
      </header>
      <div className='formulario'>
        <label>
          <p>Razon social</p>
          <input type='text' name='razonsocial'/>
          <p>Nombre comercial</p>
          <input type='text' name='nombrecomercial'/>
        </label>
        <label>
          <p>Tipo de Restaurante</p>
          <select name='tipoRestaurante'>
            <option value='1'>Vegano</option>
            <option value='2'>Vegetariano</option>
            <option value='3'>Carnes Rojas</option>
            <option value='4'>Aves</option>
          </select>
          <p>Ciudad</p>
          <input type='text' name='ciudad'/>
        </label> 
        <label className='seleccionarHora'>
          <div className='time'>
            <p>Hora de apertra</p>
            <input type='time'name='horaapertura'/>
          </div>
          <div>
            <p>Hora de cierre</p>
            <input type='time' name='horacierre'/>
          </div>  
        </label>
        <h3>Menus</h3>
        <label>
        {registros}
        </label>    
      </div>

    </div>
    </form>
  )
}

export default AddRestaurante