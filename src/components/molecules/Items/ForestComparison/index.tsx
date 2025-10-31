import React from "react";
import { Collapse, Flex } from "antd";
import { InfoContent, InfoHeader, Markdown } from "components/atoms";
import { headerIcons } from "components/molecules/Entenda";
import { Esferas } from "services/data";
import { useTranslation } from "react-i18next";

interface ForestComparisonProps {
  infoData: any;
  searchParams: any;
}

const ForestComparison: React.FC<ForestComparisonProps> = ({
  infoData,
  searchParams,
}) => {
  const { esfera } = searchParams;
  const { t } = useTranslation();
  const {
    recortePrefixo,
    recorteNome,
    categoriaFpndEstadualAreaPer,
    categoriaFpndFederalAreaPer,
  } = infoData;

  const selectedEsfera =
    typeof esfera === "number" ? Esferas[esfera as unknown as Esferas] : "";

  const defaultText = t("fpnd_federal_state_distribution", {
    recortePrefixo,
    recorteNome,
    categoriaFpndEstadualAreaPer,
    categoriaFpndFederalAreaPer,
  });

  const estadualText = t("fpnd_state_percentage", {
    recortePrefixo,
    recorteNome,
    categoriaFpndEstadualAreaPer,
  });

  const federalText = t("fpnd_federal_percentage", {
    recortePrefixo,
    recorteNome,
    categoriaFpndFederalAreaPer,
  });

  const message =
    {
      Estadual: estadualText,
      Federal: federalText,
    }[selectedEsfera] || defaultText;

  return (
    <Collapse
      bordered={false}
      expandIconPosition="end"
      items={[
        {
          label: (
            <InfoHeader
              title={t("state_vs_federal_forests")}
              description={t('fpnd_jurisdiction_description')}
              icon={headerIcons["florestasEstaduaisxFederais"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent highlighted={true}>
                <Markdown text={message} highlighted={true} />
              </InfoContent>
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default ForestComparison;
