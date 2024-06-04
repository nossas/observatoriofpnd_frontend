import { Flex, Typography } from "antd"
import { Column } from '@ant-design/plots';
import { FC } from "react"

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
        style: {
            radiusTopLeft: 2,
            radiusTopRight: 2,
            fill: '#d8952a'
        }, 
        tooltip: (d: DataItem) => {
            return {
            value: `${d.yField} ha`,
          }}

    }

    return (
        <Flex vertical align='center' justify='center'>
            <Text strong style={{fontSize:'14px'}}>Desmatamento Acumulado de 2013 a 2023</Text>
            <Column {...config}/>
        </Flex>
    )
}
