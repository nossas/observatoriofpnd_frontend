import React from "react";
import { Collapse, Flex } from "antd";
import { InfoContent, InfoHeader, Markdown } from "components/atoms";
import {
  headerIcons,
  highlightedIcons,
  parseToPlural,
} from "components/molecules/Entenda";
import { GraficoAlertaFogo } from "components/molecules/GraficoAlertaFogo";
import { Esferas } from "services/data";
import { useTranslation } from "react-i18next";

interface MonthlyFireAlertProps {
  infoData: any;
  searchParams?: any;
}

const MonthlyFireAlert: React.FC<MonthlyFireAlertProps> = ({
  infoData,
  searchParams,
}) => {
  const { esfera } = searchParams;
  const { t } = useTranslation();

  const {
    ultimoMesFogo,
    alertaMensalFogoUltimoMesHa,
    alertaMensalFogoComparacaoMesmoMesAnoAnterioPer,
    alertaMensalFogoComparacaoMesmoMesAnoAnterioDirecao,
  } = infoData;

  const selectedEsfera =
    typeof esfera === "number"
      ? parseToPlural(Esferas[esfera as unknown as Esferas]).toLowerCase()
      : "";

  const noHasData =
    Boolean(selectedEsfera) && alertaMensalFogoUltimoMesHa === "0";

  return (
    <Collapse
      bordered={false}
      expandIconPosition="end"
      style={{ background: "rgba(0, 0, 0, 0.05)" }}
      items={[
        {
          label: (
            <InfoHeader
              title={t("monthly_fire_alert")}
              description={t("monthly_fire_summary", {
                ultimoMesFogo: t(ultimoMesFogo),
                alertaMensalFogoUltimoMesHa,
                selectedEsfera: selectedEsfera ?? "",
              })}
              icon={headerIcons["alertaMensalDeFogo"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent
                highlighted={true}
                icon={
                  alertaMensalFogoComparacaoMesmoMesAnoAnterioDirecao ===
                  "maior"
                    ? highlightedIcons["graficoUp"]
                    : highlightedIcons["graficoDown"]
                }
              >
                <Markdown
                  text={
                    noHasData
                      ? t("no_data_to_display")
                      : t("fire_monthly_comparison_previous_year", {
                          ultimoMesFogo: t(ultimoMesFogo),
                          alertaMensalFogoComparacaoMesmoMesAnoAnterioPer,
                          alertaMensalFogoComparacaoMesmoMesAnoAnterioDirecao,
                        })
                  }
                  highlighted={true}
                />
              </InfoContent>

              {!noHasData && (
                <GraficoAlertaFogo
                  data={infoData.alertaMensalGraficoHistoricoFogo}
                />
              )}
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default MonthlyFireAlert;
