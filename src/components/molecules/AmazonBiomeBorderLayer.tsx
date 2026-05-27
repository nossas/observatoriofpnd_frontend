import { FC, useRef } from "react";
import { RLayerVector } from "rlayers";
import { RStyle, RStroke } from "rlayers/style";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";

type AmazonBiomeBorderLayerProps = {
  zIndex?: number;
};

export const AmazonBiomeBorderLayer: FC<AmazonBiomeBorderLayerProps> = ({
  zIndex = 5,
}) => {
  const sourceRef = useRef(
    new VectorSource({
      format: new GeoJSON(),
      url: "/data/amazon_biome_border.json",
    })
  );

  return (
    <RLayerVector
      source={sourceRef.current}
      zIndex={zIndex}
      style={
        <RStyle>
          <RStroke color="#FF6B35" width={2} />
        </RStyle>
      }
    />
  );
};
