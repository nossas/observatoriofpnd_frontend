import { Column } from '@ant-design/plots';
import { FC } from "react"
import { formatNumber } from "services/utils"
import { Flex, Typography } from "antd"

const {Text} = Typography

interface DataItem {
    xField: number;
    yField: number;
  }


type graficoAlertaProps = {
    data: Array<object>
}
//https://ant--design--charts-antgroup-com.translate.goog/en/options/plots/component/axis?_x_tr_sl=pt&_x_tr_tl=en&_x_tr_hl=pt-BR&_x_tr_pto=wapp&_x_tr_hist=true
export const GraficoAlertaDesmatamento : FC<graficoAlertaProps> = ({data}) => {

    const config = {
        data: data,
        xField: 'xField',
        yField: 'yField',
        colorField: 'colorField',
        height: 200,
        width: 300,
        group: true,
        // inset: 10,
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
        style:{
            radiusTopLeft: 2,
            radiusTopRight: 2,
            padding: '6px'
        },
        tooltip: (d: DataItem) => {
            return {
            value: `${formatNumber(d.yField, 2)} ha`,
          }}
    };
    return (
        <Flex vertical align='center' justify='center'>
            <Text strong style={{fontSize:'14px'}}> Área desmatada </Text>
            <Column {...config}/>
        </Flex>
    )
}
