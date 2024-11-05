import jsPDF from "jspdf";
import html2canvas from "html2canvas";


/**
 * 
 * @param {*} component 
 * @param {string, number, number} page 
 * @description Esta funcion define el tamaño de la pagina
 */
export const converPDF = (component, page) => {
  
    const input = component.current;
    const {unidad, ancho, alto} = page



    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF(
        {
          orientation: "portrait", // "portrait" o "landscape"
          unit: unidad, // "pt", "mm", "cm", "in"
          format: [ancho, alto] // [ancho, alto] en la unidad especificada
        }
      );

      const xOffset = 5;
      const yOffset = 5;
      // const imgWidth = pdf.internal.pageSize.getWidth() - 20;
      // const imgHeight = pdf.internal.pageSize.getHeight() - 20;

    //   pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);  
      pdf.addImage(imgData, "PNG", xOffset, yOffset);  
      pdf.save("boleta.pdf");
    });
  };
  