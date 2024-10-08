import React from 'react';
import './App.css';
import Cat from './components/Cat/Cat.jsx';
import Nav from './components/Nav/Nav';
import Pack from './components/Pack/Pack'; 
import Reg from './components/Reg/Reg.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/home.jsx'; 
import Dash from './components/Dashboard/Dash.jsx';  
import Catres from './components/Cat/Catres.jsx';
import Packres from './components/Pack/Packres.jsx';
import AddCity from './components/admin/add.jsx';
import AddDest from './components/admin/add dest.jsx';
import GetAllDestinations from './components/admin/getalldest.jsx'; 
import GetAllcity from './components/admin/getallcity.jsx';
import Res from './components/res/res.jsx';
import GetAllUsers from './components/admin/Users.jsx'; 
import About from './components/About us/about.jsx';
import Contact from './components/Contact/Contact.jsx';
const routes = [
  { path: '/', element: <Home /> },
  { path: '/Pack', element: <Pack /> },
  { path: '/Cat', element: <Cat /> },
  { path: '/Reg', element: <Reg /> },
  { path: '/Login', element: <Login /> }, 
  { path: '/Dashboard', element: <Dash /> },
  { path: '/AddCity', element: <AddCity /> }, 
  { path: '/AddDest', element: <AddDest /> },
  { path: "/GetAllDest", element: <GetAllDestinations/>}, 
  {path: "/GetAllCity", element: <GetAllcity/>},
  {path: "/res", element: <Res/>},
  {path: "/About", element: <About/>},
  {path: "/Contact", element: <Contact/>},
  {path: "/Users", element: <GetAllUsers/>}
];

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Nav />  
          <Routes>  
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            
            ))}
            <Route path='/Cat/:id' element={<Catres/>}/>
            <Route path='/Pack/:id' element={<Packres/>}/>
          </Routes>  
          
        </BrowserRouter> 
      </div>
    </>
  );
}

export default App;