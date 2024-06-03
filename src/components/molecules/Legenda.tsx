import { Card, Tag, Flex, Typography, Button, Grid } from "antd";
import { ChevronDoubleUp, ChevronDoubleDown} from '../atoms/index'
import { FC, useState } from "react";

const {Text} = Typography
const { useBreakpoint } = Grid

type LegendaProps = {
    title: String,
    bins: Array<Object>,
}

export const Legenda: FC<LegendaProps> = ({title, bins}) => {
    const breakpoints = useBreakpoint()
    const [legendaOpen, setLegendaOpen] = useState(!breakpoints.xs)

    return(
        <Card size="small" style={
            breakpoints.xs ? {
                minWidth: legendaOpen ? 187 : 83,
                minHeight: legendaOpen ? 162 : 30,
                borderRadius: '6px',
            }
             :
            {
                minWidth:219,
                minHeight:192,
                background: '#ffffff'
            }}>

            <Flex justify="space-between" align="center"  gap={8}>
                <Text strong style={{fontSize:'xs'}}>{legendaOpen ? title : 'Legenda '}</Text>
                {breakpoints.xs && (
                    <Button
                        type="text"
                        icon={!legendaOpen ? <ChevronDoubleUp style={{fontSize: '14px'}}/> : <ChevronDoubleDown style={{fontSize: '14px'}}/>}
                        style={{borderRadius: 0}}
                        onClick={() => setLegendaOpen(!legendaOpen)}
                    />
                )}
            </Flex>
            {legendaOpen && (

                <Flex vertical gap={0}>
                    {
                        bins.map((data, index) => {
                            return(
                                    <Text 
                                        key={index} 
                                        style={{fontSize: 12}}
                                    >
                                    <Tag 
                                        color={Object.keys(data)[0]} 
                                        style={{    
                                                    minHeight:"12px", 
                                                    minWidth:"12px", 
                                                    borderRadius:"2px", 
                                                    padding:"6px 6px",
                                                    border: '0px'
                                                }}/>
                                    {Object.values(data)[0]}
                                    </Text>
                                )
                        })
                    }
                    <Text style={{fontSize: 9}}>*São considerados os registros de FPND maiores que 10 mil hectares.</Text>
                </Flex>
            )}
        </Card>
    )
}

