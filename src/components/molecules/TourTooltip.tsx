/**
 * Componente de popup com texto explicativo do tour
 * Aparece ao lado do elemento destacado
 */

import React, { useEffect, useState } from 'react';
import { Button, Card, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useTour } from 'services/tour';
import styles from './TourTooltip.module.css';

interface Position {
  top: number;
  left: number;
}

export const TourTooltip: React.FC = () => {
  const { state, getCurrentStep, nextStep, previousStep, completeTour, getTotalSteps } = useTour();
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  useEffect(() => {
    if (!state.isOpen) return;

    const currentStep = getCurrentStep();
    if (!currentStep) return;

    const element = document.querySelector(currentStep.selector);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const tooltipWidth = 350;
    const tooltipHeight = 200;
    const gap = 20;

    let top = rect.top + window.scrollY;
    let left = rect.left + window.scrollX;

    // Posiciona baseado na preferência do passo
    switch (currentStep.position) {
      case 'right':
        left = rect.right + window.scrollX + gap;
        top = rect.top + window.scrollY + rect.height / 2 - tooltipHeight / 2;
        break;
      case 'left':
        left = rect.left + window.scrollX - tooltipWidth - gap;
        top = rect.top + window.scrollY + rect.height / 2 - tooltipHeight / 2;
        break;
      case 'bottom':
        top = rect.bottom + window.scrollY + gap;
        left = rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'top':
      default:
        top = rect.top + window.scrollY - tooltipHeight - gap;
        left = rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;
        break;
    }

    // Ajusta se sair da tela
    const maxLeft = window.innerWidth - tooltipWidth - 20;
    const maxTop = document.documentElement.scrollHeight - tooltipHeight - 20;

    left = Math.max(20, Math.min(left, maxLeft));
    top = Math.max(20, Math.min(top, maxTop));

    setPosition({ top, left });
  }, [state.isOpen, getCurrentStep]);

  if (!state.isOpen) return null;

  const currentStep = getCurrentStep();
  if (!currentStep) return null;

  const isLastStep = state.currentStep === getTotalSteps() - 1;
  const isFirstStep = state.currentStep === 0;

  return (
    <Card
      className={styles.tooltip}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>{currentStep.title}</h3>
        <p className={styles.description}>{currentStep.description}</p>

        <div className={styles.progress}>
          Passo {state.currentStep + 1} de {getTotalSteps()}
        </div>

        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={previousStep}
            disabled={isFirstStep}
            type="default"
          >
            Anterior
          </Button>

          {!isLastStep ? (
            <Button
              icon={<ArrowRightOutlined />}
              onClick={nextStep}
              type="primary"
            >
              Próximo
            </Button>
          ) : (
            <Button onClick={completeTour} type="primary">
              Concluir
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
};
