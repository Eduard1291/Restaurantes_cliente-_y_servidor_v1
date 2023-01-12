import React from 'react'
import './estilosComponentes/inicio.css'


const Inicio = () => {
  return (
    <div className='Inicio'>
        <div className='Targeta Restaurantes'>
            <a href='/Restaurantes' >Restaurantes</a>
        </div>
        <div className='Targeta Menus'>
            <a href='/Menus' >Menus</a>
        </div>   
    </div>
  )
}

export default Inicio