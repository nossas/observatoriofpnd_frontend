import React from "react";
import { Collapse, Flex } from "antd";
import { InfoContent, InfoHeader, Markdown } from "components/atoms";
import {
  headerIcons,
  highlightedIcons,
  parseToPlural,
} from "components/molecules/Entenda";
import { GraficoAlertaDesmatamento } from "components/molecules/GraficoAlertaDesmatamento";
import { Esferas } from "services/data";

interface MonthlyDeforestationAlertProps {
  infoData: any;
  searchParams?: any;
}

const MonthlyDeforestationAlert: React.FC<MonthlyDeforestationAlertProps> = ({
  infoData,
  searchParams,
}) => {
  const { esfera } = searchParams;

  const {
    ultimoMes,
    alertaMensalDesmatamentoUltimoMesHa,
    alertaMensalDesmatamentoComparacaoMesmoMesAnoAnterioPer,
    alertaMensalDesmatamentoComparacaoMesmoMesAnoAnterioDirecao,
  } = infoData;

  const selectedEsfera =
    typeof esfera === "number"
      ? parseToPlural(Esferas[esfera as unknown as Esferas]).toLowerCase()
      : "";

  const noHasData =
    Boolean(selectedEsfera) && alertaMensalDesmatamentoUltimoMesHa === "0";
  
  return (
    <Collapse
      bordered={false}
      expandIconPosition="end"
      items={[
        {
          label: (
            <InfoHeader
              title="Alerta mensal de desmatamento"
              description={`No mês de ${ultimoMes} foram desmatados **${alertaMensalDesmatamentoUltimoMesHa}** hectares em FPND${selectedEsfera ? ' '.concat(selectedEsfera) : ''}.`}
              icon={headerIcons["alertaMensalDeDesmatamento"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent
                highlighted={true}
                icon={alertaMensalDesmatamentoComparacaoMesmoMesAnoAnterioDirecao === 'maior' ? highlightedIcons["graficoUp"] : highlightedIcons["graficoDown"]}
              >
                <Markdown
                  text={
                    noHasData
                      ? "Não há dados para exibir."
                      : `**${alertaMensalDesmatamentoComparacaoMesmoMesAnoAnterioPer}%** ${alertaMensalDesmatamentoComparacaoMesmoMesAnoAnterioDirecao} em relação ao mesmo mês do ano anterior`
                  }
                  highlighted={true}
                />
              </InfoContent>

              {!noHasData && (
                <GraficoAlertaDesmatamento
                  data={infoData.alertaMensalGraficoHistoricoDesmatamento}
                />
              )}
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default MonthlyDeforestationAlert;
