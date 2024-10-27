import "../styles/modalPanel.css";
import logoOk from "../images/ok.png";
import logoCancel from "../images/cancel.svg";

export const MensajeOK = (props) => {
  const { tipoMensaje, mensaje } = props;

  return (
    <div className="modal">
      <div className="modal-menssage">
        {tipoMensaje.toUpperCase() === "OK" ? (
          <img src={logoOk} alt="Ok" />
        ) : (
          <img src={logoCancel} alt="Ok" />
        )}
        <span>{mensaje ? mensaje :  tipoMensaje.toUpperCase() === "OK" ? "Guardado OK" : "Error!"} </span>
      </div>
    </div>
  );
};
