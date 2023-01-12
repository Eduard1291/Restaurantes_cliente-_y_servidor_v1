
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Menus from './componentes/Menus';
import Restaurantes from './componentes/Restaurantes';
import AddRestaurante from './componentes/AddRestaurante';
import AddMenus from './componentes/AddMenus';
import EditMenu from './componentes/EditMenu';
import MenuInfo from './componentes/MenuInfo';
import EditRestaurante from './componentes/EditRestaurante';
import InfoRestaurante from './componentes/InfoRestaurante';

function App() {
  
  return (
    <BrowserRouter >
      <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/Restaurantes' element={<Restaurantes/>}/>
      <Route path='/Menus' element={<Menus/>}/>
      <Route path='/Restaurantes/Add' element={<AddRestaurante/>}/>
      <Route path='/Menus/Add' element={<AddMenus/>}/>
      <Route path='/Menus/Edit/:nombreMenu'element={<EditMenu/>}/>
      <Route path='/Menus/Info/:nombreMenu' element={<MenuInfo/>} />
      <Route path='/Restaurantes/Edit/:razonSocial' element={<EditRestaurante/>}/>
      <Route path='/Restaurantes/Info/:razonSocial' element={<InfoRestaurante/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
