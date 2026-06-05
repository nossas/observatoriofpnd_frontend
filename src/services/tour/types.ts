/**
 * Tipos para o sistema de tour guiado
 */

export interface TourStep {
  id: string;
  selector: string; // Seletor CSS do elemento a destacar
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right'; // Posição do texto relativo ao elemento
  highlightPadding?: number; // Espaçamento ao redor do elemento destacado
}

export interface TourState {
  isOpen: boolean;
  currentStep: number;
  hasSkipped: boolean;
  hasCompleted: boolean;
  showInitialModal: boolean;
}

export interface TourContextType {
  state: TourState;
  startTour: () => void;
  skipTour: () => void;
  nextStep: () => void;
  previousStep: () => void;
  completeTour: () => void;
  resetTour: () => void;
  getCurrentStep: () => TourStep | null;
  getTotalSteps: () => number;
  getTourSteps: () => TourStep[];
}
