import { Ajuda, Entenda, FPNDLayer, Legenda} from "components/molecules"
import { RControl, RLayerTile, RMap } from "rlayers"
import { useBusiness } from "services/business"
import { useRef } from "react"
import { useSearch } from "@tanstack/react-router";
import { Camadas, Esferas } from "services/data";
import "ol/ol.css"
import "rlayers/control/layers.css"
import "assets/styles/mapa.css"

const projection = import.meta.env.VITE_DEFAULT_PROJECTION
const urlTiles = import.meta.env.VITE_URL_GOOGLE_MAP_API_TERRAIN

const defaultLegend = {
    title : 'FPND',
    bins: [
        {
            '#008000': 'Florestas'
        }
    ],
}

export const Mapa = () => {
    const {
        mapCenter,
        mapData,
        mapZoom,
        setMapCenter,
        setMapZoom,
    } = useBusiness()
    const { camada, esfera, estados } = useSearch({ from: '/' })
    const mapRef = useRef<any>(null)
    const legendData = camada!==undefined && mapData?.layersLegends ? mapData?.layersLegends[Camadas[camada]] : defaultLegend
    
    return (
        <RMap
            width="100%"
            height="100%"
            initial={{ center: mapCenter, zoom: mapZoom }}
            noDefaultControls
            projection={projection}
            ref={mapRef}
            onRenderComplete={(event) => {
                setMapCenter(event.target.getView().getCenter())
                setMapZoom(event.target.getView().getZoom())
            }}
        >
            <RLayerTile url={urlTiles} />

            <FPNDLayer 
                mapData={mapData} 
                camada={camada!==undefined ? Camadas[camada] : ''}
                esfera={esfera!==undefined ? Esferas[esfera] : ''}
                estados={estados!==undefined ? estados : []}
            />
            
            <RControl.RCustom className="legenda">
                <Legenda 
                    title={legendData.title}
                    bins = {legendData.bins}
                />                     
            </RControl.RCustom>

            <RControl.RCustom className="entenda">
                <Entenda />
            </RControl.RCustom>

            <RControl.RCustom className="ajuda">
                <Ajuda />
            </RControl.RCustom>

            <RControl.RZoom/>
        </RMap>
    )
}
