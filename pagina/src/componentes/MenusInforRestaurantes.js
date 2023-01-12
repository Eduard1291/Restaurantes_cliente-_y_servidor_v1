import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './estilosComponentes/infoRestaurante.css'
import servidores from './servidores.json'
const MenusInforRestaurantes = (datos) => {
    const [menusrestaurantes,setmenusrestaurantes]=useState([])
    async function getMenus(){
        const respuesta=await axios.get(servidores.urlserver+"/restaurantes/menu?razonSocial="+datos.razonSocial)
        setmenusrestaurantes(respuesta.data)
    }
    useEffect(()=>{
        getMenus();
    },[]);
    function tipo(menu){
        if(menu.tipoMenu===1){
            return "Entrada"
        }else if(menu.tipoMenu===2){
            return "Plato Fuerte"
        }else if(menu.tipoMenu===3){
            return "Postres"
        }else{
            return "Bebidas"
        }
    }
    const menusEntrada=menusrestaurantes.map((datosmenu,index)=>{
        if(datosmenu.tipoMenu===1){
            return(
                <li key={index} className='listaMenuInfoRestaurante'><p>{datosmenu.nombreMenu}</p> <p>Tipo: {tipo(datosmenu)}</p> <p>valor: {datosmenu.precio}</p></li>
            )
        }
    })
    const menusPlatoFuerte=menusrestaurantes.map((datosmenu,index)=>{
        if(datosmenu.tipoMenu===2){
            return(
                <li key={index} className='listaMenuInfoRestaurante'><p>{datosmenu.nombreMenu}</p> <p>Tipo: {tipo(datosmenu)}</p> <p>valor: {datosmenu.precio}</p></li>
            )
        }
    })
    const menusPostres=menusrestaurantes.map((datosmenu,index)=>{
        if(datosmenu.tipoMenu===3){
            return(
                <li key={index} className='listaMenuInfoRestaurante'><p>{datosmenu.nombreMenu}</p> <p>Tipo: {tipo(datosmenu)}</p> <p>valor: {datosmenu.precio}</p></li>
            )
        }
    })
    const menusBebidas=menusrestaurantes.map((datosmenu,index)=>{
        if(datosmenu.tipoMenu===4){
            return(
                <li key={index} className='listaMenuInfoRestaurante'><p>{datosmenu.nombreMenu}</p> <p>Tipo: {tipo(datosmenu)}</p> <p>valor: {datosmenu.precio}</p></li>
            )
        }
    })
  return (
    <div className='constenedorListaMenuRestaurante'>
        <h2 className='titlomenus'>Entradas</h2>
        <hr className='lineaInfoR' />
        <ul className='ulmenus'>
            {menusEntrada}
        </ul>
        <hr className='lineaInfoR'/>
        <h2 className='titlomenus'>Plato Fuerte</h2>
        <hr className='lineaInfoR'/>
        <ul className='ulmenus'>
            {menusPlatoFuerte}
        </ul>
        <hr className='lineaInfoR'/>
        <h2 className='titlomenus'>Postres</h2>
        <hr className='lineaInfoR'/>
        <ul className='ulmenus'>
            {menusPostres}
        </ul>
        <hr className='lineaInfoR'/>
        <h2 className='titlomenus'>Bebidas</h2>
        <hr className='lineaInfoR'/>
        <ul className='ulmenus'>
            {menusBebidas}
        </ul>
    </div>
  )
}

export default MenusInforRestaurantes