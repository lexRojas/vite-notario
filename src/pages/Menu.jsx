import React from "react";
import reportIco from "..//images/report.svg";
import calculosIco from "..//images/calculos.svg";
import form_indice from "../images/form_indice.svg";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { ErrorAcceso } from "./ErrorAcceso";

export const Menu = () => {
  const navegar = useNavigate();
  const usuario = useSelector((state) => state.user.value);

  const salir = () => {
    navegar("/");
  };

  if (usuario) {
    return (
      <div className="container">
        <div className="card card--menu">
          <div className="card__header">
            <h1>Herramientas Notario</h1>
          </div>
          <div className="card__body card--menu__body">
            <div className="card--menu__menu-item">
              <Link to="/indice">
                {" "}
                <img src={reportIco} alt="Reportes"></img>{" "}
              </Link>
              <span>Reportes</span>
            </div>
            <div className="card--menu__menu-item">
              <Link to="/calculos">
                <img src={calculosIco} alt="Calculos"></img>
              </Link>
              <span>Calculos</span>
            </div>
            <div className="card--menu__menu-item">
              <Link to="/form_indice">
                <img src={form_indice} alt="Indice"></img>
              </Link>
              <span>Indice</span>
            </div>
          </div>
          <div className="card__button-panel">
            <button
              className="card__button-panel__button"
              type="button"
              onClick={salir}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <ErrorAcceso />;
  }
};
