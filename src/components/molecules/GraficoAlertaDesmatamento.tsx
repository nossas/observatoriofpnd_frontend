import { Column } from '@ant-design/plots';
import { FC } from "react"
import { Flex, Typography } from "antd"
import { useTranslation } from 'react-i18next';
import { useFormatNumber } from 'services/utils/formatNumber';

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
    const { t } = useTranslation();
    const { formatNumber } = useFormatNumber();

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
                title: t('hectare'),
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
            <Text strong style={{fontSize:'14px'}}> {t('deforested_area')} </Text>
            <Column {...config}/>
        </Flex>
    )
}
