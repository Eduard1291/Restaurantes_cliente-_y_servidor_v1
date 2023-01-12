import React from 'react'

const ElementoMenu = (datos) => {
  function tiposdeMenus(){
    if(datos.tipoMenu===1){
      return "Entrada"
    }else if(datos.tipoMenu===2){
      return "Plato Fuerte"
    }else if(datos.tipoMenu===3){
      return "Postres"
    }else{
      return "Bebidas"
    }
  }
  return (
    <div className='contenedorchexkbox'>
    <input type='checkbox' value={datos.idMenu}  id={datos.nombreMenu}/>
    <label for={datos.nombreMenu}>
        <div className='menuselecelement'>
            <p>Tipo {tiposdeMenus()} Nomebre:{datos.nombreMenu}   a {datos.precio}</p>
        </div>
        </label>
    </div>    
  )
}

export default ElementoMenu