import { Ajuda, Entenda, FPNDLayer, Legenda } from "components/molecules";
import { Grid } from "antd";
import { RControl, RLayerTile, RMap } from "rlayers";
import { useBusiness } from "services/business";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { Camadas, Esferas } from "services/data";
import "ol/ol.css";
import "rlayers/control/layers.css";
import "assets/styles/mapa.css";
import { Pixel } from "ol/pixel";
import { fromLonLat } from "ol/proj";
import { DoubleClickZoom, Interaction } from "ol/interaction";

const projection = import.meta.env.VITE_DEFAULT_PROJECTION;
const urlTiles = import.meta.env.VITE_URL_GOOGLE_MAP_API_TERRAIN;

const defaultLegend = {
  title: "FPND",
  bins: [
    {
      "#008000": "Florestas",
    },
  ],
};

const extents = {
  default: [
    -73.79487377262059, -16.29340772910929, -46.600017512173174,
    4.3929018134876925,
  ],
  AM: [
    -73.40382673020356, -9.66692010668144, -56.651074667511395,
    0.717678199618431,
  ],
  RO: [
    -66.80343861008828, -13.67121292568953, -60.08077887914084,
    -7.975927522993186,
  ],
  PA: [
    -58.24996568369845, -9.591853023885147, -46.600017512173174,
    -0.7190817437694077,
  ],
  AP: [
    -52.304820866959, -0.34670336968225535, -49.90229333146293,
    4.195350111586374,
  ],
  MT: [
    -61.49896585572995, -16.29340772910929, -53.420729312708026,
    -8.801770729174061,
  ],
  RR: [
    -62.00060628713821, -0.3333336122238127, -59.29093707949849,
    4.3929018134876925,
  ],
  AC: [
    -73.79487377262059, -10.99284924444386, -67.45660048523425,
    -7.116698090502462,
  ],
};

const { useBreakpoint } = Grid;

export const Mapa = () => {
  const breakpoints = useBreakpoint();
  const {
    entendaIsOpen,
    mapCenter,
    mapData,
    mapZoom,
    setMapCenter,
    setMapZoom,
  } = useBusiness();
  const { camada, esfera, estados } = useSearch({ from: "/" });
  const mapRef = useRef<any>(null);
  const legendData =
    camada !== undefined && mapData?.layersLegends
      ? mapData?.layersLegends[Camadas[camada]]
      : defaultLegend;
  const [pixelClicked, setPixelClicked] = useState<Pixel | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      let extent;

      if (estados && estados.length > 0) {
        // Calcula a união dos extents para os ufs fornecidos
        extent = estados.reduce((acc, uf) => {
          //@ts-ignore
          const ufExtent = extents[uf] || extents["default"];
          if (!acc) return ufExtent;
          return [
            Math.min(acc[0], ufExtent[0]), // xmin
            Math.min(acc[1], ufExtent[1]), // ymin
            Math.max(acc[2], ufExtent[2]), // xmax
            Math.max(acc[3], ufExtent[3]), // ymax
          ];
        }, null);
      } else {
        // Usa o extent default
        extent = extents["default"];
      }
      //@ts-ignore
      extent = [
        ...fromLonLat([extent[0], extent[1]]),
        ...fromLonLat([extent[2], extent[3]]),
      ];
      mapRef.current.ol.getView().fit(extent, mapRef.current.ol.getSize());
    }
  }, [mapRef, estados]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.ol
        .getInteractions()
        .getArray()
        .forEach(function (interaction: Interaction) {
          if (interaction instanceof DoubleClickZoom) {
            mapRef.current.ol.removeInteraction(interaction);
          }
        });
    }
  }, [mapRef]);

  return (
    <RMap
      width="100%"
      height="100%"
      initial={{ center: mapCenter, zoom: mapZoom }}
      noDefaultControls
      projection={projection}
      ref={mapRef}
      onRenderComplete={(event) => {
        setMapCenter(event.target.getView().getCenter());
        setMapZoom(event.target.getView().getZoom());
      }}
      onDblClick={(event) => {
        setPixelClicked(event.pixel);
      }}
    >
      <RLayerTile url={urlTiles} />

      <FPNDLayer
        zIndex={7}
        mapData={mapData}
        camada={camada !== undefined ? Camadas[camada] : ""}
        esfera={esfera !== undefined ? Esferas[esfera] : ""}
        estados={estados !== undefined ? estados : []}
        pixelClicked={pixelClicked}
      />

      <RControl.RCustom
        className={
          breakpoints.xs
            ? "legendaMobile"
            : entendaIsOpen
              ? "legenda"
              : "legendaCanto"
        }
      >
        <Legenda title={legendData.title} bins={legendData.bins} />
      </RControl.RCustom>

      <RControl.RCustom className="entenda">
        {!breakpoints.xs && <Entenda />}
      </RControl.RCustom>

      <RControl.RCustom className={breakpoints.xs ? "" : "ajuda"}>
        {!breakpoints.xs && <Ajuda />}
      </RControl.RCustom>

      {!breakpoints.xs && <RControl.RZoom />}
    </RMap>
  );
};
