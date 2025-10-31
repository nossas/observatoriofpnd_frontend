import React from "react";
import { InfoHeader } from "components/atoms";
import { headerIcons, parseToPlural } from "components/molecules/Entenda";
import { Esferas } from "services/data";
import { useTranslation } from "react-i18next";

interface SpeciesRichnessProps {
  infoData: any;
  searchParams: any;
}

const SpeciesRichness: React.FC<SpeciesRichnessProps> = ({
  infoData,
  searchParams,
}) => {
  const { recortePrefixo, recorteNome, biodiversidadeFpndTodasMedia } =
    infoData;
  const { esfera } = searchParams;
  const { t } = useTranslation();

  const selectedEsfera =
    typeof esfera === "number"
      ? parseToPlural(Esferas[esfera as unknown as Esferas]).toLowerCase()
      : "";

  return (
    <div className="noCollapse">
      <InfoHeader
        title={t("threatened_species_richness")}
        description={t("fpnd_threatened_species_average", {
          selectedEsfera,
          recortePrefixo,
          recorteNome,
          biodiversidadeFpndTodasMedia,
        })}
        icon={headerIcons["biodiversidade"]}
      />
    </div>
  );
};

export default SpeciesRichness;
