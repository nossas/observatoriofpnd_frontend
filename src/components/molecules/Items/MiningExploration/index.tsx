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

interface MiningExplorationProps {
  infoData: any;
  searchParams?: any;
}

const MiningExploration: React.FC<MiningExplorationProps> = ({
  infoData,
  searchParams,
}) => {
  const { t } = useTranslation();
  const {
    recortePrefixo,
    recorteNome,
    mineracaoSobreposicaoFpndAreaHa,
    mineracaoSobreposicaoFpndEquivalenciaFutebolQtd,
  } = infoData;

  const { esfera } = searchParams;

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
              title={t("mining")}
              description={t("total_mining_area_fpnd", {
                selectedEsfera,
                recortePrefixo,
                recorteNome,
                mineracaoSobreposicaoFpndAreaHa,
              })}
              icon={headerIcons["mineracao"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent
                highlighted={true}
                icon={highlightedIcons["campoDeFutebol"]}
              >
                <Markdown
                  text={t("mining_equivalent_football_fields", {
                    mineracaoSobreposicaoFpndEquivalenciaFutebolQtd,
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

export default MiningExploration;
