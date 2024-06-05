import { Column } from '@ant-design/plots';
import { formatNumber } from "services/utils"
import { FC } from "react"
import { Flex, Typography } from "antd"

const {Text} = Typography


type graficoDesmatamentoAcumuladoProps = {
    data: Array<object>
}

interface DataItem {
    xField: number;
    yField: number;
  }


export const GraficoDesmatamentoAcumulado:FC<graficoDesmatamentoAcumuladoProps> = ({data}) => {

    const config = {
        data: data,
        xField: 'xField',
        yField: 'yField',
        width: 300,
        height: 200,
        scale: {
            x: {
                padding: .50,
            },
        },
        axis: {
            y: {
                title: 'Hectare',
                titleSpacing: -5,
                labelFormatter: '~s' ,
            },
        },
        style: {
            radiusTopLeft: 2,
            radiusTopRight: 2,
            fill: '#d8952a'
        }, 
        tooltip: (d: DataItem) => {
            return {
            value: `${formatNumber(d.yField, 2)} ha`,
          }}

    }

    return (
        <Flex vertical align='center' justify='center'>
            <Text strong style={{fontSize:'14px'}}>Desmatamento Acumulado de 2013 a 2023</Text>
            <Column {...config}/>
        </Flex>
    )
}
