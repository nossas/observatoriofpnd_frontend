import { Flex } from "antd"
import { Column } from '@ant-design/plots';
import { FC } from "react"

type graficoCARprops = {
    data: Array<object>
}

export const GraficoCARSobreposicao:FC<graficoCARprops> = ({data}) => {

    const config = {
        data: data,
        xField: 'xField',
        yField: 'yField',
        colorField: 'colorField',
        width: 300,
        height: 200,
        stack: true,
        scale: {
            color: {
              range: [
                '#0f5427',
                '#d8952a']}},
        legend: {
            color: {
                title: false,
                position: 'bottom',
                layout: { justifyContent: 'center' },
            },
        },
        style: {
            radiusTopLeft: 5,
            radiusTopRight: 5,
        },
        label:{
            text: 'yField',
            style:{
                fill: "#FFFFFF"
            }
        },
        title: {
            title: "Área de CAR sobrepostos às FPND",
            titleFontSize: 14,
        },
    }

    return (
        <Flex align='center' justify='center'>
            <Column {...config}/>
        </Flex>
    )
}
