import React from "react";
import { InfoHeader } from "components/atoms";
import { headerIcons, parseToPlural } from "components/molecules/Entenda";
import { Esferas } from "services/data";

interface SpeciesRichnessProps {
  infoData: any;
  searchParams: any;
}

const SpeciesRichness: React.FC<SpeciesRichnessProps> = ({
  infoData,
  searchParams,
}) => {
  const {
    recortePrefixo,
    recorteNome,
    biodiversidadeFpndTodasMedia,
  } = infoData;
  const { esfera } = searchParams;

  const selectedEsfera =
    typeof esfera === "number"
      ? parseToPlural(Esferas[esfera as unknown as Esferas]).toLowerCase()
      : "";
      
  return (
    <div className="noCollapse">
      <InfoHeader
        title="Riqueza de espécies ameaçadas"
        description={`As FPND ${selectedEsfera} n${recortePrefixo} **${recorteNome}** abrigam em média **${biodiversidadeFpndTodasMedia}** espécies ameaçadas da fauna e flora amazônica.`}
        icon={headerIcons["biodiversidade"]}
      />
    </div>
  );
};

export default SpeciesRichness;
