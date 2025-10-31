import { Flex, Typography } from "antd";
import { Pie } from "@ant-design/plots";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type graficoDesmatamentoProps = {
  data: Array<object>;
  recorteTerritorial: String;
  esfera?: string;
};
const { Text } = Typography;

interface DataItem {
  angleField: number;
  colorField: string;
}

export const GraficoDesmatamentoRecorte: FC<graficoDesmatamentoProps> = ({
  data,
  recorteTerritorial,
  esfera,
}) => {
  const { t } = useTranslation();
  const config = {
    data: data,
    angleField: "angleField",
    colorField: "colorField",
    innerRadius: 0.02,
    height: 200,
    width: 300,
    scale: {
      color: {
        range: ["#0f5427", "#d8952a"],
      },
    },
    legend: {
      color: {
        title: false,
        position: "bottom",
        layout: { justifyContent: "center" },
      },
    },
    label: {
      text: ({ angleField }: { angleField: string | number }) => {
        return angleField + "%";
      },
    },
    tooltip: (d: DataItem) => {
      return {
        value: `${d.colorField}: ${d.angleField}%`,
      };
    },
  };

  return (
    <Flex vertical align="center" justify="center">
      <Text strong style={{ fontSize: "14px" }}>
        {t("fpnd_with_scope", { esfera, recorteTerritorial })}
      </Text>
      <Pie {...config} />
    </Flex>
  );
};
