import React from "react";
import { TablaIndice } from "../components/TablaIndice";
import logo from "../images/logo.png";
import { useLocation, Link } from "react-router-dom";

export const IndicePage = () => {
  const { state } = useLocation();

  const fechaHoy = new Date();

  const mes = state.mes;
  const quincena = state.quincena;
  const year = state.year;
  const mes_numero = state.mes_numero;

  let  fechaInicio = new Date(year,mes_numero,1);
  let fechaFinal = new Date(year,mes_numero,1);

  let strFechaInicio = ''
  let strFechaFinal = ''


  if (quincena==='Segunda'){
    let mesSiguiente = new Date(mes_numero===12?year+1:year,mes_numero===12?1:mes_numero+1,1)
    fechaInicio = new Date(year,mes_numero,16);
    fechaFinal = new Date(mesSiguiente-1);
  }else{
    fechaFinal = new Date(year,mes_numero,15);
  }
  
  strFechaInicio = fechaInicio.toISOString().substring(0,10);
  strFechaFinal= fechaFinal.toISOString().substring(0,10);;




  return (
    <div className="report-container">
      <div className="report-container__logo-container">
        <img  src={logo} alt="logo" />
      </div>
      <div className="report-container__encabezado">
        <h1>
          Indice de instrumentos autorizados por el notario Rojas Chaves,
          Rodrigo{" "}
        </h1>
        <h2>
          En la {quincena.toLowerCase()} quincena del mes de {" "}
          {mes.toLowerCase()} de {year}
        </h2>
        <div>
          <p>CODIGO Nº 25794</p>
          <p>Página 1</p>
        </div>
        <TablaIndice fechaInicio={strFechaInicio} fechaFinal={strFechaFinal} />
      </div>

      <div className="report-container__footer">
        <div className="firmas">
          <p className="linea"></p>
          <p>Rodrigo Rojas Chaves</p>
          <p>Fecha: {fechaHoy.toISOString().substring(0,10) }</p>
        </div>
      </div>
      <footer className="report-container__footer">
        <Link to='/indice'>Regresar</Link>
      </footer>
    </div>
  );
};
