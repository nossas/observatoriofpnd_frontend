import { FC, ReactNode } from 'react'
import { Flex, Typography } from 'antd'
import { Markdown } from '.'

const { Text } = Typography

type InfoHeaderProps = {
    icon?: ReactNode
    title: string
    description?: string 
    padding?: string
}

export const InfoHeader: FC<InfoHeaderProps> = ({ icon=undefined, title, description="", padding= '0px 0px'}) => {

    return (
        <Flex gap={10} style={{padding: padding}} vertical>
            <Flex align='center' gap={7} >
                { icon }
                <Text strong style={{fontSize:'16px'}}>{title}</Text>
            </Flex>

            <Markdown text={description} />
        </Flex>
    )
}
