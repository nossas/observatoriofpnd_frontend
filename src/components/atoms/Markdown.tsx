import { FC } from 'react'
import { Typography } from 'antd'
import ReactMarkdown from 'react-markdown' 

const { Text } = Typography

type MarkdownProps = {
    text: string
    highlighted?: boolean
}

export const Markdown: FC<MarkdownProps> = ({ text, highlighted=false }) => {

    return (
        <ReactMarkdown
            components={{
                strong(props) {
                    const {node, ...rest} = props
                    return <Text strong style={{color: highlighted ? '#D8952A' : 'darkgreen' }} {...rest} />                  
                }
            }}
        >
            {text}
        </ReactMarkdown>
    )
}
