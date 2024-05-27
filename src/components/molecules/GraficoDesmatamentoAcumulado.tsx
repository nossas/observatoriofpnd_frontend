import { Flex } from "antd"
import { Column } from '@ant-design/plots';
import { FC } from "react"

type graficoDesmatamentoAcumuladoProps = {
    data: Array<object>
}

export const GraficoDesmatamentoAcumulado:FC<graficoDesmatamentoAcumuladoProps> = ({data}) => {

    const config = {
        data: data,
        xField: 'xField',
        yField: 'yField',
        width: 300,
        height: 200,
        title:"Desmatamento Acumulado de 2013 a 2023",
        scale: {
            x: {
                padding: .50,
            },
        },
        style: {
            radiusTopLeft: 2,
            radiusTopRight: 2,
            fill: '#d8952a'
        }
    }

    return (
        <Flex align='center' justify='center'>
            <Column {...config}/>
        </Flex>
    )
}
