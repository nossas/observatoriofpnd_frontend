/**
 * Hook customizado para acessar o contexto do tour
 */

import { useContext } from 'react';
import { TourContext } from './TourContext';
import { TourContextType } from './types';

export const useTour = (): TourContextType => {
  const context = useContext(TourContext);

  if (!context) {
    throw new Error('useTour deve ser usado dentro de um TourProvider');
  }

  return context;
};
