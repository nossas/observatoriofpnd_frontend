import { FC, PropsWithChildren, ReactElement } from 'react'
import { Flex, theme } from 'antd'

const { useToken } = theme

interface InfoContentProps extends PropsWithChildren {
    highlighted?: boolean,
    icon?: ReactElement,
    children?: ReactElement,
}

export const InfoContent: FC<InfoContentProps> = ({ highlighted=false, icon=undefined, children }) => {
    const { token } = useToken()

    //console.log(icon)
    return (
        <Flex
            gap={10}
            style={{
                background: highlighted ? token.colorFill : undefined,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
            }}
        >
            { icon }
            { children }
        </Flex>
    )
}
