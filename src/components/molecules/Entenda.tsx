import { Button, Collapse, Flex } from "antd";
import {
  BiodiversidadeIcon,
  BugFill,
  CloudFog,
  ExclamationTriangleFill,
  GraphUpArrow,
  SignPostFill,
  Tree,
  VectorCampo,
  VectorDesmatamentoFill,
  VectorMineracao,
  Wind,
  XDiamondFill,
} from "components/atoms";

import {
  ChevronDoubleDown,
  ChevronDoubleUp,
  InfoHeader,
} from "components/atoms";
import { useCallback } from "react";
import { useLoaderData, useSearch } from "@tanstack/react-router";
import { useBusiness } from "services/business";
import { Esferas } from "services/data";
import ForestComparison from "./Items/ForestComparison";
import MonthlyDeforestationAlert from "./Items/MonthlyDeforestationAlert";
import Deforestation from "./Items/Deforestation";
import CarbonStock from "./Items/CarbonStock";
import SpeciesRichness from "./Items/SpeciesRichness";
import CAR from "./Items/CAR";
import MiningExploration from "./Items/MiningExploration";
import UnderstandContent from "./Items/UnderstandContent";
import { GraphDownArrow } from "components/atoms/Icons";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const url = import.meta.env.VITE_URL_COMO_AGIR;
const highLitghtIconStyle = { color: "#d8952a", fontSize: "32px" };

export const headerIcons = {
  florestasEstaduaisxFederais: <XDiamondFill />,
  alertaMensalDeDesmatamento: <ExclamationTriangleFill />,
  desmatamento: <VectorDesmatamentoFill />,
  estoqueDeCarbono: <Wind />,
  biodiversidade: <BugFill />,
  car: <SignPostFill />,
  mineracao: <VectorMineracao />,
};

export const highlightedIcons = {
  arvore: <Tree style={highLitghtIconStyle} />,
  biodiversidade: <BiodiversidadeIcon style={highLitghtIconStyle} />,
  co2: <CloudFog style={highLitghtIconStyle} />,
  campoDeFutebol: <VectorCampo style={highLitghtIconStyle} />,
  graficoUp: <GraphUpArrow style={highLitghtIconStyle} />,
  graficoDown: <GraphDownArrow style={highLitghtIconStyle} />,
};

export const parseToPlural = (esfera: Esferas | string): string => {
  if (typeof esfera === "number") {
    switch (esfera) {
      case Esferas.Federal:
        return "federal";
      case Esferas.Estadual:
        return "state";
      default:
        return "";
    }
  }

  const map = {
    Federal: "Federais",
    Estadual: "Estaduais",
  };
  return map[esfera as keyof typeof map] ?? "";
};

export function getVerboDesmatamento(
  percent: string | number,
  t: TFunction
): string {
  const value =
    typeof percent === "string"
      ? parseFloat(percent.replace(",", "."))
      : percent;
  if (isNaN(value)) return "";
  return value >= 0 ? t("increased") : t("reduced");
}

export const Entenda = () => {
  const infoData = useLoaderData({ from: "/" });
  const searchParams = useSearch({ from: "/" });
  const { camada } = searchParams;
  const hasFilters = camada !== undefined;
  // const [isActive, setIsActive] = useState(true)
  const { entendaIsOpen, setEntendaIsOpen } = useBusiness();
  //console.log('infoData', infoData)
  const { t } = useTranslation();

  const getDoubleExpandIcon = useCallback((panelProps: any) => {
    return panelProps.isActive ? (
      <ChevronDoubleUp style={{ fontSize: "16px" }} />
    ) : (
      <ChevronDoubleDown style={{ fontSize: "16px" }} />
    );
  }, []);

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
        <Flex
          vertical
          style={{ maxHeight: "calc(100vh - 28px)", padding: "0px 0px" }}
        >
          <Collapse
            bordered={false}
            defaultActiveKey={0}
            expandIcon={getDoubleExpandIcon}
            onChange={() => setEntendaIsOpen(!entendaIsOpen)}
            expandIconPosition="end"
            style={{
              background: "white",
              borderRadius: entendaIsOpen ? "12px 12px 0 0" : undefined,
              overflowY: "auto",
              width: 354,
            }}
            items={[
              {
                label: (
                  <InfoHeader
                    title={t("understand")}
                    description={t("fpnd_description")}
                    padding="0px 0px 0px 8px"
                  />
                ),
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
                    )}
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
            {entendaIsOpen && (
              <>
                <Button
                  href={url}
                  ghost
                  style={{ fontWeight: "bold", width: "100%", borderRadius: 10 }}
                  target="_blank"
                  type="primary"
                >
                  {t("how_to_act")}
                </Button>
                <Button
                  href="https://deolhonasflorestaspublicas.org.br"
                  ghost
                  style={{ fontWeight: "bold", width: "100%", borderRadius: 10 }}
                  type="primary"
                >
                  Retornar ao site
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};
