import { Flex, Typography } from "antd"
import { Column } from '@ant-design/plots';
import { FC } from "react"

const {Text} = Typography

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
        style:{
            radiusTopLeft: 2,
            radiusTopRight: 2,
            padding: '6px'
        }
    };
    return (
        <Flex vertical align='center' justify='center'>
            <Text strong style={{fontSize:'14px'}}> Área desmatada </Text>
            <Column {...config}/>
        </Flex>
    )
}
