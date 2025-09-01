import React, { useEffect } from "react";
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

interface DeforestationProps {
  infoData: any;
  searchParams?: any;
}

const Deforestation: React.FC<DeforestationProps> = ({
  infoData,
  searchParams,
}) => {
  const { esfera } = searchParams;

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
      items={[
        {
          label: (
            <InfoHeader
              title="Desmatamento"
              description={`A área desmatada total nas FPND ${selectedEsfera} n${recortePrefixo} ${recorteNome} é de **${desmatamentoAreaHa}** de hectares.`}
              icon={headerIcons["desmatamento"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent highlighted={true} icon={highlightedIcons["arvore"]}>
                <Markdown
                  text={`Possui **${desmatamentoFlorestaNativaHa}** de hectares de floresta nativa.`}
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
                    text={`A área desmatada n${recortePrefixo} ${recorteNome} ${verboDesmatamento} **${formattedComparacao}%** de ${primeiroAno} a ${ultimoAno}.`}
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
