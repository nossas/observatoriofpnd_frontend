import { Button, Collapse, Flex, Typography } from "antd";
import { useLoaderData, useSearch } from "@tanstack/react-router";
import { getVerboDesmatamento, parseToPlural } from "./Entenda";
import { useTranslation } from "react-i18next";
import UnderstandContent from "./Items/UnderstandContent";
import ForestComparison from "./Items/ForestComparison";
import MonthlyDeforestationAlert from "./Items/MonthlyDeforestationAlert";
import Deforestation from "./Items/Deforestation";
import CarbonStock from "./Items/CarbonStock";
import SpeciesRichness from "./Items/SpeciesRichness";
import CAR from "./Items/CAR";
import MiningExploration from "./Items/MiningExploration";

const url = import.meta.env.VITE_URL_COMO_AGIR;

const { Text } = Typography;

export const EntendaMobile = () => {
  const { t } = useTranslation();
  const infoData = useLoaderData({ from: "/" });
  const searchParams = useSearch({ from: "/" });
  const { camada } = searchParams;

  const newInfoData = {
    ...infoData,
    esfera: t(parseToPlural(infoData?.esfera ?? "")),
    verboDesmatamento: getVerboDesmatamento(
      infoData.desmatamentoComparacaoPrimeiroAnoUltimoAnoPer,
      t
    ),
  };

  return (
    <>
      {newInfoData && (
        <>
          <Collapse
            bordered={false}
            collapsible="disabled"
            defaultActiveKey={0}
            style={{
              background: "white",
            }}
            items={[
              {
                children: (
                  <Flex gap={24} vertical>
                    <UnderstandContent
                      infoData={newInfoData}
                      searchParams={searchParams}
                    />

                    <Flex gap={8} vertical>
                      {!camada && (
                        <ForestComparison
                          infoData={newInfoData}
                          searchParams={searchParams}
                        />
                      )}

                      {(typeof camada === "undefined" ||
                        Number(camada) === 2) && (
                        <>
                          <MonthlyDeforestationAlert
                            infoData={newInfoData}
                            searchParams={searchParams}
                          />

                          <Deforestation
                            infoData={newInfoData}
                            searchParams={searchParams}
                          />
                        </>
                      )}

                      {(typeof camada === "undefined" ||
                        Number(camada) === 3) && (
                        <CarbonStock
                          infoData={newInfoData}
                          searchParams={searchParams}
                        />
                      )}

                      {(typeof camada === "undefined" ||
                        Number(camada) === 4) && (
                        <SpeciesRichness
                          infoData={newInfoData}
                          searchParams={searchParams}
                        />
                      )}

                      {(typeof camada === "undefined" ||
                        Number(camada) === 5) && (
                        <CAR
                          infoData={newInfoData}
                          searchParams={searchParams}
                        />
                      )}

                      {(typeof camada === "undefined" ||
                        Number(camada) === 6) && (
                        <MiningExploration
                          infoData={newInfoData}
                          searchParams={searchParams}
                        />
                      )}
                    </Flex>
                  </Flex>
                ),
              },
            ]}
          />
          <Flex
            vertical
            gap={8}
            style={{
              backgroundColor: "white",
              borderRadius: "0 0 10px 10px",
              padding: "10px",
            }}
          >
            <Button
              href={url}
              ghost
              style={{ fontWeight: "bold", width: "100%", borderRadius: 12 }}
              target="_blank"
              type="primary"
            >
              <Text strong style={{ fontSize: "16px", color: "#0C4921" }}>
                {t("how_to_act")}
              </Text>
            </Button>
            <Button
              href="https://deolhonasflorestaspublicas.org.br"
              ghost
              style={{ fontWeight: "bold", width: "100%", borderRadius: 12 }}
              type="primary"
            >
              <Text strong style={{ fontSize: "16px", color: "#0C4921" }}>
                Retornar ao site
              </Text>
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};
