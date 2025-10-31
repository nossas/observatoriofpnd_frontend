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
import { useTranslation } from "react-i18next";

interface MonthlyDeforestationAlertProps {
  infoData: any;
  searchParams?: any;
}

const MonthlyDeforestationAlert: React.FC<MonthlyDeforestationAlertProps> = ({
  infoData,
  searchParams,
}) => {
  const { esfera } = searchParams;
  const { t } = useTranslation();

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
              title={t("monthly_deforestation_alert")}
              description={t("monthly_deforestation_summary", {
                ultimoMes,
                alertaMensalDesmatamentoUltimoMesHa,
                selectedEsfera: selectedEsfera ?? "",
              })}
              icon={headerIcons["alertaMensalDeDesmatamento"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent
                highlighted={true}
                icon={
                  alertaMensalDesmatamentoComparacaoMesmoMesAnoAnterioDirecao ===
                  "maior"
                    ? highlightedIcons["graficoUp"]
                    : highlightedIcons["graficoDown"]
                }
              >
                <Markdown
                  text={
                    noHasData
                      ? t("no_data_to_display")
                      : t("deforestation_monthly_comparison_previous_year", {
                          alertaMensalDesmatamentoComparacaoMesmoMesAnoAnterioPer,
                          alertaMensalDesmatamentoComparacaoMesmoMesAnoAnterioDirecao,
                        })
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
