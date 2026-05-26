import React from "react";
import { Collapse, Flex } from "antd";
import {
  AlertaGrilagem,
  ExclamationTriangleFill,
  InfoContent,
  InfoHeader,
  Markdown,
} from "components/atoms";
import {
  headerIcons,
  highlightedIcons,
  parseToPlural,
} from "components/molecules/Entenda";
import { GraficoCARSobreposicao } from "components/molecules/GraficoCARSobreposicao";
import { Esferas } from "services/data";
import { useTranslation } from "react-i18next";

interface CARProps {
  infoData: any;
  searchParams?: any;
}

const CAR: React.FC<CARProps> = ({ infoData, searchParams }) => {
  const { esfera } = searchParams;
  const { t } = useTranslation();

  const {
    carSobreposicaoFpndAreaHa,
    carSobreposicaoFpndEquivalenciaFutebolQtd,
    recortePrefixo,
    recorteNome,
    carComparacaoDesmatamento,
    carGrafico,
  } = infoData;

  const selectedEsfera =
    typeof esfera === "number"
      ? parseToPlural(Esferas[esfera as unknown as Esferas]).toLowerCase()
      : "";

  return (
    <Collapse
      bordered={false}
      expandIconPosition="end"
      style={{ background: "rgba(0, 0, 0, 0.05)" }}
      items={[
        {
          label: (
            <InfoHeader
              title={t("rural_environmental_registry")}
              description={t("irregular_car_overlap_fpnd", {
                carSobreposicaoFpndAreaHa,
                recortePrefixo,
                recorteNome,
                selectedEsfera,
              })}
              icon={headerIcons["car"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent
                highlighted={true}
                icon={highlightedIcons["campoDeFutebol"]}
              >
                <Markdown
                  text={t("equivalent_football_fields", {
                    carSobreposicaoFpndEquivalenciaFutebolQtd,
                  })}
                  highlighted={true}
                />
              </InfoContent>

              <InfoContent>
                <Flex gap={12} vertical>
                  <AlertaGrilagem
                    icon={
                      <ExclamationTriangleFill
                        style={{
                          color: "#c32c18",
                          fontSize: "24px",
                        }}
                      />
                    }
                  />
                  <Markdown text={t("car_presence_warning")} />
                  <Markdown text={t("ipam_abrampla_study_summary")} />
                  <Markdown
                    text={t("car_to_deforestation_ratio", {
                      selectedEsfera,
                      recortePrefixo,
                      recorteNome,
                      carComparacaoDesmatamento,
                    })}
                  />
                </Flex>
              </InfoContent>

              <GraficoCARSobreposicao data={carGrafico} />
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default CAR;
