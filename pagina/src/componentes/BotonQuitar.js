import React from 'react'

const BotonQuitar = (datos) => {
    function quitar(){
        datos.quitarIngrediente(datos.datosLista)
    }
  return (
    <button onClick={quitar}>quitar</button>
  )
}

export default BotonQuitar