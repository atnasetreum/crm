import { nowDateWithTime } from "../utils";

export const optionsChartDefault = {
  subtitle: {
    text: nowDateWithTime(),
  },
  lang: {
    viewFullscreen: "Ver en pantalla completa",
    printChart: "Imprimir gráfica",
    downloadPNG: "Descargar imagen PNG",
    downloadJPEG: "Descargar imagen JPEG",
    downloadPDF: "Descargar documento PDF",
    downloadSVG: "Descargar imagen SVG",
  },
  credits: {
    enabled: true,
    text: "Mario Gutiérrez García",
    href: 'javascript:window.open("https://www.linkedin.com/in/mario-gutierrez-garcia-7866751a6/?originalSubdomain=mx", "_blank")',
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
};
