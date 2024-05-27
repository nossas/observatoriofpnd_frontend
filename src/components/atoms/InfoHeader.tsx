import { FC, ReactNode } from 'react'
import { Flex, Typography } from 'antd'
import { Markdown } from '.'

const { Text } = Typography

type InfoHeaderProps = {
    icon?: ReactNode
    title: string
    description?: string 
}

export const InfoHeader: FC<InfoHeaderProps> = ({ icon=undefined, title, description="" }) => {

    return (
        <Flex gap={10} vertical>
            <Flex align='center' gap={7} >
                { icon }
                <Text strong>{title}</Text>
            </Flex>

            <Markdown text={description} />
        </Flex>
    )
}
