import React from "react";
import { Flex } from "antd";
import { InfoContent, Markdown } from "components/atoms";
import { highlightedIcons, parseToPlural } from "components/molecules/Entenda";
import { Esferas } from "services/data";

interface UnderstandContentProps {
  infoData: any;
  searchParams?: any;
}

const UnderstandContent: React.FC<UnderstandContentProps> = ({ infoData, searchParams }) => {
  const { recortePrefixo, recorteNome, entendaFpndAreaTotalHa, entendaFpndEquivalenciaFutebolQtd } =
    infoData;

  const { esfera } = searchParams;

  const selectedEsfera = typeof esfera === 'number' ? parseToPlural(Esferas[esfera as unknown as Esferas]).toLowerCase() : '';

  return (
    <Flex gap={24} vertical>
      <InfoContent highlighted={false}>
        <Flex gap={8} vertical>
          <Markdown
            text={`Há **${entendaFpndAreaTotalHa}** de hectares de florestas públicas não-destinadas ${selectedEsfera} presentes n${recortePrefixo} ${recorteNome}.`}
            highlighted={false}
          />
        </Flex>
      </InfoContent>

      <InfoContent
        highlighted={false}
        icon={highlightedIcons["campoDeFutebol"]}
      >
        <Markdown
          text={`Isso equivale a **${entendaFpndEquivalenciaFutebolQtd}** de campos de futebol.`}
          highlighted={true}
        />
      </InfoContent>
    </Flex>
  );
};

export default UnderstandContent;
