import React from "react";
import { Collapse, Flex } from "antd";
import { InfoContent, InfoHeader, Markdown } from "components/atoms";
import { headerIcons, parseToPlural } from "components/molecules/Entenda";
import { Esferas } from "services/data";

interface ForestComparisonProps {
  infoData: any;
  searchParams: any;
}

const ForestComparison: React.FC<ForestComparisonProps> = ({
  infoData,
  searchParams,
}) => {
  const { esfera } = searchParams;
  const {
    recortePrefixo,
    recorteNome,
    categoriaFpndEstadualAreaPer,
    categoriaFpndFederalAreaPer,
  } = infoData;

  const selectedEsfera =
    typeof esfera === "number" ? Esferas[esfera as unknown as Esferas] : "";

  const defaultText = `N${recortePrefixo} ${recorteNome}, **${categoriaFpndEstadualAreaPer}%** das FPND são estaduais, enquanto **${categoriaFpndFederalAreaPer}%** são federais.`;
  const estadualText = `N${recortePrefixo} ${recorteNome}, **${categoriaFpndEstadualAreaPer}%** das FPND são estaduais.`;
  const federalText = `N${recortePrefixo} ${recorteNome}, **${categoriaFpndFederalAreaPer}%** das FPND são federais.`;

  const message = {
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
              title="Florestas estaduais x federais"
              description="As Florestas Públicas Não Destinadas (FPND) estão sob jurisdição dos estados ou do governo federal."
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
