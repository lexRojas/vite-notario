import React, { useEffect, useState } from "react";
import axios from "axios";

export const TablaIndice = (props) => {
  const [datos, setdatos] = useState([]);
  const URL = "https://mysql-backend-8bc5e268b39e.herokuapp.com/";

  let { fechaInicio } = props;
  let { fechaFinal } = props;

  useEffect(() => {
    const endpoint = URL + "indice_by_dates";
    const getInfo = async () => {
      await axios
        .get(endpoint, {
          params: {
            fecha_inicio: fechaInicio,
            fecha_final: fechaFinal,
          },
        })
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
  }, [fechaFinal, fechaInicio]);

  if (datos.length > 0) {
    return (
      <div className="">
        <table className="report-table">
          <thead>
            <tr>
              <th className="report-table--col-170px">TOMO</th>
              <th className="report-table--col-170px">FOL.INICIAL</th>
              <th className="report-table--col-170px">FOL.FINAL</th>
              <th className="report-table--col-170px">NUMERO</th>
              <th className="report-table--col-170px">FECHA</th>
              <th className="report-table--col-170px">HORA</th>
              <th className="report-table--col-300px">ACTO O CONTRATO</th>
              <th className="report-table--col-600px">PARTES</th>
            </tr>
          </thead>
          <tbody>
            {datos.map(({ ValoresUsuales }) => (
               ValoresUsuales.escritura<999 && <tr key={ValoresUsuales.escritura}>
                <td> {ValoresUsuales.tomo} </td>
                <td>
                  {" "}
                  {ValoresUsuales.folio_1 +
                    ValoresUsuales.pag_1.substring(0, 1)}{" "}
                </td>
                <td>
                  {" "}
                  {ValoresUsuales.folio_2 +
                    ValoresUsuales.pag_2.substring(0, 1)}{" "}
                </td>
                <td> {ValoresUsuales.escritura} </td>
                <td> {ValoresUsuales.fecha} </td>
                <td>
                  {" "}
                  {String(ValoresUsuales.hora).padStart(2, "0") +
                    ":" +
                    String(ValoresUsuales.minutos).padStart(2, "0")}{" "}
                </td>
                <td> {ValoresUsuales.contrato} </td>
                <td> {ValoresUsuales.partes} </td>
              </tr>
            ))}

            <tr>
              <td colSpan={8}> Ultima Línea </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="">
        <table className="report-table">
          <thead className="">
            <tr>
              <th className="report-table--col-170px">TOMO</th>
              <th className="report-table--col-170px">FOL.INICIAL</th>
              <th className="report-table--col-170px">FOL.FINAL</th>
              <th className="report-table--col-170px">NUMERO</th>
              <th className="report-table--col-170px">FECHA</th>
              <th className="report-table--col-170px">HORA</th>
              <th className="report-table--col-300px">ACTO O CONTRATO</th>
              <th className="report-table--col-600px">PARTES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="report-table__nocartule-title" colSpan={8}>
                {" "}
                -- NO CARTULE ESTA QUINCENA --{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={8}> Ultima Línea </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};
