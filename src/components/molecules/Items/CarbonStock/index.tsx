import React from "react";
import { Collapse, Flex } from "antd";
import { InfoContent, InfoHeader, Markdown } from "components/atoms";
import {
  headerIcons,
  highlightedIcons,
  parseToPlural,
} from "components/molecules/Entenda";
import { Esferas } from "services/data";
import { useTranslation } from "react-i18next";

interface CarbonStockProps {
  infoData: any;
  searchParams?: any;
}

const CarbonStock: React.FC<CarbonStockProps> = ({
  infoData,
  searchParams,
}) => {
  const { esfera } = searchParams;
  const { t } = useTranslation();

  const {
    recortePrefixo,
    recorteNome,
    estoqueCarbonoTon,
    estoqueCarbonoEquivalenciaPesoTon,
  } = infoData;

  const selectedEsfera =
    typeof esfera === "number"
      ? parseToPlural(Esferas[esfera as unknown as Esferas]).toLowerCase()
      : "";

  return (
    <Collapse
      bordered={false}
      expandIconPosition="end"
      items={[
        {
          label: (
            <InfoHeader
              title={t("carbon_stock")}
              description={t("carbon_stock_definition")}
              icon={headerIcons["estoqueDeCarbono"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent>
                <Markdown
                  text={t("fpnd_carbon_storage", {
                    selectedEsfera,
                    recortePrefixo,
                    recorteNome,
                    estoqueCarbonoTon,
                  })}
                />
              </InfoContent>

              <InfoContent highlighted={true} icon={highlightedIcons["co2"]}>
                <Markdown
                  text={t("equivalent_co2_avoided", {
                    estoqueCarbonoEquivalenciaPesoTon,
                  })}
                  highlighted={true}
                />
              </InfoContent>
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default CarbonStock;
