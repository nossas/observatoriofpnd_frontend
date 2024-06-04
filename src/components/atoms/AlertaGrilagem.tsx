import { Flex, Typography } from "antd"
import { ReactElement, FC } from "react"

const { Text } = Typography

type alertaGrilagemProps = {
    icon: ReactElement
}

export const AlertaGrilagem: FC<alertaGrilagemProps> = ({icon}) => {

    return (
        <Flex gap={8} align={'baseline'}> 
            <Text >{icon}</Text>
            <Text strong style={{fontSize:"16px"}}>Alerta grilagem!</Text>
        </Flex>
    )
}
