import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IndiceBrowser } from "../components/IndiceBrowser";
import axios from "axios";
import { MensajeOK } from "../components/MensajeOK";
import { getFecha__yyMMdd, getHora, getMinutos } from "../tools/tools";

const Formulario = () => {
  const navegar = useNavigate();
  const URL = "https://mysql-backend-8bc5e268b39e.herokuapp.com/";
  const [verBrowser, setverBrowser] = useState(false);
  const [showMessage, setVisibleMensaje] = useState(false);
  const [editando, setEditando] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState("OK");
  const [mensaje, setMensaje] = useState("");
  const [formError, setFormError] = useState({});
  const [fieldDisable, setfieldDisable] = useState(false);

  const [formData, setFormData] = useState({
    folio_1: "1",
    pag_1: "Frente",
    folio_2: "1",
    pag_2: "Vuelto",
    fecha: getFecha__yyMMdd(),
    escritura: "1",
    tomo: "1",
    partes: "",
    hora: getHora().toString(),
    minutos: getMinutos().toString(),
    contrato: "",
    entero: "",
    firmas: "1",
    lugar: "",
  });

  const fijarValoresPorDefecto = () => {
    setFormData({
      folio_1: "1",
      pag_1: "Frente",
      folio_2: "1",
      pag_2: "Vuelto",
      fecha: getFecha__yyMMdd(),
      escritura: "1",
      tomo: "1",
      partes: "",
      hora: getHora().toString(),
      minutos: getMinutos().toString(),
      contrato: "",
      entero: "",
      firmas: "1",
      lugar: "",
      asiento: "",
      tomo_registro: ""
    });

    setfieldDisable(false);
    setEditando(false);
    setMensaje(null);
  };

  const loadRecord = (registro) => {
    console.log(registro);

    const miRegistro = {
      id: registro.id,
      folio_1: registro.folio_1,
      pag_1: registro.pag_1,
      folio_2: registro.folio_2,
      pag_2: registro.pag_2,
      fecha: registro.fecha,
      escritura: registro.escritura,
      tomo: registro.tomo,
      partes: registro.partes,
      hora: registro.hora,
      minutos: registro.minutos,
      contrato: registro.contrato,
      entero: registro.entero,
      firmas: registro.firmas,
      lugar: registro.lugar,
      asiento: registro.asiento,
      tomo_registro: registro.tomo_registro
    };

    setFormData(miRegistro);
    setfieldDisable(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setFormError({ ...formError, [name]: value === "2" ? true : false });
    console.log(formError);
  };

  const presentarMensaje = async () => {
    setVisibleMensaje(true);

    setTimeout(() => {
      setVisibleMensaje(false);
      fijarValoresPorDefecto();
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = formData.id;
    const endpointPatch = `${URL}indice/?id=${id}`;
    const endpointPost = `${URL}indice/?indice=${formData}`;

    if (editando) {
      await axios
        .patch(endpointPatch, formData)
        .then((res) => {
          setTipoMensaje("OK");
          presentarMensaje();
        })
        .catch((e) => {
          setTipoMensaje("Error");
          console.log(e);
          setMensaje(e.message);
          presentarMensaje();
        });
    } else {
      console.log(formData);
      await axios
        .post(endpointPost, formData)
        .then((res) => {
          console.log("entramos a guardar datos... ")
          setTipoMensaje("ok");
          presentarMensaje();
        })
        .catch((e) => {
          console.log(e);
          setTipoMensaje("Error");
          setMensaje(e.message);
          presentarMensaje();
        });
    }
  };

  const handleCancel = () => {
    // Lógica para manejar la acción de cancelar
    fijarValoresPorDefecto();
    navegar("/menu");
  };

  const eliminar = async () => {
    const endpointDelete = `${URL}indice/${formData.id}`;

    console.log(endpointDelete);

    if (editando) {
      try {
        const response = await axios.delete(endpointDelete);

        setTipoMensaje("OK");
        setMensaje(response.data.message)
        presentarMensaje();
        
        
        
      } catch (e) {
        setTipoMensaje("Error");
        console.log(e);
        setMensaje(e);
        presentarMensaje();
      }
    }
  };

  const browser = () => {
    setverBrowser(true);
  };

  return (
    <div className="container">
      {showMessage ? (
        <div>
          <MensajeOK tipoMensaje={tipoMensaje} mensaje={mensaje} />
        </div>
      ) : (
        <></>
      )}

      {verBrowser ? (
        <div>
          {" "}
          <IndiceBrowser
            setverBrowser={setverBrowser}
            loadRecord={loadRecord}
            setEditando={setEditando}
            fijarValoresPorDefecto={fijarValoresPorDefecto}
          />{" "}
        </div>
      ) : (
        <></>
      )}
      <div className="card card--form-indice">
        <div className="card__body card--form-indice__body">
          <div className="card__header ">
            <h1>Ingreso de Indices</h1>
          </div>

          <form className="card--form-indice__body__form-layout">
            <div className="card__input-group tomo">
              <label>Tomo:</label>
              <input
                type="number"
                name="tomo"
                value={formData.tomo}
                onChange={handleChange}
                disabled={fieldDisable}
              />
            </div>
            <div className="card__input-group  escritura">
              <label>Escritura:</label>
              <div className="card__input-group__searchTextField ">
                <input
                  type="number"
                  name="escritura"
                  min="1"
                  value={formData.escritura}
                  onChange={handleChange}
                  disabled={fieldDisable}
                />
                <button type="button" onClick={browser}>
                  <img
                    src="https://img.icons8.com/material-outlined/24/ffffff/search--v1.png"
                    alt="Buscar"
                  />
                </button>
              </div>
              <div className="form__errorLabel">
                {formError.escritura && <span>Error en la escritura </span>}
              </div>
            </div>
            <div className="folios">
              <div className="card__input-group folio_num_inicio">
                <label>Folio Inicio:</label>
                <input
                  type="number"
                  name="folio_1"
                  value={formData.folio_1}
                  onChange={handleChange}
                />
              </div>
              <div className="card__input-group folio_fv_inicio">
                <label>Página Inicio :</label>

                <select
                  name="pag_1"
                  value={formData.pag_1}
                  onChange={handleChange}
                >
                  <option value="Frente">Frente</option>
                  <option value="Vuelto">Vuelto</option>
                </select>
              </div>
              <div className="card__input-group folio_num_final">
                <label>Folio Final:</label>
                <input
                  type="number"
                  name="folio_2"
                  value={formData.folio_2}
                  onChange={handleChange}
                />
              </div>
              <div className="card__input-group folio_fv_final">
                <label>Página Final:</label>

                <select
                  name="pag_2"
                  value={formData.pag_2}
                  onChange={handleChange}
                >
                  <option value="Frente">Frente</option>
                  <option value="Vuelto">Vuelto</option>
                </select>
              </div>
            </div>
            <div className="card__input-group lugar">
              <label>Lugar:</label>
              <input
                type="text"
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
              />
            </div>

            <div className="card__input-group fecha">
              <label>Fecha:</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
              />
            </div>

            <div className="card__input-group firmas_frm">
              <label>Firmas:</label>
              <input
                type="number"
                name="firmas"
                min="1"
                max="20"
                step="1"
                value={formData.firmas}
                onChange={handleChange}
              />
            </div>
            <div className="card__input-group hora">
              <label>Hora:</label>
              <input
                type="number"
                name="hora"
                min="1"
                max="23"
                step="1"
                value={formData.hora}
                onChange={handleChange}
              />
            </div>
            <div className="card__input-group minutos">
              <label>Minutos:</label>
              <input
                type="number"
                name="minutos"
                min="1"
                max="59"
                step="1"
                value={formData.minutos}
                onChange={handleChange}
              />
            </div>

            <div className="card__input-group partes">
              <label>Partes:</label>
              <textarea
                className="h-100"
                type="text"
                name="partes"
                value={formData.partes}
                onChange={handleChange}
              />
            </div>
            <div className="card__input-group contrato ">
              <label>Contrato:</label>
              <textarea
                className="h-100"
                type="text"
                name="contrato"
                value={formData.contrato}
                onChange={handleChange}
              />
            </div>
            <div className="card__input-group entero">
              <label>Entero:</label>
              <input
                type="text"
                name="entero"
                value={formData.entero}
                onChange={handleChange}
              />
            </div>
            <div className="card__input-group tomo_reg">
              <label>Tomo RN:</label>
              <input
                type="text"
                name="tomo_registro"
                value={formData.tomo_registro}
                onChange={handleChange}
              />
            </div>
            <div className="card__input-group asiento_reg">
              <label>Asiento RN:</label>
              <input
                type="text"
                name="asiento"
                value={formData.asiento}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className="card__button-panel">
          <button
            className="card__button-panel__button"
            type="submit"
            onClick={handleSubmit}
          >
            Guardar
          </button>
          {editando ? (
            <button
              className="card__button-panel__button"
              type="button"
              onClick={eliminar}
            >
              Eliminar
            </button>
          ) : (
            <></>
          )}
          <button
            className="card__button-panel__button"
            type="button"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
