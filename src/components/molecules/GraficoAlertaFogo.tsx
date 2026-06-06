import { Column } from '@ant-design/plots';
import { FC } from "react"
import { Flex, Typography } from "antd"
import { useTranslation } from 'react-i18next';
import { useFormatNumber } from 'services/utils/formatNumber';

const {Text} = Typography

interface DataItem {
    xField: string;
    yField: number;
    colorField: string;
}

type graficoAlertaProps = {
    data: Array<object>
}

export const GraficoAlertaFogo : FC<graficoAlertaProps> = ({data}) => {
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
        scale: {
            color: {
              range: [
                '#d00000',
                '#e85d04']
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
            <Text strong style={{fontSize:'14px'}}> {t('burned_area')} </Text>
            <Column {...config}/>
        </Flex>
    )
}
