import { FC, useContext, useEffect } from "react";
import { RContext } from "rlayers";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Stroke, Style } from "ol/style";

type AmazonBiomeBorderLayerProps = {
  zIndex?: number;
};

export const AmazonBiomeBorderLayer: FC<AmazonBiomeBorderLayerProps> = ({
  zIndex = 6,
}) => {
  const { map } = useContext(RContext);

  useEffect(() => {
    if (!map) return;

    const source = new VectorSource();
    const layer = new VectorLayer({
      source,
      style: new Style({
        stroke: new Stroke({
          color: "rgba(0,0,0,0.88)",
          width: 1,
        }),
      }),
      zIndex,
    });

    // Carrega o GeoJSON
    fetch("/data/amazon_biome_border.json")
      .then((response) => response.json())
      .then((geojson) => {
        const format = new GeoJSON();
        const features = format.readFeatures(geojson, {
          featureProjection: "EPSG:3857",
        });
        source.addFeatures(features);
      })
      .catch((error) => console.error("Erro ao carregar GeoJSON:", error));

    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, zIndex]);

  return null;
};
