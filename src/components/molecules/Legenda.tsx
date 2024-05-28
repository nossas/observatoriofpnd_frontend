import { Card, Tag, Flex, Typography } from "antd";
import { FC } from "react";

const {Text} = Typography

type LegendaProps = {
    title: String,
    bins: Array<Object>,
}

export const Legenda: FC<LegendaProps> = ({title, bins}) => {

    return(
        <Card size="small" style={{ width: 219, height:192, background: '#ffffff' }}>
            <Flex vertical gap={0}>
                <Text strong style={{fontSize: 12}}>{title}</Text>
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
                                                minHeight:"6px", 
                                                minWidth:"8px", 
                                                borderRadius:"0", 
                                                padding:"6px 8px", 
                                            }} 
                                />
                                {Object.values(data)[0]}
                                </Text>
                            )
                    })
                }
                <Text style={{fontSize: 9}}>*São considerados os registros de FPND maiores que 10 mil hectares.</Text>
            </Flex>
        </Card>
    )
}

