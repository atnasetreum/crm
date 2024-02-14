"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { optionsChartDefault } from "@shared/libs";

if (typeof Highcharts === "object") {
  require("highcharts/modules/exporting")(Highcharts);
}

interface Props {
  data: {
    name: string;
    y: number;
    sliced?: boolean;
    selected?: boolean;
  }[];
}

export const ClientsByProjectChart = ({ data }: Props) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      containerProps={{ style: { height: "100%" } }}
      options={{
        ...optionsChartDefault,
        chart: {
          type: "pie",
        },
        title: {
          text: "Clientes por proyecto",
        },
        tooltip: {
          valueSuffix: "%",
        },
        plotOptions: {
          series: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: [
              {
                enabled: true,
                distance: 20,
              },
              {
                enabled: true,
                distance: -40,
                format: "{point.percentage:.1f}%",
                style: {
                  fontSize: "1.2em",
                  textOutline: "none",
                  opacity: 0.7,
                },
                filter: {
                  operator: ">",
                  property: "percentage",
                  value: 10,
                },
              },
            ],
          },
        },
        series: [
          {
            name: "Porcentaje",
            colorByPoint: true,
            data,
          },
        ],
      }}
    />
  );
};
