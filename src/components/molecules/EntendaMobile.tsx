import { Button, Collapse, Flex, Typography } from "antd";
import {
  AlertaGrilagem,
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
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { InfoContent, InfoHeader, Markdown } from "components/atoms";
import {
  GraficoAlertaDesmatamento,
  GraficoCARSobreposicao,
  GraficoDesmatamentoAcumulado,
  GraficoDesmatamentoRecorte,
} from ".";
import { useCallback } from "react";
import { useLoaderData, useSearch } from "@tanstack/react-router";
import { substitute } from "services/utils";
import { entenda } from "assets/data/entenda";
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
const highLitghtIconStyle = { color: "#d8952a", fontSize: "32px" };
const headerIcons = {
  florestasEstaduaisxFederais: <XDiamondFill />,
  alertaMensalDeDesmatamento: <ExclamationTriangleFill />,
  desmatamento: <VectorDesmatamentoFill />,
  estoqueDeCarbono: <Wind />,
  biodiversidade: <BugFill />,
  car: <SignPostFill />,
  mineracao: <VectorMineracao />,
};

const highlightedIcons = {
  arvore: <Tree style={highLitghtIconStyle} />,
  biodiversidade: <BiodiversidadeIcon style={highLitghtIconStyle} />,
  co2: <CloudFog style={highLitghtIconStyle} />,
  campoDeFutebol: <VectorCampo style={highLitghtIconStyle} />,
  grafico: <GraphUpArrow style={highLitghtIconStyle} />,
};

const { Text } = Typography;

export const EntendaMobile = () => {
  const { t } = useTranslation();
  const infoData = useLoaderData({ from: "/" });
  const searchParams = useSearch({ from: "/" });
  const { camada } = searchParams;

  //console.log('infoData', infoData)

  const getExpandIcon = useCallback((panelProps: any) => {
    return panelProps.isActive ? <UpOutlined /> : <DownOutlined />;
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
          </Flex>
        </>
      )}
    </>
  );
};
