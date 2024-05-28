import { Flex } from "antd"
import { Column } from '@ant-design/plots';
import { FC } from "react"


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
        title: "Área desmatada",
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
        <Flex align='center' justify='center'>
            <Column {...config}/>
        </Flex>
    )
}
