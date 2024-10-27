/* eslint-disable no-unused-vars */
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function getMes(fecha=new Date()) {
  let f = new Date(fecha);

  let m = f.getMonth();

  return meses[m];
}

export function getQuincena(fecha=new Date()) {
  let f = new Date(fecha);

  let d = f.getDay();

  if (d <= 15) {
    return "primera";
  } else {
    return "segunda";
  }
}

export function getAno(fecha=new Date()) {
  let f = new Date(fecha);

  let y = f.getFullYear();

  return y;
}


export function getHora(fecha=new Date()) {
  let f = new Date(fecha);

  let h = f.getHours()

  return h;
}

export function getMinutos(fecha=new Date()) {
  let f = new Date(fecha);

  let m = f.getMinutes()

  return m;
}




export function getMesNumber(mes) {
  let index = 0;
  let result = 0;
  meses.forEach((element) => {
    if (element === mes) {
      result = index;
    }
    index += 1;
  });

  return result;
}

export function getFecha__yyMMdd(fecha=new Date()) {
  const fechaActual = new Date(fecha);

  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por lo que se le suma 1
  const day = String(fechaActual.getDate()).padStart(2, "0"); // Asegura que siempre tenga 2 dígitos

  const fechaFormateada = `${year}-${month}-${day}`;

  return fechaFormateada
}
