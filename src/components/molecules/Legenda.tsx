import { Card, Tag, Flex } from "antd";
import { FC } from "react";

type LegendaProps = {
    title: String,
    bins: Array<Object>,
}

export const Legenda: FC<LegendaProps> = ({title, bins}) => {

    return(
        <Card size="small" title={title} style={{ width: 480 }}>
            <Flex gap={10}>
            {
                bins.map((data, index) => {
                    //console.log(Object.keys(data))
                    return(
                            <p 
                                key={index}
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
                            </p>
                        )
                })
            }
            </Flex>
        </Card>
    )
}
