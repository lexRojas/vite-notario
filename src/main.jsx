import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './styles/normalize.css' // se deben de aplicar primero
import './styles/styles-BEM.css'

import App from './App';
import { Filtro } from './pages/Filtro';
import {IndicePage} from './pages/IndicePage'
import Calculos from './pages/Calculos'
import { Menu } from './pages/Menu';
import { ErrorAcceso } from './pages/ErrorAcceso';
import Formulario from './pages/FormIndice';
import { Buscador } from './pages/Buscador';


const router = createBrowserRouter(
  //Creo el object router con las rutas
  [
    { path: "/", element: <App/> },
    { path: "/menu", element: <Menu/> },
    { path: "/indice", element: <Filtro/> },
    { path: "/reporte", element: <IndicePage/> },
    { path: "/calculos", element: <Calculos/> },
    { path: "/form_indice", element: <Formulario/>},
    { path: "/error", element: <ErrorAcceso/> },
    { path: "/buscador", element: <Buscador/> },
  ]
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
