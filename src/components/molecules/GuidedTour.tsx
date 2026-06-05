/**
 * Componente principal que gerencia toda a experiência do tour
 * Combina overlay, tooltip e modal inicial
 */

import React from 'react';
import { TourOverlay } from './TourOverlay';
import { TourTooltip } from './TourTooltip';
import { TourInitialModal } from './TourInitialModal';

export const GuidedTour: React.FC = () => {
  return (
    <>
      <TourInitialModal />
      <TourOverlay />
      <TourTooltip />
    </>
  );
};
