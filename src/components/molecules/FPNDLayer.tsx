// import { Fill, Stroke, Style } from 'ol/style.js'
import { FC, useCallback, useEffect, useRef } from 'react'
import { Feature } from 'ol'
import { Geometry } from 'ol/geom'
import { MVT } from "ol/format";
import { RLayerVectorTile} from "rlayers"

import {
    RStyleArray,
    RStyle,
    RStroke,
    RFill,
    useRStyle,
} from "rlayers/style";

const projection = import.meta.env.VITE_DEFAULT_PROJECTION
const urlMVT = import.meta.env.VITE_URL_MVT

type FPNDLayerProps = {
    mapData: {
        [x: string]: any
    }
    camada: string
    esfera: string
    estados: Array<string>
    zIndex?: number
    onSelect?: (feature: Feature) => void,
}

export const FPNDLayer: FC<FPNDLayerProps> = ({ mapData, camada, esfera, estados, zIndex, /*onSelect*/ }) => {
    const fpndStyle = useRStyle()
    const layerRef = useRef<any>(null)
    const data = mapData?.data

    const getStyle = useCallback((feature: Feature<Geometry>) => {
        const featureProperties = feature.getProperties()

        var colorFill = camada === '' ? 'green' : data[featureProperties.codigo][`${camada}Color`]
        var colorStroke = camada === '' ? 'gray' : data[featureProperties.codigo][`${camada}Color`]

        if (esfera !== '') {
            if (esfera !== featureProperties.esfera){
                colorFill = "#ffffff00"
                colorStroke = "#ffffff00"
            }
        }

        if (estados.length && !estados.includes(featureProperties.uf)){
            colorFill = "#ffffff00"
            colorStroke = "#ffffff00"
        }
        
        return (
            <>
                <RStyle>
                    <RStroke color={colorStroke} width={1} />   
                    <RFill color={colorFill} />
                </RStyle>
            </>
        )                    
    }, [mapData, camada, esfera, estados])

    useEffect(() => {

        if(layerRef.current)
            layerRef.current.ol.changed()
    }, [camada, esfera, estados]);

    return (
        <>
            <RStyleArray
                ref={fpndStyle}
                render={getStyle}
            />

            <RLayerVectorTile
                ref={layerRef}
                url={urlMVT}
                projection={projection}
                format={new MVT()}
                zIndex={zIndex || undefined}
                style={fpndStyle}
            />
        </>
    )
}
