import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { TablaBuscador } from "../components/TablaBuscador";

export const Buscador = () => {
  const navegar = useNavigate();

  const [verReporte, setverReporte] = useState(false);

  const [formData, setFormData] = useState({
    escritura: '0',
    tomo: '0',
    asiento: '0',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const irMenu = () => {
    navegar("/menu");
  };

  const generarReporte = () => {
    setverReporte(true);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card__header">
          <h1>Buscar Documentos</h1>
        </div>
        <div className="card__body ">
          <div className="card__input-group card--buscador__input-group">
            <label htmlFor="escritura">Escritura</label>
            <input
              name="escritura"
              type="text"
              value={formData.escritura}
              onChange={handleChange}
            />
          </div>

          <div className="card__input-group card--buscador__input-group">
            <label htmlFor="tomo">Tomo</label>
            <input
              name="tomo"
              type="text"
              value={formData.tomo}
              onChange={handleChange}
            />
          </div>

          <div className="card__input-group card--buscador__input-group">
            <label htmlFor="asiento">Asiento</label>
            <input
              name="asiento"
              type="text"
              value={formData.asiento}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="card__body  card--buscador__body">
            <TablaBuscador
              escritura={formData.escritura}
              tomo={formData.tomo}
              asiento={formData.asiento}
            />
        </div>

        <div className="card__button-panel">

          <button className="card__button-panel__button" onClick={irMenu}>
            {" "}
            Cancelar{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
