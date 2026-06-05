/**
 * Componente de Loading que aparece enquanto o mapa carrega
 */

import React from 'react';
import { Spin, Flex } from 'antd';
import { useMapLoading } from 'services/mapLoading';
import styles from './MapLoadingOverlay.module.css';

export const MapLoadingOverlay: React.FC = () => {
  const { isMapLoaded } = useMapLoading();

  if (isMapLoaded) {
    return null;
  }

  return (
    <Flex
      align="center"
      justify="center"
      className={styles.overlay}
    >
      <div className={styles.content}>
        <Spin size="large" />
        <p className={styles.text}>Carregando mapa...</p>
      </div>
    </Flex>
  );
};
