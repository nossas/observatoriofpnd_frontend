import { Flex, Typography } from "antd"
import { Column } from '@ant-design/plots';
import { FC } from "react"
import { formatNumber } from "services/utils"

const {Text} = Typography

interface DataItem {
    xField: number;
    yField: number;
  }


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
                '#d8952a']
            }
        },
        axis: {
            y: {
                title: 'Hectare',
                titleSpacing: -5,
                labelFormatter: '~s' ,
            },
        },
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
        tooltip: (d: DataItem) => {
            return {
            value: `${formatNumber(d.yField, 2)} ha`,
          }}
    }

    return (
        <Flex vertical align='center' justify='center'>
            <Text strong style={{fontSize:'14px'}}>Área de CAR sobrepostos às FPND</Text>
            <Column {...config}/>
        </Flex>
    )
}
