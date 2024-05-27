import { Flex } from "antd"
import { Pie } from '@ant-design/plots';
import { FC } from "react"

type graficoDesmatamentoProps = {
    data: Array<object>
}

export const GraficoDesmatamentoRecorte:FC<graficoDesmatamentoProps> = ({data}) => {

    console.log('dataBolacha: ', data)

    const config = {
        data: data,
        angleField: 'angleField',
        colorField: 'colorField',
        height: 200,
        width: 300,
        title: "Gráfico Desmatamento Recorte",
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
        label: {
            text: ({angleField}: {angleField: string | number}) => {
                return angleField + '%'
            }
        }
    }

    return (
        <Flex align='center' justify='center'>
            <Pie {...config}/>
        </Flex>
    )
}
