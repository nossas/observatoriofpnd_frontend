import { Flex, Typography } from "antd"
import { ReactElement, FC } from "react"

const { Text } = Typography

type alertaGrilagemProps = {
    icon: ReactElement
}

export const AlertaGrilagem: FC<alertaGrilagemProps> = ({icon}) => {

    return (
        <Flex>
            <Text strong>{icon} Alerta grilagem!</Text>
        </Flex>
    )
}
