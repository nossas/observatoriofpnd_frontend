import { Flex, Typography } from "antd"
import { Pie } from '@ant-design/plots';
import { FC } from "react"

type graficoDesmatamentoProps = {
    data: Array<object>
    recorteTerritorial: String
}
const {Text} = Typography

export const GraficoDesmatamentoRecorte:FC<graficoDesmatamentoProps> = ({data, recorteTerritorial}) => {

    console.log('dataBolacha: ', data)

    const config = {
        data: data,
        angleField: 'angleField',
        colorField: 'colorField',
        innerRadius: 0.02,
        height: 200,
        width: 300,
        /* title: {
            title: `FPND n${recorteTerritorial}`,
            titleFontSize: 12,
        }, */
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
        <Flex vertical align='center' justify='center'>
            <Text strong style={{fontSize:'14px'}}> FPND n{recorteTerritorial} </Text>
            <Pie {...config}/>
        </Flex>
    )
}
