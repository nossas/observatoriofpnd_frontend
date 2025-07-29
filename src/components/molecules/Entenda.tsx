import { Button, Collapse, Flex } from "antd";
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
import {
  ChevronDoubleDown,
  ChevronDoubleUp,
  InfoContent,
  InfoHeader,
  Markdown,
} from "components/atoms";
import {
  GraficoAlertaDesmatamento,
  GraficoCARSobreposicao,
  GraficoDesmatamentoAcumulado,
  GraficoDesmatamentoRecorte,
} from ".";
import { useCallback } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { substitute } from "services/utils";
import entenda from "assets/data/entenda.json";
import { useBusiness } from "services/business";
import { Esferas } from "services/data";

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

export const Entenda = () => {
  const infoData = useLoaderData({ from: "/" });
  // const [isActive, setIsActive] = useState(true)
  const { entendaIsOpen, setEntendaIsOpen } = useBusiness();
  //console.log('infoData', infoData)

  const getDoubleExpandIcon = useCallback((panelProps: any) => {
    return panelProps.isActive ? (
      <ChevronDoubleUp style={{ fontSize: "16px" }} />
    ) : (
      <ChevronDoubleDown style={{ fontSize: "16px" }} />
    );
  }, []);

  const getExpandIcon = useCallback((panelProps: any) => {
    return panelProps.isActive ? <UpOutlined /> : <DownOutlined />;
  }, []);

  const parseToPlural = (esfera: Esferas | string): string => {
    if (typeof esfera === "number") {
      switch (esfera) {
        case Esferas.Federal:
          return "Federais";
        case Esferas.Estadual:
          return "Estaduais";
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

  function getVerboDesmatamento(percent: string | number): string {
    const value =
      typeof percent === "string"
        ? parseFloat(percent.replace(",", "."))
        : percent;
    if (isNaN(value)) return ""; 
    return value >= 0 ? "aumentou" : "reduziu";
  }

  const newInfoData = {
    ...infoData,
    esfera: parseToPlural(infoData.esfera),
    verboDesmatamento: getVerboDesmatamento(infoData.desmatamentoComparacaoPrimeiroAnoUltimoAnoPer),
    biodiversidadeFpndTodasMedia: Math.floor(Number(infoData.biodiversidadeFpndTodasMedia.replace(",", "."))),
    biodiversidadeFpndFederalMedia: Math.floor(Number(infoData.biodiversidadeFpndFederalMedia.replace(",", "."))),
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
                    title={entenda.main.header.title}
                    description={substitute(
                      entenda.main.header.description,
                      newInfoData
                    )}
                    padding="0px 0px 0px 8px"
                  />
                ),
                children: (
                  <Flex gap={24} vertical>
                    {entenda.main.body.reduce(
                      (children: any, child: any, key: number) => {
                        return children.concat(
                          <InfoContent
                            key={key}
                            highlighted={child.highlighted}
                            //@ts-ignore
                            icon={highlightedIcons[child.icon]}
                          >
                            <Markdown
                              text={substitute(child.text, newInfoData)}
                              highlighted={child.highlighted}
                            />
                          </InfoContent>
                        );
                      },
                      []
                    )}

                    <Collapse
                      bordered={false}
                      expandIcon={getExpandIcon}
                      expandIconPosition="end"
                      style={{ padding: 0 }}
                      items={entenda.details.reduce(
                        (items: any, item: any, index: number) => {
                          return items.concat({
                            key: index,
                            label: (
                              <InfoHeader
                                title={item.header.title}
                                description={substitute(
                                  item.header.description,
                                  newInfoData
                                )}
                                //@ts-ignore
                                icon={headerIcons[item.header.icon]}
                              />
                            ),
                            children: (
                              <Flex gap={24} vertical>
                                {item?.body.reduce(
                                  (children: any, child: any, key: number) => {
                                    let component = undefined;
                                    switch (child?.type) {
                                      case "AlertaGrilagem":
                                        component = (
                                          <AlertaGrilagem
                                            key={key}
                                            icon={
                                              <ExclamationTriangleFill
                                                style={{
                                                  color: "#c32c18",
                                                  fontSize: "24px",
                                                }}
                                              />
                                            }
                                          />
                                        );
                                        break;
                                      case "GraficoAlertaDesmatamento":
                                        if (
                                          newInfoData &&
                                          newInfoData.alertaMensalGraficoHistoricoDesmatamento
                                        ) {
                                          component = (
                                            <GraficoAlertaDesmatamento
                                              key={key}
                                              data={
                                                newInfoData.alertaMensalGraficoHistoricoDesmatamento
                                              }
                                            />
                                          );
                                        }
                                        break;
                                      case "GraficoCARSobreposicao":
                                        if (
                                          newInfoData &&
                                          newInfoData.carGrafico
                                        )
                                          component = (
                                            <GraficoCARSobreposicao
                                              key={key}
                                              data={newInfoData.carGrafico}
                                            />
                                          );
                                        break;
                                      case "GraficoDesmatamentoAcumulado":
                                        if (
                                          newInfoData &&
                                          newInfoData.desmatamentoGraficoDesmatamentoAcumulado
                                        ) {
                                          component = (
                                            <GraficoDesmatamentoAcumulado
                                              key={key}
                                              data={
                                                newInfoData.desmatamentoGraficoDesmatamentoAcumulado
                                              }
                                            />
                                          );
                                        }
                                        break;
                                      case "GraficoDesmatamentoRecorte":
                                        if (
                                          newInfoData &&
                                          newInfoData.desmatamentoGraficoFpndEstaduais
                                        ) {
                                          component = (
                                            <GraficoDesmatamentoRecorte
                                              key={key}
                                              data={
                                                newInfoData.desmatamentoGraficoFpndEstaduais
                                              }
                                              recorteTerritorial={`${newInfoData.recortePrefixo} ${newInfoData.recorteNome}`}
                                            />
                                          );
                                        }
                                        break;
                                      default:
                                        //console.log(child)
                                        component = (
                                          <InfoContent
                                            key={key}
                                            highlighted={child?.highlighted}
                                            //@ts-ignore
                                            icon={highlightedIcons[child?.icon]}
                                          >
                                            <Markdown
                                              text={substitute(
                                                child.text,
                                                newInfoData
                                              )}
                                              highlighted={child?.highlighted}
                                            />
                                          </InfoContent>
                                        );
                                    }
                                    return children.concat(component);
                                  },
                                  []
                                )}
                              </Flex>
                            ),
                          });
                        },
                        []
                      )}
                    />
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
            {entendaIsOpen && (
              <Button
                href={url}
                ghost
                style={{ fontWeight: "bold", width: "100%", borderRadius: 10 }}
                target="_blank"
                type="primary"
              >
                Como agir
              </Button>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};
