import React, { useEffect, useState } from "react";
import axios from "axios";

const Filtro = (props) => {
  const [registros, setRegistros] = useState(null);
  const [actos, setActos] = useState(null);

  const setId_acto = props.setId_acto
  const setMonto   = props.setMonto



  const seleccion_registro = (e) => {
    let id_registro = e.target.value;
    get_actos(id_registro);
  };

  const get_actos = (id_registro) => {
    axios
      .get("https://mysql-backend-8bc5e268b39e.herokuapp.com/actos", {
        params: { idRegistro: id_registro },
      })
      .then((res) => {
        setActos(res.data);

        if (res.data[0]){
            setId_acto(res.data[0].id_acto)
        }else{
            setActos(null)
            setId_acto(-1)
        }

        
      });
  };

  const seleccion_actos = (e) => {
    let id_acto = e.target.value
    setId_acto(id_acto)
  };

  const cambia_monto=(e)=>{
    let monto = e.target.value
    setMonto(monto)
  }
    

  useEffect(() => {
    axios.get("https://mysql-backend-8bc5e268b39e.herokuapp.com/registros").then((res) => {
      setRegistros(res.data);
      get_actos(1);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="card__input-group">
        <label htmlFor="reg_select"> Registro:</label>
        <select name="registros" id="reg_select" onChange={seleccion_registro}>
          {registros ? (
            registros.map((opcion) => (
              <option value={opcion.id_registro} key={opcion.id_registro}>
                {" "}
                {opcion.registro_descripcion}
              </option>
            ))
          ) : (
            <option value="No hay registros">No hay registros</option>
          )}
        </select>
      </div>
      <div className="card__input-group">
        <label htmlFor="reg_actos"> Acto:</label>
        <select name="actos" id="reg_actos" onChange={seleccion_actos}>
          {actos ? (
            actos.map((opcion) => (
              <option value={opcion.id_acto} key={opcion.id_acto}>
                {" "}
                {opcion.acto_descripcion}
              </option>
            ))
          ) : (
            <option value="No hay registros">No hay registros</option>
          )}
        </select>
      </div>
      <div className="card__input-group">
        <label htmlFor="monto"> Digite el monto:</label>
        <input type="number" onChange={cambia_monto} />
      </div>

    </>
  );
};

export default Filtro;
