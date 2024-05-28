import { Button, Collapse, Flex } from 'antd'
import {
    AlertaGrilagem,
    BiodiversidadeIcon,
    BugFill,
    CloudFog,
    ExclamationTriangleFill,
    GraphUpArrow,
    SignPostFill,
    Tree,
    VectorCampo,
    VectorDesmatamentoFill,
    VectorMineracao,
    Wind,
    XDiamondFill,
} from 'components/atoms'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { ChevronDoubleDown, ChevronDoubleUp, InfoContent, InfoHeader, Markdown } from 'components/atoms'
import { GraficoAlertaDesmatamento, GraficoCARSobreposicao, GraficoDesmatamentoAcumulado, GraficoDesmatamentoRecorte } from '.'
import { useCallback, useState } from 'react'
import { useLoaderData } from '@tanstack/react-router'
import { substitute } from 'services/utils'
import entenda from 'assets/data/entenda.json'

const url = import.meta.env.VITE_URL_COMO_AGIR
const highLitghtIconStyle = {color:"#d8952a", fontSize:"32px"}
const headerIcons = {
    florestasEstaduaisxFederais: <XDiamondFill/>,
    alertaMensalDeDesmatamento: <ExclamationTriangleFill/>,
    desmatamento: <VectorDesmatamentoFill/>,
    estoqueDeCarbono: <Wind/>,
    biodiversidade: <BugFill/>,
    car: <SignPostFill/>,
    mineracao: <VectorMineracao/>,
}

const highlightedIcons = {
    arvore: <Tree style={highLitghtIconStyle}/>,
    biodiversidade: <BiodiversidadeIcon style={highLitghtIconStyle}/>,
    co2: <CloudFog style={highLitghtIconStyle}/>,
    campoDeFutebol: <VectorCampo style={highLitghtIconStyle}/>,
    grafico: <GraphUpArrow style={highLitghtIconStyle}/>,
}

export const Entenda = () => {
    const infoData = useLoaderData({from: '/'})
    const [isActive, setIsActive] = useState(true)

    //console.log('infoData', infoData)
   
    const getDoubleExpandIcon = useCallback((panelProps: any) => {
        return (
            panelProps.isActive ? <ChevronDoubleUp /> : <ChevronDoubleDown />
        )
    }, [])

    const getExpandIcon = useCallback((panelProps: any) => {
        return (
            panelProps.isActive ? <UpOutlined /> : <DownOutlined />
        )
    }, [])

    return (
        <>
            {infoData && (
                <>
                    <Collapse
                        bordered={false}
                        defaultActiveKey= {0}
                        expandIcon={getDoubleExpandIcon}
                        onChange={() => setIsActive(!isActive)}
                        expandIconPosition="end"
                        style={{
                            background: "white",
                            borderRadius: isActive ? "10px 10px 0 0" : undefined,
                            maxHeight: '92vh',
                            overflowY: 'auto',
                            width: 354,
                        }}
                        items={[{
                            label:
                                <InfoHeader
                                    title={entenda.main.header.title}
                                    description={substitute(entenda.main.header.description, infoData)}
                                />,
                            children: 
                                <Flex gap={5} vertical>
                                    {entenda.main.body.reduce((children: any, child: any, key: number) => {
                                        return children.concat(
                                            <InfoContent
                                                key={key}
                                                highlighted={child.highlighted}
                                                //@ts-ignore
                                                icon={highlightedIcons[child.icon]}
                                            >
                                                <Markdown text={substitute(child.text, infoData)} highlighted={child.highlighted} />
                                            </InfoContent>
                                        )
                                    }, [])}

                                    <Collapse
                                        bordered={false}
                                        expandIcon={getExpandIcon}
                                        expandIconPosition="end"
                                        style={{ padding: 0 }}
                                        items={entenda.details.reduce((items: any, item: any, index: number) => {
                                            return items.concat({
                                                key: index,
                                                label:
                                                    <InfoHeader
                                                        title={item.header.title}
                                                        description={substitute(item.header.description, infoData)}
                                                        //@ts-ignore
                                                        icon={headerIcons[item.header.icon]}
                                                    />,
                                                children:
                                                    <Flex gap={5} vertical>
                                                        {item?.body.reduce((children: any, child: any, key: number) => {
                                                            let component = undefined
                                                            switch (child?.type){
                                                                case 'AlertaGrilagem':
                                                                    component = <AlertaGrilagem key={key} icon={<ExclamationTriangleFill style={{color:"#c32c18",fontSize:"24px"}}/>} />
                                                                    break
                                                                case 'GraficoAlertaDesmatamento':
                                                                    if(infoData && infoData.alertaMensalGraficoHistoricoDesmatamento)
                                                                    {
                                                                        component = <GraficoAlertaDesmatamento key={key} data={infoData.alertaMensalGraficoHistoricoDesmatamento}/>
                                                                    }
                                                                    break
                                                                case 'GraficoCARSobreposicao':
                                                                    if(infoData && infoData.carGrafico)
                                                                    component = <GraficoCARSobreposicao key={key} data={infoData.carGrafico} />
                                                                    break
                                                                case 'GraficoDesmatamentoAcumulado':
                                                                    if(infoData && infoData.desmatamentoGraficoDesmatamentoAcumulado){    
                                                                        component = <GraficoDesmatamentoAcumulado key={key} data={infoData.desmatamentoGraficoDesmatamentoAcumulado} />
                                                                    }
                                                                    break
                                                                case 'GraficoDesmatamentoRecorte':
                                                                    if(infoData && infoData.desmatamentoGraficoFpndEstaduais){
                                                                        component = <GraficoDesmatamentoRecorte 
                                                                            key={key}  
                                                                            data={infoData.desmatamentoGraficoFpndEstaduais}                                                                            
                                                                            recorteTerritorial={`${infoData.recortePrefixo} ${infoData.recorteNome}`}/>
                                                                    }
                                                                    break
                                                                default:
                                                                    //console.log(child)
                                                                    component = 
                                                                        <InfoContent
                                                                            key={key}
                                                                            highlighted={child?.highlighted}
                                                                            //@ts-ignore
                                                                            icon={highlightedIcons[child?.icon]}
                                                                        >
                                                                            <Markdown text={substitute(child.text, infoData)} highlighted={child?.highlighted}/>
                                                                        </InfoContent>
                                                            }
                                                            return children.concat(component)
                                                        }, [])}
                                                    </Flex>
                                            })
                                        }, [])}
                                    />
                                </Flex>
                        }]}
                    />
                    <Flex style={{backgroundColor:"white" , borderRadius:"0 0 10px 10px",padding: "10px"}}>
                        {isActive && (
                            <Button
                                href={url}
                                ghost
                                style={{fontWeight: "bold", width: "100%", borderRadius: 10}}
                                target="_blank"
                                type="primary"
                            >
                                Como agir
                            </Button>
                        )}
                    </Flex>
                </>
            )}
        </>
    )
}
