import React from "react";
import { Flex } from "antd";
import { InfoContent, Markdown } from "components/atoms";
import { highlightedIcons, parseToPlural } from "components/molecules/Entenda";
import { Esferas } from "services/data";
import { useTranslation } from "react-i18next";

interface UnderstandContentProps {
  infoData: any;
  searchParams?: any;
}

const UnderstandContent: React.FC<UnderstandContentProps> = ({
  infoData,
  searchParams,
}) => {
  const {
    recortePrefixo,
    recorteNome,
    entendaFpndAreaTotalHa,
    entendaFpndEquivalenciaFutebolQtd,
  } = infoData;

  const { esfera } = searchParams;
  const { t } = useTranslation();

  const selectedEsfera =
    typeof esfera === "number"
      ? parseToPlural(Esferas[esfera as unknown as Esferas]).toLowerCase()
      : "";

  return (
    <Flex gap={24} vertical>
      <InfoContent highlighted={false}>
        <Flex gap={8} vertical>
          <Markdown
            text={t("fpnd_total_area", {
              entendaFpndAreaTotalHa,
              selectedEsfera,
              recortePrefixo,
              recorteNome,
            })}
            highlighted={false}
          />
        </Flex>
      </InfoContent>

      <InfoContent
        highlighted={false}
        icon={highlightedIcons["campoDeFutebol"]}
      >
        <Markdown
          text={t("fpnd_equivalent_football_fields", {
            entendaFpndEquivalenciaFutebolQtd,
          })}
          highlighted={true}
        />
      </InfoContent>
    </Flex>
  );
};

export default UnderstandContent;
