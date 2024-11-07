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
  const { unidad, ancho, alto } = page;

  html2canvas(input, { scale: 1 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait", // "portrait" o "landscape"
      unit: unidad, // "pt", "mm", "cm", "in"
      format: [ancho, alto], // [ancho, alto] en la unidad especificada
    });

    const xOffset = 5;
    const yOffset = 5;
    // const imgWidth = pdf.internal.pageSize.getWidth() - 20;
    // const imgHeight = pdf.internal.pageSize.getHeight() - 20;

    //   pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
    pdf.addImage(imgData, "PNG", xOffset, yOffset);
    pdf.save("boleta.pdf");
  });
};

export const converDIV_to_img_to_whatsap = (component) => {
  const input = component.current;

  html2canvas(input, { scale: 1 }).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");

    // Codificar la imagen para enviar por WhatsApp
    const encodedImage = encodeURIComponent(imageData);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedImage}`;

    // Redirigir al usuario para enviar la imagen por WhatsApp
    window.open(whatsappURL, "_blank");
  });
};

export const shareImage = async (component) => {
  const input = component.current;
  if (
    navigator.share &&
    navigator.canShare &&
    navigator.canShare({ files: [new File([], "test.png")] })
  ) {
    try {
      html2canvas(input, { scale: 1 }).then(async (canvas) => {
        canvas.toBlob(async (blob) => {
          const file = new File([blob], "imagen-compartida.png", {
            type: blob.type,
          });

          await navigator.share({
            files: [file],
            title: "Compartir Imagen",
            text: "Mira esta imagen",
          });
        });
      });

      console.log("Imagen compartida exitosamente");
    } catch (error) {
      console.error("Error al compartir la imagen:", error);
    }
  } else {
    alert(
      "La función de compartir archivos no es compatible con este navegador."
    );
  }
};

export const sharePDF = async (component, page) => {
  const { unidad, ancho, alto } = page;
  const input = component.current;

  if (
    navigator.share &&
    navigator.canShare &&
    navigator.canShare({ files: [new File([], "test.png")] })
  ) {
    try {
      html2canvas(input, { scale: 2 }).then(
        async (canvas) => {
          const pdf = new jsPDF({
            orientation: "portrait", // "portrait" o "landscape"
            unit: unidad, // "pt", "mm", "cm", "in"
            format: [ancho, alto], // [ancho, alto] en la unidad especificada
          });

          const xOffset = 5;
          const yOffset = 5;

          const imgData = canvas.toDataURL("image/png");

          pdf.addImage(imgData, "PNG", xOffset, yOffset);

          // esta corriendo mi web en un MOVIL
          if (navigator.userAgentData && navigator.userAgentData.mobile) {
            const blob_file = pdf.output("blob");

            const filePDF = new File([blob_file], "reporte.pdf", {
              type: blob_file.type,
            });

            await navigator.share({
              files: [filePDF],
              title: "Compartir Imagen",
              text: "Mira esta imagen",
            });
          } else {

            // esta corriendo mi web en una PC
            pdf.save("boleta.pdf");
          }
        }
      );
    } catch (error) {
      console.error("Error al compartir la imagen:", error);
    }
  } else {
    alert(
      "La función de compartir archivos no es compatible con este navegador."
    );
  }
};
