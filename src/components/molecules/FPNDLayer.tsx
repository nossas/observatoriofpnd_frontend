// Importações e dependências
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Map, Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { MVT } from "ol/format";
import { RLayerVectorTile} from "rlayers";
import { useNavigate } from "@tanstack/react-router";
import { Pixel } from "ol/pixel";
import { Modal, Button } from "antd";

import {
    RStyleArray,
    RStyle,
    RStroke,
    RFill,
    useRStyle,
} from "rlayers/style";

const projection = import.meta.env.VITE_DEFAULT_PROJECTION;
const urlMVT = import.meta.env.VITE_URL_MVT;

type FPNDLayerProps = {
    mapData: {
        [x: string]: any
    },
    camada: string,
    esfera: string,
    estados: Array<string>,
    pixelClicked: Pixel | null,
    zIndex?: number
};

export const FPNDLayer: FC<FPNDLayerProps> = ({ mapData, camada, esfera, estados, zIndex, pixelClicked }) => {
    const navigate = useNavigate();
    const fpndStyle = useRStyle();
    const layerRef = useRef<any>(null);
    const [selectedFeatureCode, setSelectedFeatureCode] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pendingFeatureCode, setPendingFeatureCode] = useState(null);

    const data = mapData?.data;

    // Função para lidar com a confirmação do modal
    const handleConfirm = () => {
        setSelectedFeatureCode(pendingFeatureCode);
        setIsModalVisible(false);
    };

    // Função para lidar com o cancelamento do modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setPendingFeatureCode(null)
    };


    const getColor = useCallback((codigo: string, baseColor: string, highlightColor: string) => {
        return selectedFeatureCode === codigo ? highlightColor : camada === '' ? baseColor : data[codigo][`${camada}Color`];
    }, [camada, data, selectedFeatureCode]);

    const getStyle = useCallback((feature: Feature<Geometry>) => {
        const featureProperties = feature.getProperties();
        const { codigo, uf, esfera: featureEsfera } = featureProperties;

        // Definindo cores como constantes
        const defaultFillColor = 'green';
        const defaultStrokeColor = '#99999999';
        const highlightFillColor = '#daa520';
        const highlightStrokeColor = '#08080899';
        const filterColor = "#f5a7c140";

        let colorFill = getColor(codigo, defaultFillColor, highlightFillColor);
        let colorStroke = getColor(codigo, defaultStrokeColor, highlightStrokeColor);

        if ((esfera !== '' && esfera !== featureEsfera) || (estados.length && !estados.includes(uf))) {
            colorFill = filterColor;
            colorStroke = filterColor;
        }

        return (
            <>
                <RStyle>
                    <RStroke color={colorStroke} width={1} />
                    <RFill color={colorFill} />
                </RStyle>
            </>
        );
    }, [getColor, esfera, estados]);
    
    useEffect(() => {

        if(layerRef.current)
            layerRef.current.ol.changed()
    }, [camada, esfera, estados, selectedFeatureCode]);
    
    useEffect(() => {
        navigate({ search: (prev: any) => ({ ...prev, fpnd: selectedFeatureCode || undefined }) } as any);
    }, [selectedFeatureCode]);

    useEffect(() => {
        if (pixelClicked) {
            const map: Map = layerRef.current.context.map;
            const features = map.getFeaturesAtPixel(pixelClicked);
            if (features.length > 0) {
                const feature = features[0]
                const featureCode = feature.get('codigo');
                const featureUF = feature.get('uf');
                const featureEsfera = feature.get('esfera')
                if ((esfera !== '' && esfera !== featureEsfera) || estados.length && !estados.includes(featureUF)){
                    setSelectedFeatureCode(null);
                    return
                }
                if ( !pendingFeatureCode || featureCode !== pendingFeatureCode){
                    setPendingFeatureCode(featureCode);
                    setIsModalVisible(true);
                }
                else{
                    setSelectedFeatureCode(featureCode)
                }
            } else {
                setSelectedFeatureCode(null);
                setPendingFeatureCode(null);
            }
        }
    }, [pixelClicked, estados, esfera]);

    return (
        <>
            <Modal
                title="Confirmar Seleção"
                visible={isModalVisible}
                onOk={handleConfirm}
                onCancel={handleCancel}
                footer={[
                    <Button key="ok" type="primary" onClick={handleConfirm}>
                      Analisar
                    </Button>
                  ]}
            >
                <p>Deseja analisar a FPND selecionada?</p>
            </Modal>

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
    );
};
