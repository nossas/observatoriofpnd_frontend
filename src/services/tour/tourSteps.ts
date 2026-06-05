/**
 * Configuração dos passos do tour guiado
 * Fácil de editar e estender
 */

import { TourStep } from './types';

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'explore-panel',
    selector: '[data-tour="explore-panel"]',
    title: 'Painel de Exploração',
    description:
      'Aqui você pode explorar e filtrar os dados sobre desmatamento, conservação e ocupação das terras no Brasil. Use os filtros para refinar sua busca por região, períodos e outros critérios.',
    position: 'right',
    highlightPadding: 8,
  },
  {
    id: 'map-container',
    selector: '[data-tour="map-container"]',
    title: 'Mapa Interativo',
    description:
      'Este é o mapa principal que mostra visualmente os dados sobre florestamento. Você pode fazer zoom, arrastar para navegar e interagir com diferentes camadas de informação para entender melhor a situação das florestas.',
    position: 'left',
    highlightPadding: 8,
  },
  {
    id: 'understand-section',
    selector: '.entenda',
    title: 'Entenda os Dados',
    description:
      'Nesta seção você encontra gráficos detalhados, estatísticas e explicações sobre o que cada dado representa. Consulte aqui para ter uma compreensão completa dos indicadores de florestamento.',
    position: 'left',
    highlightPadding: 12,
  },
  {
    id: 'legend-controls',
    selector: '.legenda',
    title: 'Legenda e Controles',
    description:
      'Aqui você encontra a legenda que explica as cores e padrões do mapa, além dos controles de zoom para navegar. A legenda se adapta conforme você muda a camada de visualização.',
    position: 'top',
    highlightPadding: 8,
  },
];

/**
 * COMO ADICIONAR UM NOVO PASSO:
 * 
 * 1. Adicione um objeto TourStep neste array com:
 *    - id: identificador único
 *    - selector: seletor CSS do elemento (use data-tour="seu-id")
 *    - title: título do passo
 *    - description: descrição detalhada
 *    - position: posição do texto (top, bottom, left, right)
 *    - highlightPadding: espaçamento ao redor do elemento
 * 
 * 2. No componente que você quer destacar, adicione:
 *    <div data-tour="seu-id" ...>
 * 
 * 3. Pronto! O novo passo aparecerá no tour automaticamente
 */
