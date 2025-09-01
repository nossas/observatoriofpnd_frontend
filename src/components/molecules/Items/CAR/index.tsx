import React from "react";
import { Collapse, Flex } from "antd";
import {
  AlertaGrilagem,
  ExclamationTriangleFill,
  InfoContent,
  InfoHeader,
  Markdown,
} from "components/atoms";
import { headerIcons, highlightedIcons, parseToPlural } from "components/molecules/Entenda";
import { GraficoCARSobreposicao } from "components/molecules/GraficoCARSobreposicao";
import { Esferas } from "services/data";

interface CARProps {
  infoData: any;
  searchParams?: any;
}

const CAR: React.FC<CARProps> = ({ infoData, searchParams }) => {
  const { esfera } = searchParams;

  const {
    carSobreposicaoFpndAreaHa,
    carSobreposicaoFpndEquivalenciaFutebolQtd,
    recortePrefixo,
    recorteNome,
    carComparacaoDesmatamento,
    carGrafico,
  } = infoData;

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
              title="CAR (Cadastro Ambiental Rural)"
              description={`Há **${carSobreposicaoFpndAreaHa}** de hectares de Cadastro Ambiental Rural (CAR) **irregulares** n${recortePrefixo} ${recorteNome}, sobrepostos em FPND ${selectedEsfera}.`}
              icon={headerIcons["car"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent
                highlighted={true}
                icon={highlightedIcons["campoDeFutebol"]}
              >
                <Markdown
                  text={`Isso equivale a **${carSobreposicaoFpndEquivalenciaFutebolQtd}** de campos de futebol.`}
                  highlighted={true}
                />
              </InfoContent>

              <InfoContent>
                <Flex gap={12} vertical>
                  <AlertaGrilagem
                    icon={
                      <ExclamationTriangleFill
                        style={{
                          color: "#c32c18",
                          fontSize: "24px",
                        }}
                      />
                    }
                  />
                  <Markdown text="A presença de CAR em áreas florestais podem indicar grilagem, ameaçando a conservação desses ecossistemas vitais." />
                  <Markdown text="Com base em estudo do IPAM e ABRAMPA, 44% dos casos de sobreposição de CAR em terras públicas referem-se a áreas com mais de 1.500 hectares, não se tratando de pequenas ocupações para a agricultura familiar ou de subsistência, mas possivelmente  grupos que possuem financiamento e organização." />
                  <Markdown
                    text={`Nas FPND ${selectedEsfera} d${recortePrefixo} ${recorteNome}, para cada **${carComparacaoDesmatamento}** hectares de CAR, temos 1 hectare de desmatamento.`}
                  />
                </Flex>
              </InfoContent>

              <GraficoCARSobreposicao data={carGrafico} />
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default CAR;
