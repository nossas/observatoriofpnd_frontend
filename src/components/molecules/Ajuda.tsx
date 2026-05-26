import { Button, Flex } from "antd";
import { HomeOutlined, BugOutlined, ArrowRightOutlined } from '@ant-design/icons';

const urlHome = "https://deolhonasflorestaspublicas.org.br/";
const urlComoAgir = import.meta.env.VITE_URL_COMO_AGIR;
const urlReportar = "https://deolhonasflorestaspublicas.org.br/reportar-um-problema/";

export const Ajuda = () => {
    return (
        <Flex gap={2} className="ajuda-buttons">
            <Button
                href={urlHome}
                icon={<HomeOutlined />}
                target="_blank"
                rel="noreferrer"
                type="default"
                style={{ width: '32px', height: '32px' }}
                title="Home"
            />
            
            <Button
                href={urlReportar}
                icon={<BugOutlined />}
                target="_blank"
                rel="noreferrer"
                type="default"
                style={{ width: '32px', height: '32px' }}
                title="Reportar um problema"
            />

            <Button
                href={urlComoAgir}
                icon={<ArrowRightOutlined />}
                target="_blank"
                rel="noreferrer"
                type="default"
                style={{ width: '32px', height: '32px' }}
                title="Como agir"
            />
        </Flex>
    );
}
