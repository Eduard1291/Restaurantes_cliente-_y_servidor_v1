
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './estilosComponentes/InformacionEditMenu.css'
import servidores from './servidores.json'
const InformacionEdit = (datos) => {
    const [editMenu,setEditMenu]=useState(Object)
    const [nombreMenu,setnombreMenu]=useState(Object)
    const [tipoMenu,settipoMenu]=useState(Object)
    const [precio,setprecio]=useState(Object)
    const url=servidores.urlserver+"/menus/get"
    async function peticiongetMenu(){
        const respuesta=await axios.get(url+"?NombreMenu="+datos.parametros.nombreMenu)
        setEditMenu(respuesta.data)
        setnombreMenu(respuesta.data.nombreMenu)
        settipoMenu(respuesta.data.tipoMenu)
        setprecio(respuesta.data.precio)
    }
    useEffect(()=>{
        peticiongetMenu();
    },[]);
    async function editar(){
        await axios.patch(servidores.urlserver+"/menus/update?NombreMenu="+editMenu.nombreMenu,{
            nombreMenu:""+nombreMenu,
            tipoMenu:""+tipoMenu,
            precio:""+precio
        })
        window.location.assign(servidores.urlpaginweb+"/Menus");
    }
    
  return (
    <form onSubmit={evento=>{evento.preventDefault()}}>
        <div className='contenedorEdit'>
            <button type='button'  onClick={datos.regresarMenu} className='regresarInicio' ></button>
            <label>
                Nombre: 
                <input type='text' value={nombreMenu} onChange={evento=>setnombreMenu(evento.target.value)}/>
            </label>
            <label>
                Tipo: 
                    
                <select value={tipoMenu} onChange={evento=>settipoMenu(evento.target.value)}>
                    <option value='1'>Entrada</option>
                    <option value='2'>Plato Fuerte</option>
                    <option value='3'>Postres</option>
                    <option value='4'>Bebidas</option>
                </select>
            </label>
            <label>
                Precio: 
                <input type='number' step={0.01}  min={0}value={precio} onChange={evento=>setprecio(evento.target.value)}/>
            </label>
            <div>
                <button type='button' onClick={editar} className='botonEditar'></button>
            </div>  
        </div>
    </form>
  )
}

export default InformacionEdit