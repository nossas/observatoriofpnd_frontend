/**
 * Contexto para gerenciar o estado do tour guiado
 */

import React, { createContext, useState, useCallback, useMemo } from 'react';
import { TourContextType, TourState } from './types';
import { TOUR_STEPS } from './tourSteps';

export const TourContext = createContext<TourContextType | undefined>(undefined);

interface TourProviderProps {
  children: React.ReactNode;
  showInitialModal?: boolean;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children, showInitialModal = true }) => {
  const [state, setState] = useState<TourState>({
    isOpen: false,
    currentStep: 0,
    hasSkipped: false,
    hasCompleted: false,
    showInitialModal,
  });

  const startTour = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      currentStep: 0,
      hasSkipped: false,
      showInitialModal: false,
    }));
  }, []);

  const skipTour = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
      hasSkipped: true,
      showInitialModal: false,
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep < TOUR_STEPS.length - 1) {
        return {
          ...prev,
          currentStep: prev.currentStep + 1,
        };
      }
      // Ao chegar no último passo, não avança mais
      return prev;
    });
  }, []);

  const previousStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep > 0) {
        return {
          ...prev,
          currentStep: prev.currentStep - 1,
        };
      }
      return prev;
    });
  }, []);

  const completeTour = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
      hasCompleted: true,
      hasSkipped: false,
    }));
  }, []);

  const resetTour = useCallback(() => {
    setState({
      isOpen: false,
      currentStep: 0,
      hasSkipped: false,
      hasCompleted: false,
      showInitialModal,
    });
  }, [showInitialModal]);

  const getCurrentStep = useCallback(() => {
    return TOUR_STEPS[state.currentStep] || null;
  }, [state.currentStep]);

  const getTotalSteps = useCallback(() => {
    return TOUR_STEPS.length;
  }, []);

  const getTourSteps = useCallback(() => {
    return TOUR_STEPS;
  }, []);

  const value: TourContextType = useMemo(
    () => ({
      state,
      startTour,
      skipTour,
      nextStep,
      previousStep,
      completeTour,
      resetTour,
      getCurrentStep,
      getTotalSteps,
      getTourSteps,
    }),
    [
      state,
      startTour,
      skipTour,
      nextStep,
      previousStep,
      completeTour,
      resetTour,
      getCurrentStep,
      getTotalSteps,
      getTourSteps,
    ]
  );

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};
