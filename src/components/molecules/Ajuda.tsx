import { Button } from "antd";
import { QuestionCircleFilled } from '@ant-design/icons';
import { Bug } from "components/atoms";

const url = import.meta.env.VITE_URL_AJUDA;
const reportUrl = "https://deolhonasflorestaspublicas.org.br/reportar-um-problema/";

export const Ajuda = () => {
    return (
        <div className="ajuda-buttons">
            <Button
                href={url}
                icon={<QuestionCircleFilled />}
                target="_blank"
                rel="noreferrer"
                type="default"
                style={{ width: '32px', height: '32px' }}
            />
            <Button
                href={reportUrl}
                icon={<Bug style={{ width: 16, height: 16 }} />}
                target="_blank"
                rel="noreferrer"
                type="default"
                style={{ width: '32px', height: '32px' }}
                title="Reportar um problema"
            />
        </div>
    );
}
