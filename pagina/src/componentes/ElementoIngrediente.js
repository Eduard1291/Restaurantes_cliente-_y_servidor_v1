import React from 'react'
import './estilosComponentes/ingrediente.css'

const ElementoIngrediente = (de) => {
    function quitarelemento(){
        de.quitar(de.index)
    }
  return (
    <li key={de.datos[0]}>
        <p>{de.datos[0]} contiene {de.datos[1]} calorias</p>
        <button type='button' onClick={quitarelemento}>quitar</button>
    </li>
  )
}

export default ElementoIngrediente