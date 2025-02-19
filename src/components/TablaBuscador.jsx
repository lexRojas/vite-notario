import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import axios from "axios";

export const TablaBuscador = (props) => {
  const [datos, setdatos] = useState([]);
  const URL = "https://mysql-fastapi.vercel.app/";

  const {escritura, tomo, asiento} = props

  
  useEffect(() => {

    
    let mi_escritura = escritura===''?'0':escritura
    let mi_tomo = tomo===''?'0':tomo
    let mi_asiento = asiento===''?'0':asiento

    console.log(mi_escritura, mi_tomo, mi_asiento)


    const endpoint = URL + "indice_by_citas";
    const getInfo = async () => {
      await axios
        .get(endpoint, {
          params: {
            escritura:mi_escritura,
            tomo: mi_tomo,
            asiento: mi_asiento
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
  }, [escritura, tomo, asiento]);

  if (datos.length > 0) {
    return (
      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th className="">NUMERO</th>
              <th className="">FECHA</th>
              <th className="">ACTO O CONTRATO</th>
              <th className="">PARTES</th>
            </tr>
          </thead>
          <tbody>
            {datos.map(({ ValoresUsuales }) => (
               ValoresUsuales.escritura<999 && <tr key={ValoresUsuales.escritura}>
                <td className="table--text-center"> {ValoresUsuales.escritura} </td>
                <td> {ValoresUsuales.fecha} </td>
                <td> {ValoresUsuales.contrato} </td>
                <td> {ValoresUsuales.partes} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="">
        <table className="table">
          <thead className="">
            <tr>
              <th className="">NUMERO</th>
              <th className="">FECHA</th>
              <th className="">ACTO O CONTRATO</th>
              <th className="">PARTES</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    );
  }
};

// Definir los tipos de las props
TablaBuscador.propTypes = {
  escritura: PropTypes.string, // `string` y es requerido
  tomo: PropTypes.string,              // `number` y no es requerido
  asiento: PropTypes.string             // `boolean` y no es requerido
};

// Valores por defecto para las props opcionales
TablaBuscador.defaultProps = {
  escritura:'0',
  tomo:'0',
  asiento:'0'

};