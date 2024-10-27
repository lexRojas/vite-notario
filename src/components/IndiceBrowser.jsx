import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/modalPanel.css";

export const IndiceBrowser = (props) => {
  const { setverBrowser, loadRecord, setEditando, fijarValoresPorDefecto } = props;

  const [datos, setdatos] = useState([]);
  const URL = "https://mysql-backend-8bc5e268b39e.herokuapp.com/";
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const endpoint = URL + "indice";
    const getInfo = async () => {
      await axios
        .get(endpoint)
        .then((res) => {
          console.log("set de datos ....");
          console.log(res.data);
          setdatos(res.data);
        })
        .catch((error) => {
          alert(error);
        });
    };

    getInfo();
  }, []);

  const selectIndice = (registro) => {
    setSelectedRow(registro.id);
    loadRecord(registro);
    setverBrowser(false);
    setEditando(true);
  };

  const salir = () => {
    setverBrowser(false);
    fijarValoresPorDefecto();
    
  };




  if (datos.length > 0) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="browser-grid">
            <div className="panel1">
              <button type="button" onClick={salir}>Salir</button>
            </div>
            <div className="panel2">
              <table>
                <thead className="tabla-head">
                  <tr>
                    <th>#</th>
                    <th>ACTO O CONTRATO</th>
                    <th>PARTES</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.map((row, id) => (
                    <tr
                      key={id}
                      className={selectedRow === id ? "selected" : ""}
                      onClick={() => selectIndice(row)}
                    >
                      <td> {row.escritura} </td>
                      <td> {row.contrato} </td>
                      <td> {row.partes} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="modal">
        <div className="modal-content">
          <table>
            <thead>
              <tr>
                <th>NUMERO</th>
                <th>ACTO O CONTRATO</th>
                <th>PARTES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8}> -- NO HAY ESCRITURAS -- </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
