import {
    Bug,
    BugFill,
    Button,
    Diamond,
    DiamondFill,
    ExclamationTriangle,
    ExclamationTriangleFill,
    SignPost,
    SignPostFill,
    TreeFill,
    VectorDeforestationTree,
    VectorDesmatamentoFill,
    VectorMineracao,
    VectorMineracaoFill,
    Wind,
    XDiamond,
    XDiamondFill,
} from 'components/atoms'
import { Camadas, Esferas } from "services/data";
import { Divider, Flex, Select, Grid, Typography } from "antd"
import { FC, useEffect, useState } from 'react'
import { useNavigate } from "@tanstack/react-router";
import estados from "assets/data/estados.json";

const { Text } = Typography
const { useBreakpoint } = Grid

type ExploreProps = {
    collapsed?: boolean
    vertical?: boolean
}

export const Explore: FC<ExploreProps> = ({ collapsed=false, vertical = true }) => {
    const [ florestaEstadual, setFlorestaEstadual] = useState<boolean>(false)
    const [ florestaFederal, setFlorestaFederal] = useState<boolean>(false)
    const [ maisDesmatadasSelected, setMaisDesmatadasSelected ] = useState<boolean>(false)
    const [ selectedAction, setSelectedAction ] = useState<number>(-1)
    const breakpoints = useBreakpoint()
    const [gapXs, setGapXs] = useState<number>(8)
    const navigate = useNavigate({ from: '/' })

    useEffect(()=>{
        if(breakpoints.xs){
           setGapXs(6) 
        }
    },[breakpoints])

    const actions = [
        {
            icon: selectedAction === 0 ? <VectorDesmatamentoFill/> : <VectorDeforestationTree/>,
            label: "Desmatamento", 
            layer: Camadas.deforastationLast10Years,
        },
        {
            icon: <Wind/>,
            label: "Estoque de Carbono", 
            layer: Camadas.undergroundCarbonStorage,
        },
        {
            icon: selectedAction === 2 ? <BugFill/> : <Bug/>,
            label: "Biodiversidade",
            layer: Camadas.speciesDiversity,
        },
        {
            icon: selectedAction === 3 ? <SignPostFill/> : <SignPost/>,
            label: "CAR (Cadastro Ambiental Rural)",
            layer: Camadas.carOverlap,
        },
        {
            icon: selectedAction === 4 ? <VectorMineracaoFill/> : <VectorMineracao/>,
            label: "Mineração",
            layer: Camadas.mining,
        },            
    ]

    useEffect(() => {
        // setTimeout(() => setSelectedAction(0), 500);
        setSelectedAction(0)
    }, [])

    useEffect(() => {
        if (maisDesmatadasSelected) {
            setSelectedAction(-1)

            navigate({
                search: (prev) => ({ ...prev, camada: Camadas.deforastationLastMonth }),
            })
        }
    }, [maisDesmatadasSelected])

    useEffect(() => {
        if (selectedAction !== -1) {
            setMaisDesmatadasSelected(false)
            navigate({
                search: (prev) => ({ ...prev, camada: actions[selectedAction].layer }),
            })
        }
    }, [selectedAction])

    useEffect(() => {
        if (!maisDesmatadasSelected && selectedAction===-1) {
            navigate({
                search: (prev) => ({ ...prev, camada: undefined }),
            })
        }
    }, [maisDesmatadasSelected, selectedAction])

    useEffect(() => {
        if (florestaFederal){
            navigate({
                search: (prev) => ({ ...prev, esfera: Esferas.Federal }),
            });
        }
        else if (florestaEstadual){
            navigate({
                search: (prev) => ({ ...prev, esfera: Esferas.Estadual }),
            });
        }  
        else {
            navigate({
                search: (prev) => ({ ...prev, esfera: undefined }),
            });
        }
    }, [florestaEstadual, florestaFederal])

    const categoriaEstaduais = () => {
        if(!florestaEstadual){
            setFlorestaFederal(false)
        }
        setFlorestaEstadual(!florestaEstadual)
    }
    const categoriaFederais = () => {
        if(!florestaFederal){
            setFlorestaEstadual(false)
        }
        setFlorestaFederal(!florestaFederal)
    }

    const maisDesmatadas = () => {
        setMaisDesmatadasSelected(!maisDesmatadasSelected)
    }

    const onSelectAction = (index: number) => {
        if (selectedAction === index){
            setSelectedAction(-1)
        } else {
            setSelectedAction(index)
        }
    }

    const onSelectStates = (event: Array<string>) => {
        if (event.length) {
            navigate({
                search: (prev) => ({ ...prev, estados: event }),
            })
        } else {
            navigate({
                search: (prev) => ({ ...prev, estados: undefined }),
            })
        }
    }

    return (
        <>
            <Flex gap={gapXs} vertical={vertical} style={{ padding: '8px 8px 8px 16px' }}>
                <Text>{collapsed ? '' : 'Conheça as florestas públicas da Amazônia'}</Text>
                
                <Button
                    collapsed={collapsed}
                    icon={<TreeFill/>}
                    label="Florestas Públicas Não Destinadas"
                    type="primary"
                    className="botaoExploreSelected"
                />
                
                <Button 
                    collapsed={collapsed} 
                    icon={ maisDesmatadasSelected ? <ExclamationTriangleFill/> : <ExclamationTriangle/>} 
                    label="FPND mais desmatadas no último mês" 
                    type={maisDesmatadasSelected ? "primary" : "default"}
                    onClick={maisDesmatadas}
                    className={maisDesmatadasSelected ? "botaoExploreSelected" : "botaoExplore" }
                 />
            </Flex>

            <Flex gap={gapXs} vertical={vertical} style={{ padding: '8px 8px 8px 16px' }}>
                <Text>{collapsed ? '' : 'Filtre por categoria'}</Text>

                <Flex gap={gapXs} vertical={vertical ? !!collapsed : vertical}>
                    <Button
                        collapsed={collapsed}
                        icon={florestaFederal ? <XDiamondFill/> : <XDiamond/>}
                        label="Florestas Federais"
                        type={florestaFederal ? "primary" : "default"} 
                        onClick={categoriaFederais}
                        className={florestaFederal ? "botaoExploreSelected" : "botaoExplore" }
                    />
                
                    <Button
                        collapsed={collapsed}
                        icon={florestaEstadual ? <DiamondFill/> : <Diamond/>}
                        label="Florestas Estaduais"
                        type={florestaEstadual ? "primary" : "default"}
                        onClick={categoriaEstaduais}
                        className={florestaEstadual ? "botaoExploreSelected" : "botaoExplore" }
                        style={{paddingLeft:'8px'}}
                    />
                </Flex> 
            </Flex>

            { !collapsed && ( // desativa Select quando menu esta collapsado
                <>
                    <Flex vertical gap={gapXs} style={{padding: '8px 8px 8px 16px'}}>
                        <Text>Selecione o recorte territorial</Text>
                
                        <Select 
                            mode="multiple" 
                            allowClear
                            placeholder="Selecione"
                            style={{width: "100%"}}
                            onChange={onSelectStates}
                            options={estados.data}
                        />
                    </Flex>
                </>
            )}

            <Divider type={vertical ? 'horizontal' : 'vertical'} style={{marginTop: '10px', marginBottom: '10px'}}/>
            
            <Flex gap={gapXs} vertical={vertical} style={{ padding: '8px 8px 8px 16px'}}>
                <Text>{collapsed ? "" : "Veja no mapa" }</Text>

                { actions.map((action, index) => (
                    <Button
                        key={index}
                        collapsed={collapsed}
                        type={index===selectedAction? 'primary' : 'default'}
                        icon={action.icon}
                        label={action.label}
                        onClick={() => onSelectAction(index)}
                        className={index === selectedAction ? "botaoExploreSelected" : "botaoExplore" }
                    />
                ))} 
            </Flex>
        </>
    )
}
