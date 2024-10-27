import React, {useRef} from "react";

import { useNavigate } from "react-router-dom";

import {getAno, getMes, getQuincena, getMesNumber} from '../tools/tools'

export const Filtro = () => {


    const today = new Date()
    

    const y= getAno(today)
    const m = getMes(today)
    const q = getQuincena(today)

    const mes = useRef(null);
    const quincena = useRef(null);
    const year = useRef(null);

    const navegar = useNavigate();


    const generarReporte=()=>{


        let _year = year.current.value;
        let _mes = mes.current.value;
        let _quincena = quincena.current.value;

        let _mes_numero = getMesNumber(_mes)



        navegar("/reporte", {state:{mes:_mes, quincena:_quincena, year:_year, mes_numero:_mes_numero}})
    }


    const irMenu=()=>{
      navegar("/menu")
    }

  return (
    <div className="container">
      <div className="card">

        <div className="card__header">
            <h1>Indice Notarial</h1>
        </div>
        <div className="card__body">
          
            <div className="card__input-group">
                <label htmlFor="mes">Mes</label>
                <select ref={mes} defaultValue={m}> 
                  <option key = '0' value="Enero"> Enero</option>
                  <option key = '1' value="Febrero">Febrero</option>
                  <option key = '2' value="Marzo">Marzo</option>
                  <option key = '3' value="Abril">Abril</option>
                  <option key = '4' value="Mayo">Mayo</option>
                  <option key = '5' value="Junio">Junio</option>
                  <option key = '6' value="Julio">Julio</option>
                  <option key = '7' value="Agosto">Agosto</option>
                  <option key = '8' value="Septiembre">Septiembre</option>
                  <option key = '9' value="Octubre">Octubre</option>
                  <option key = '10' value="Noviembre">Noviembre</option>
                  <option key = '11' value="Diciembre">Diciembre</option>
                </select>
            </div>

            <div className="card__input-group">
                <label htmlFor="quincena">Quincena</label>
                <select ref={quincena} defaultValue={q}>
                  <option key='1' value="Primera">Primera</option>
                  <option key='2' value="Segunda">Segunda</option>

                </select>
            </div>

            <div className="card__input-group" id="flex-small">
                <label htmlFor="año">Año</label>
                <input type="number" defaultValue={y} ref ={year} name="año" id="ano" />
            </div>

        </div>
        <div className="card__button-panel">
                <button className="card__button-panel__button"
                        onClick={generarReporte}
                > Generar </button>
                <button 
                  className="card__button-panel__button"
                  onClick={irMenu}
                > Cancelar </button>
            </div>


      </div>

    </div>
  );
};
