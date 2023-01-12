import axios from 'axios'
import React,{useRef,useState} from 'react'
import ElementoIngrediente from './ElementoIngrediente'
import servidores from './servidores.json'

const AddMenus = () => {
    let nombreIngrediente=useRef(null)
    let caloriasingrediente=useRef(null)
    const [lista1,setlista1]=useState([])
    function regresar(){
        window.location.assign(servidores.urlpaginweb+"/Menus");
    }
    async function crear(evento){
        if(evento.target.precio.value!=='' && evento.target.nombreMenu.value !==''){
            const respuesta=await axios.put(servidores.urlserver+"/menus/create",{
            tipoMenu:""+evento.target.tipoMenu.value,
            nombreMenu:""+evento.target.nombreMenu.value,
            precio:""+evento.target.precio.value.replace(",",".")
            })
            if(respuesta.data===1){
                for(var i=0;i<lista1.length;i++){
                    await axios.put(servidores.urlserver+"/ingredientes/create",{
                        nombreMenu:""+evento.target.nombreMenu.value,
                        nombreIngrediente:""+lista1[i][0],
                        caloria:""+lista1[i][1]
                    })
                }
                window.location.assign(servidores.urlpaginweb+"/Menus");
            }else{
                alert("huvo un error al crear el menu")
            }
        }else{
            alert("falta un espacio por rellenar")
        }
    }
    function quitar(cont){
        setlista1(lista1.filter((datos,index)=>index!==cont))
    }
    
    function añadiringrediente(){
        let contador=parseInt(caloriasingrediente.current.value)
        for(let i=0;i<lista1.length;i++){
            contador+=parseInt(lista1[i][1])
        }
        if (contador<=2000){
            setlista1([...lista1, [nombreIngrediente.current.value,caloriasingrediente.current.value]])
            nombreIngrediente.current.value=""
            caloriasingrediente.current.value=""
        }else{
            alert("la suma de las calorias totale sno puede superar las 2000 calorias")
        }
        
    }
    const ingredientes=  lista1.map((datos,index)=>{
        return(
            <ElementoIngrediente datos={datos} index={index} quitar={quitar}/>
        )
        }
    )
    
  return (

    <form onSubmit={evento=>{evento.preventDefault();crear(evento);}}>
        <div className='AddRestaurante'>
            <header className='headerAddRestaurante'>
                <button className='regresarInicio' onClick={regresar} type='button'></button>
                <button className='botoncrear' name='crear' type='submit'>Crear</button>
            </header>
            <div className='formulario'>
                <label>
                    <p>Nombre</p>
                    <input type='text' name='nombreMenu'/>
                    <p>Tipo de Menu</p>
                    <select name='tipoMenu'>
                        <option value='1'>Entrada</option>
                        <option value='2'>Plato Fuerte</option>
                        <option value='3'>Postres</option>
                        <option value='4'>Bebidas</option>
                    </select>
                </label>
                <label>
                    <p>Precio </p>
                    <input type='number' step="0.01" min={0} name='precio'/>
                </label>
                <label>
                <div>
                    <p>Nombre</p>
                    <input type='text' name='nombreingrediente' ref={nombreIngrediente}/>
                </div>
                <div>
                    <p>Calorias</p>
                    <input type='number'  min={1} name='caloriasingrediente' ref={caloriasingrediente}/>
                </div>
                </label>
                <button className='botonAñadir' type='button' onClick={añadiringrediente}>añadir</button>
                <ul>
                    {ingredientes}
                </ul>
            </div>
        </div>
    </form>
  )
}

export default AddMenus
