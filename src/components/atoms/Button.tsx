import { Button as AntdButton } from "antd";
import { FC } from 'react';

type ButtonProps = {
    collapsed?: boolean
    label?: string
    [rest: string]: any; // rest
}

export const Button:FC<ButtonProps> = ({collapsed=false, label="", ...rest }) => {
    return (
        <AntdButton
            {...rest}
            style={{textAlign:"left"}}
        >
            {collapsed ? "" : label}
        </AntdButton>
    )
}
