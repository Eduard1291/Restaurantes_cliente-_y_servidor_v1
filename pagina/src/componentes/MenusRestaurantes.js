import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Limenus from './Limenus'
import './estilosComponentes/Limenus.css'
import PantallaAñadirMenu from './PantallaAñadirMenu'
import servidores from './servidores.json'
const MenusRestaurantes = (datos) => {
  const [meus,setmenus]=useState([])
  const [menusdiff,setmenusdiff]=useState([])
  async function pedirMenus(){
    const respuesta=await axios.get(servidores.urlserver+"/restaurantes/menu?razonSocial="+datos.razonSocial)
    setmenus(respuesta.data)
    pedirMenusDIFF();
  }
  async function pedirMenusDIFF(){
    const respuesta=await axios.get(servidores.urlserver+"/restaurantes/menudiff?razonSocial="+datos.razonSocial)
    setmenusdiff(respuesta.data)
    console.log(respuesta.data)
  }
  async function quitar(menu){
    await axios.delete(servidores.urlserver+"/restaurantes/deleteMenu",{
            data: {
                nombreMenu:""+menu.nombreMenu,
                razonSocial:""+datos.razonSocial
            }
    })
    //window.location.reload()
    pedirMenus()
  }

  useEffect(()=>{
    pedirMenus();
    //
  },[]);
  const menusdelrestaurnte=meus.map((info,index)=>
    <Limenus menusinfo={info} index={index} quitar={quitar}/>
  )
  const menusDiferentes=menusdiff.map((info,index)=>
    <PantallaAñadirMenu menusinfo={info} index={index} añadir={añadirmenu} />
  )
  async function añadirmenu(menu){
      await axios.put(servidores.urlserver+"/restaurantes/addMenu",{
        nombreMenu:""+menu.nombreMenu,
        razonSocial:""+datos.razonSocial
      })
      //window.location.reload()
      pedirMenus()
  }
  return (
    <div className='contenedorlistaMenuu'>
        <h2 className='tituloM'>Menus</h2>
        <ul className='contenedorlistalimenu'>
          {menusdelrestaurnte}
        </ul>
        <hr className='lineaeditar'/>
        <h2 className='tituloM'>Menus disponibles</h2>
        <ul>
            {menusDiferentes}
        </ul>
       
    </div>
  )
}

export default MenusRestaurantes