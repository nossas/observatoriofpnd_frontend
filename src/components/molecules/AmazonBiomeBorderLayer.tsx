import { FC, useEffect } from "react";
import { RLayerVector, RFeature } from "rlayers";
import { RStyle, RStroke } from "rlayers/style";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";

type AmazonBiomeBorderLayerProps = {
  zIndex?: number;
};

const amazonBiomeSource = new VectorSource({
  format: new GeoJSON(),
  url: "/data/amazon_biome_border.json",
});

export const AmazonBiomeBorderLayer: FC<AmazonBiomeBorderLayerProps> = ({
  zIndex = 5,
}) => {
  useEffect(() => {
    // Garante que a fonte foi carregada
    amazonBiomeSource.getFeatures();
  }, []);

  return (
    <RLayerVector
      source={amazonBiomeSource}
      zIndex={zIndex}
      style={
        <RStyle>
          <RStroke color="#FF6B35" width={2} />
        </RStyle>
      }
    />
  );
};
