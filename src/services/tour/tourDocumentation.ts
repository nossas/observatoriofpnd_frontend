/**
 * Documentação do Sistema de Tour Guiado
 * 
 * VISÃO GERAL
 * ===========
 * Sistema modular e escalável para criar tours guiados na aplicação.
 * Sem necessidade de cliques, apenas destaque com textos explicativos.
 * 
 * 
 * COMO FUNCIONA
 * =============
 * 
 * 1. Modal Inicial: Ao abrir a app, um modal oferece opção de iniciar ou pular o tour
 * 2. Overlay: Uma camada semi-transparente cobre a tela, destacando o elemento
 * 3. Tooltip: Um card com título, descrição e botões de navegação aparece ao lado
 * 4. Navegação: Botões "Anterior", "Próximo" e "Concluir" para navegar pelos passos
 * 
 * 
 * ARQUITETURA
 * ===========
 * 
 * src/services/tour/
 *   ├── types.ts                 # Interfaces e tipos TypeScript
 *   ├── tourSteps.ts             # Configuração dos passos do tour
 *   ├── TourContext.tsx           # Context para gerenciar estado
 *   ├── useTour.ts                # Hook customizado
 *   └── index.ts                  # Exportações
 * 
 * src/components/molecules/
 *   ├── GuidedTour.tsx            # Componente principal (combina tudo)
 *   ├── TourInitialModal.tsx       # Modal inicial
 *   ├── TourOverlay.tsx            # Overlay com spotlight
 *   └── TourTooltip.tsx            # Card com instruções
 * 
 * 
 * COMO USAR
 * =========
 * 
 * 1. ADICIONAR UM NOVO PASSO:
 * 
 *    No arquivo src/services/tour/tourSteps.ts:
 * 
 *    ```
 *    {
 *      id: 'meu-elemento',
 *      selector: '[data-tour="meu-elemento"]',
 *      title: 'Título do Passo',
 *      description: 'Descrição detalhada do que o usuário deve saber',
 *      position: 'right', // top, bottom, left, right
 *      highlightPadding: 8,
 *    }
 *    ```
 * 
 * 2. MARCAR UM ELEMENTO PARA O TOUR:
 * 
 *    No JSX do componente:
 * 
 *    ```tsx
 *    <div data-tour="meu-elemento">
 *      Conteúdo que será destacado
 *    </div>
 *    ```
 * 
 * 3. USAR O HOOK DO TOUR EM COMPONENTES:
 * 
 *    ```tsx
 *    import { useTour } from 'services/tour';
 * 
 *    export const MeuComponente = () => {
 *      const { state, startTour, nextStep } = useTour();
 * 
 *      if (state.isOpen) {
 *        console.log('Tour está ativo');
 *      }
 * 
 *      return <button onClick={startTour}>Iniciar Tour</button>;
 *    };
 *    ```
 * 
 * 
 * API DO HOOK useTour()
 * =====================
 * 
 * Estado:
 *   - state.isOpen: boolean - Tour está ativo?
 *   - state.currentStep: number - Índice do passo atual (0-based)
 *   - state.showInitialModal: boolean - Mostrar modal inicial?
 *   - state.hasSkipped: boolean - Usuário pulou o tour?
 *   - state.hasCompleted: boolean - Usuário completou o tour?
 * 
 * Funções:
 *   - startTour(): void - Inicia o tour do passo 0
 *   - skipTour(): void - Fecha o tour e marca como pulado
 *   - nextStep(): void - Avança para o próximo passo
 *   - previousStep(): void - Volta para o passo anterior
 *   - completeTour(): void - Finaliza o tour
 *   - resetTour(): void - Reseta tudo para o estado inicial
 *   - getCurrentStep(): TourStep | null - Retorna o passo atual
 *   - getTotalSteps(): number - Total de passos
 *   - getTourSteps(): TourStep[] - Array de todos os passos
 * 
 * 
 * ESTRUTURA DE UM PASSO (TourStep)
 * ================================
 * 
 * interface TourStep {
 *   id: string;                          // ID único do passo
 *   selector: string;                    // Seletor CSS (data-tour="...")
 *   title: string;                       // Título exibido
 *   description: string;                 // Descrição detalhada
 *   position?: 'top'|'bottom'|'left'|'right';  // Onde mostrar o tooltip
 *   highlightPadding?: number;           // Espaçamento ao redor do elemento
 * }
 * 
 * 
 * CUSTOMIZAÇÃO
 * ============
 * 
 * Estilos:
 *   - TourOverlay.module.css: Estilo do overlay e máscara
 *   - TourTooltip.module.css: Estilo do card de instruções
 *   - TourInitialModal.module.css: Estilo do modal inicial
 * 
 * Cores:
 *   - Cor principal: #1890ff (azul Ant Design)
 *   - Overlay: rgba(0, 0, 0, 0.7)
 *   - Borda: 2px solid #1890ff
 * 
 * Para alterar, edite os arquivos .module.css correspondentes.
 * 
 * 
 * EXEMPLO COMPLETO
 * ================
 * 
 * 1. Arquivo tourSteps.ts:
 *    ```
 *    {
 *      id: 'filtros-avancados',
 *      selector: '[data-tour="filtros-avancados"]',
 *      title: 'Filtros Avançados',
 *      description: 'Use esses filtros para refinar sua pesquisa. Você pode combinar múltiplos filtros.',
 *      position: 'right',
 *    }
 *    ```
 * 
 * 2. Arquivo Explore.tsx (ou qual seja o componente):
 *    ```tsx
 *    <Flex data-tour="filtros-avancados" className={styles.filters}>
 *      {/* conteúdo dos filtros */}
 *    </Flex>
 *    ```
 * 
 * Pronto! O novo passo aparece automaticamente no tour.
 * 
 * 
 * DICAS E BOAS PRÁTICAS
 * =====================
 * 
 * 1. NOMES DESCRITIVOS:
 *    Use IDs claros: "explore-panel", "map-container", "chart-section"
 *    Não use: "step1", "item2", "div3"
 * 
 * 2. SELETORES SIMPLES:
 *    Use data-tour="..." no elemento raiz
 *    Evite seletores complexos: data-tour="explore-panel" é melhor
 * 
 * 3. DESCRIÇÕES ÚTEIS:
 *    Explique o COMO e o POR QUÊ
 *    Não apenas reproduza o que está na tela
 * 
 * 4. ORDEM LÓGICA:
 *    Organize os passos na ordem que o usuário deve aprender
 *    Geralmente: exploração → visualização → entendimento → conclusão
 * 
 * 5. POSIÇÕES INTELIGENTES:
 *    - Elementos à esquerda: position: 'right'
 *    - Elementos à direita: position: 'left'
 *    - Elementos no topo: position: 'bottom'
 *    - Elementos no fundo: position: 'top'
 *    O tooltip se ajusta automaticamente se sair da tela
 * 
 * 6. PADDING/ESPAÇAMENTO:
 *    highlightPadding padrão é 8px
 *    Use 4-16px dependendo do tamanho do elemento
 *    Elementos pequenos: 4px
 *    Elementos grandes: 12-16px
 * 
 * 
 * SOLUÇÃO DE PROBLEMAS
 * ====================
 * 
 * PROBLEMA: Elemento não é destacado
 * SOLUÇÃO: Verifique se:
 *   1. O data-tour="..." está no elemento certo
 *   2. O seletor no tourSteps.ts matches com o data-tour
 *   3. O elemento está visível na tela
 *   4. Não há z-index conflitante
 * 
 * PROBLEMA: Tooltip aparece fora da tela
 * SOLUÇÃO: O código ajusta automaticamente. Se continuar:
 *   1. Tente trocar a position (top/bottom/left/right)
 *   2. Reduza highlightPadding
 * 
 * PROBLEMA: Tour não inicia
 * SOLUÇÃO:
 *   1. Verifique se TourProvider envolve a app
 *   2. Verifique se GuidedTour está renderizando
 *   3. Verifique console para erros
 * 
 * PROBLEMA: Modal inicial não aparece
 * SOLUÇÃO:
 *   1. Verifique se state.showInitialModal é true
 *   2. Limpe localStorage (pode ter sido salvo como false)
 *   3. Chame resetTour() para resetar o estado
 * 
 */

export const TOUR_DOCUMENTATION = 'Ver arquivo tourDocumentation.ts para detalhes';
