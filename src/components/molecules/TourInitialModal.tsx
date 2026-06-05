/**
 * Modal inicial que aparece ao abrir a aplicação
 * Oferece a opção de iniciar o tour ou pular
 */

import React from 'react';
import { Modal, Button, Space } from 'antd';
import { PlayCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useTour } from 'services/tour';
import { useMapLoading } from 'services/mapLoading';
import styles from './TourInitialModal.module.css';

export const TourInitialModal: React.FC = () => {
  const { state, startTour, skipTour } = useTour();
  const { isMapLoaded } = useMapLoading();

  // Só mostra o modal se o mapa foi carregado
  const shouldShowModal = state.showInitialModal && isMapLoaded;

  return (
    <Modal
      open={shouldShowModal}
      onCancel={skipTour}
      footer={null}
      closable={false}
      centered
      width={500}
      className={styles.modal}
    >
      <div className={styles.content}>
        <div className={styles.icon}>
          <PlayCircleOutlined />
        </div>

        <h2 className={styles.title}>Bem-vindo ao Observatório!</h2>

        <p className={styles.description}>
          Gostaria de fazer um tour guiado para conhecer as principais funcionalidades da plataforma?
        </p>

        <p className={styles.subtitle}>
          O tour vai destacar as áreas principais e explicar como usar cada recurso.
        </p>

        <Space className={styles.actions}>
          <Button
            icon={<CloseOutlined />}
            onClick={skipTour}
            size="large"
          >
            Pular
          </Button>

          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={startTour}
            size="large"
          >
            Iniciar Tour
          </Button>
        </Space>
      </div>
    </Modal>
  );
};
