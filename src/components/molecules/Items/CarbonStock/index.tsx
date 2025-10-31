import React from "react";
import { Collapse, Flex } from "antd";
import { InfoContent, InfoHeader, Markdown } from "components/atoms";
import { headerIcons, highlightedIcons, parseToPlural } from "components/molecules/Entenda";
import { Esferas } from "services/data";

interface CarbonStockProps {
  infoData: any;
  searchParams?: any;
}

const CarbonStock: React.FC<CarbonStockProps> = ({ infoData, searchParams }) => {
  const { esfera } = searchParams

  const {
    recortePrefixo,
    recorteNome,
    estoqueCarbonoTon,
    estoqueCarbonoEquivalenciaPesoTon,
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
              title="Estoque de carbono"
              description={`Estoque de carbono é o carbono que é retirado da atmosfera e armazenado em organismos vivos, no solo e em rochas.`}
              icon={headerIcons["estoqueDeCarbono"]}
            />
          ),
          children: (
            <Flex gap={24} vertical>
              <InfoContent>
                <Markdown
                  text={`As FPND ${selectedEsfera} n${recortePrefixo} ${recorteNome} estocam **${estoqueCarbonoTon}** de toneladas de carbono.`}
                />
              </InfoContent>

              <InfoContent highlighted={true} icon={highlightedIcons["co2"]}>
                <Markdown
                  text={`Isso equivale a **${estoqueCarbonoEquivalenciaPesoTon}** de toneladas de CO2 evitados na atmosfera.`}
                  highlighted={true}
                />
              </InfoContent>
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default CarbonStock;
