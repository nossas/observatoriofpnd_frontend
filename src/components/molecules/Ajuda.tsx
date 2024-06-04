import { Button } from "antd";
import { QuestionCircleFilled } from '@ant-design/icons';

const url = import.meta.env.VITE_URL_AJUDA

export const Ajuda = () => {
    return (
        <Button
            href={url}
            icon={<QuestionCircleFilled/>}
            target="_blank"
            type="default"
            style={{width:'32px', height:'32px'}}
        />
    )
}
