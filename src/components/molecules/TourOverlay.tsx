/**
 * Componente de overlay que destaca a área do tour
 * Cria um spotlight ao redor do elemento selecionado
 */

import React, { useEffect, useState } from 'react';
import { useTour } from 'services/tour';
import styles from './TourOverlay.module.css';

interface HighlightBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const TourOverlay: React.FC = () => {
  const { state, getCurrentStep } = useTour();
  const [highlightBox, setHighlightBox] = useState<HighlightBox | null>(null);

  useEffect(() => {
    if (!state.isOpen) {
      setHighlightBox(null);
      return;
    }

    const currentStep = getCurrentStep();
    if (!currentStep) return;

    const element = document.querySelector(currentStep.selector);
    if (!element) {
      console.warn(`Elemento não encontrado: ${currentStep.selector}`);
      return;
    }

    const rect = element.getBoundingClientRect();
    const padding = currentStep.highlightPadding || 8;

    setHighlightBox({
      top: Math.max(0, rect.top + window.scrollY - padding),
      left: Math.max(0, rect.left + window.scrollX - padding),
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    });

    const handleResize = () => {
      const newRect = element.getBoundingClientRect();
      setHighlightBox({
        top: Math.max(0, newRect.top + window.scrollY - padding),
        left: Math.max(0, newRect.left + window.scrollX - padding),
        width: newRect.width + padding * 2,
        height: newRect.height + padding * 2,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [state.isOpen, getCurrentStep]);

  if (!state.isOpen || !highlightBox) {
    return null;
  }

  return (
    <div className={styles.tourOverlay}>
      <svg
        className={styles.mask}
        width="100%"
        height="100%"
        viewBox={`0 0 ${window.innerWidth} ${document.documentElement.scrollHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={highlightBox.left}
              y={highlightBox.top}
              width={highlightBox.width}
              height={highlightBox.height}
              rx="8"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.7)"
          mask="url(#hole)"
        />
        {/* Borda ao redor do elemento destacado */}
        <rect
          x={highlightBox.left}
          y={highlightBox.top}
          width={highlightBox.width}
          height={highlightBox.height}
          rx="8"
          fill="none"
          stroke="#1890ff"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
