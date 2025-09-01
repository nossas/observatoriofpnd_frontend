import React from "react";
import { Collapse, Flex } from "antd";
import { InfoContent, InfoHeader, Markdown } from "components/atoms";
import { headerIcons, highlightedIcons, parseToPlural } from "components/molecules/Entenda";
import { Esferas } from "services/data";

interface MiningExplorationProps {
  infoData: any;
  searchParams?: any;
}

const MiningExploration: React.FC<MiningExplorationProps> = ({
  infoData,
  searchParams,
}) => {
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
              title="Mineração"
              description={`A área de mineração total (industrial e garimpo) em 2022 nas FPNDs ${selectedEsfera} n${recortePrefixo} **${recorteNome}** corresponde a **${mineracaoSobreposicaoFpndAreaHa}** hectares.`}
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
                  text={`Isso equivale a **${mineracaoSobreposicaoFpndEquivalenciaFutebolQtd}** campos de futebol.`}
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
