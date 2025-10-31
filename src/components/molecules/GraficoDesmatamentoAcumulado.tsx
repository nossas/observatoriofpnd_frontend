import { Column } from "@ant-design/plots";
import { formatNumber } from "services/utils";
import { FC } from "react";
import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

type graficoDesmatamentoAcumuladoProps = {
  data: Array<object>;
};

interface DataItem {
  xField: number;
  yField: number;
}

const years_interval = {
  initial: 2007,
  final: 2024,
};

export const GraficoDesmatamentoAcumulado: FC<
  graficoDesmatamentoAcumuladoProps
> = ({ data }) => {
  const { t } = useTranslation();

  const config = {
    data: data,
    xField: "xField",
    yField: "yField",
    width: 300,
    height: 200,
    scale: {
      x: {
        padding: 0.5,
      },
    },
    axis: {
      y: {
        title: "Hectare",
        titleSpacing: -5,
        labelFormatter: "~s",
      },
    },
    style: {
      radiusTopLeft: 2,
      radiusTopRight: 2,
      fill: "#d8952a",
    },
    tooltip: (d: DataItem) => {
      return {
        value: `${formatNumber(d.yField, 2)} ha`,
      };
    },
  };

  return (
    <Flex vertical align="center" justify="center">
      <Text strong style={{ fontSize: "14px" }}>
        {t("cumulative_deforestation", {
          initial_year: years_interval.initial,
          final_year: years_interval.final,
        })}
      </Text>
      <Column {...config} />
    </Flex>
  );
};
