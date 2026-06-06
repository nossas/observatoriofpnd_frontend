import { Collapse, Flex } from "antd";
import { useLoaderData, useSearch } from "@tanstack/react-router";
import { getVerboDesmatamento, parseToPlural } from "./Entenda";
import { useTranslation } from "react-i18next";
import UnderstandContent from "./Items/UnderstandContent";
import ForestComparison from "./Items/ForestComparison";
import MonthlyDeforestationAlert from "./Items/MonthlyDeforestationAlert";
import MonthlyFireAlert from "./Items/MonthlyFireAlert";
import Deforestation from "./Items/Deforestation";
import CarbonStock from "./Items/CarbonStock";
import SpeciesRichness from "./Items/SpeciesRichness";
import CAR from "./Items/CAR";
import MiningExploration from "./Items/MiningExploration";

export const EntendaMobile = () => {
  const { t } = useTranslation();
  const infoData = useLoaderData({ from: "/" });
  const searchParams = useSearch({ from: "/" });
  const { camada } = searchParams;
  const hasFilters = camada !== undefined;

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

                    {hasFilters && (
                      <Flex gap={8} vertical>
                        {!camada && (
                          <ForestComparison
                            infoData={newInfoData}
                            searchParams={searchParams}
                          />
                        )}

                        {(typeof camada === "undefined" ||
                          Number(camada) === 2 || searchParams.camada === undefined) && (
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

                        {(Number(camada) === 2 || Number(camada) === 7 || searchParams.camada === undefined) && (
                          <MonthlyFireAlert
                            infoData={newInfoData}
                            searchParams={searchParams}
                          />
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
                    )}
                  </Flex>
                ),
              },
            ]}
          />
        </>
      )}
    </>
  );
};
