import React from "react";
import logo from '../images/logo.png'

export const ErrorAcceso = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card__header card__header--message">
            <img src={logo} alt="logo" className="logoTitulo" />
          <h2>Error no puede ingresar</h2>
        </div>
      </div>
    </div>
  );
};
