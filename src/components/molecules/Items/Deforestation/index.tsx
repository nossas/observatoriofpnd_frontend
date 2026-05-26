import React from "react";
import { Collapse, Flex } from "antd";
import { InfoContent, InfoHeader, Markdown } from "components/atoms";
import {
  headerIcons,
  highlightedIcons,
  parseToPlural,
} from "components/molecules/Entenda";
import { GraficoDesmatamentoRecorte } from "components/molecules/GraficoDesmatamentoRecorte";
import { GraficoDesmatamentoAcumulado } from "components/molecules/GraficoDesmatamentoAcumulado";
import { Esferas } from "services/data";
import { useTranslation } from "react-i18next";

interface DeforestationProps {
  infoData: any;
  searchParams?: any;
}

const Deforestation: React.FC<DeforestationProps> = ({
  infoData,
  searchParams,
}) => {
  const { esfera } = searchParams;
  const { t } = useTranslation();

  const {
    recortePrefixo,
    recorteNome,
    desmatamentoAreaHa,
    desmatamentoFlorestaNativaHa,
    desmatamentoGraficoFpnd,
    verboDesmatamento,
    desmatamentoComparacaoPrimeiroAnoUltimoAnoPer,
    primeiroAno,
    ultimoAno,
    desmatamentoGraficoDesmatamentoAcumulado,
  } = infoData;

  const formattedComparacao = Math.abs(
    desmatamentoComparacaoPrimeiroAnoUltimoAnoPer
  );

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
              title={t("deforestation")}
              description={t("total_deforested_area_fpnd", {
                selectedEsfera,
                recortePrefixo,
                recorteNome,
                desmatamentoAreaHa,
              })}
              icon={headerIcons["desmatamento"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent highlighted={true} icon={highlightedIcons["arvore"]}>
                <Markdown
                  text={t('native_forest_area', {
                    desmatamentoFlorestaNativaHa,
                  })}
                  highlighted={true}
                />
              </InfoContent>

              {desmatamentoGraficoFpnd && (
                <GraficoDesmatamentoRecorte
                  data={desmatamentoGraficoFpnd}
                  recorteTerritorial={`${recortePrefixo} ${recorteNome}`}
                  esfera={selectedEsfera}
                />
              )}

              {formattedComparacao !== 0 && (
                <InfoContent>
                  <Markdown
                    text={t('deforestation_change_over_time', {
                      recortePrefixo,
                      recorteNome,
                      verboDesmatamento,
                      formattedComparacao,
                      primeiroAno,
                      ultimoAno,
                    })}
                  />
                </InfoContent>
              )}

              {desmatamentoGraficoDesmatamentoAcumulado?.length > 0 && (
                <GraficoDesmatamentoAcumulado
                  data={desmatamentoGraficoDesmatamentoAcumulado}
                />
              )}
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default Deforestation;
