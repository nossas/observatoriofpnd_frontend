# 🎯 Sistema de Tour Guiado

Um sistema modular e escalável para criar tours guiados na aplicação sem necessidade de cliques.

## 📋 Visão Geral

O tour guiado oferece uma experiência de onboarding para novos usuários:

1. **Modal Inicial**: Ao abrir, oferece opção de iniciar ou pular
2. **Overlay**: Destaca a área relevante com efeito de spotlight
3. **Tooltip**: Card com título, descrição e navegação
4. **Navegação**: Botões para navegar entre passos

## 🚀 Como Começar

### 1. Adicionar um Novo Passo

No arquivo [`tourSteps.ts`](tourSteps.ts), adicione um novo objeto ao array `TOUR_STEPS`:

```typescript
{
  id: 'id-unico',
  selector: '[data-tour="id-unico"]',
  title: 'Título do Passo',
  description: 'Descrição detalhada que o usuário vai ler...',
  position: 'right', // top, bottom, left, right
  highlightPadding: 8,
}
```

### 2. Marcar o Elemento na Tela

No seu componente JSX, adicione o atributo `data-tour`:

```tsx
<div data-tour="id-unico">
  Conteúdo que será destacado
</div>
```

**Pronto!** O novo passo aparece automaticamente no tour.

## 📁 Estrutura de Arquivos

```
src/services/tour/
├── types.ts                    # Tipos e interfaces
├── tourSteps.ts               # ⭐ Configuração dos passos
├── TourContext.tsx            # Context (estado do tour)
├── useTour.ts                 # Hook customizado
├── index.ts                   # Exportações
└── tourDocumentation.ts       # Documentação detalhada

src/components/molecules/
├── GuidedTour.tsx             # Componente principal
├── TourInitialModal.tsx        # Modal de início
├── TourOverlay.tsx             # Overlay com spotlight
└── TourTooltip.tsx             # Card de instruções
```

## 🎨 Usar o Hook do Tour

```typescript
import { useTour } from 'services/tour';

export const MeuComponente = () => {
  const {
    state,          // Estado atual
    startTour,      // Iniciar tour
    skipTour,       // Pular tour
    nextStep,       // Próximo passo
    previousStep,   // Passo anterior
    completeTour,   // Finalizar tour
  } = useTour();

  return (
    <>
      {state.isOpen && <p>Tour ativo!</p>}
      <button onClick={startTour}>Iniciar Tour</button>
    </>
  );
};
```

## 📚 API Completa

### `state` (Estado)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `isOpen` | boolean | Tour está em execução? |
| `currentStep` | number | Índice do passo atual (0-based) |
| `showInitialModal` | boolean | Mostrar modal de boas-vindas? |
| `hasSkipped` | boolean | Usuário pulou o tour? |
| `hasCompleted` | boolean | Usuário completou o tour? |

### Funções

| Função | Descrição |
|--------|-----------|
| `startTour()` | Inicia o tour a partir do primeiro passo |
| `skipTour()` | Fecha o tour imediatamente |
| `nextStep()` | Avança para o próximo passo |
| `previousStep()` | Volta para o passo anterior |
| `completeTour()` | Finaliza o tour |
| `resetTour()` | Reseta tudo para estado inicial |
| `getCurrentStep()` | Retorna o passo atual |
| `getTotalSteps()` | Retorna o número total de passos |
| `getTourSteps()` | Retorna array de todos os passos |

## 💡 Boas Práticas

### ✅ FAÇA:

```typescript
// IDs descritivos
id: 'explore-filters',
selector: '[data-tour="explore-filters"]',

// Descrições úteis
description: 'Use os filtros para refinar sua busca. Você pode combinar múltiplos critérios para encontrar exatamente o que procura.',

// Ordem lógica
// 1. Exploração (filtros)
// 2. Visualização (mapa)
// 3. Análise (gráficos)
// 4. Compreensão (explicações)
```

### ❌ EVITE:

```typescript
// IDs genéricos
id: 'step1',
selector: 'div.something > button:nth-child(2)',

// Descrições óbvias
description: 'Este é o filtro',

// Ordem aleatória
```

## 🎯 Exemplo Completo

**1. tourSteps.ts:**
```typescript
{
  id: 'map-zoom',
  selector: '[data-tour="map-zoom"]',
  title: 'Controles de Zoom do Mapa',
  description: 'Use + e - para aumentar ou diminuir o zoom. Você também pode usar a roda do mouse ou o gesto de pinça em dispositivos móveis.',
  position: 'left',
  highlightPadding: 12,
}
```

**2. Mapa.tsx:**
```tsx
<div data-tour="map-zoom" className={styles.mapControls}>
  <button>+</button>
  <button>-</button>
</div>
```

Pronto! ✨

## 🔧 Customização

### Alterar Cores

Edite `src/components/molecules/TourOverlay.tsx`:
```typescript
stroke="#1890ff"  // Cor da borda
fill="rgba(0, 0, 0, 0.7)"  // Opacidade do overlay
```

### Alterar Estilos

Edite os arquivos `.module.css`:
- `TourOverlay.module.css` - Overlay e máscara
- `TourTooltip.module.css` - Card de instruções
- `TourInitialModal.module.css` - Modal inicial

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Elemento não é destacado | Verifique `data-tour="..."` e `selector` no tourSteps.ts |
| Tooltip aparece fora da tela | Mude `position` (top/bottom/left/right) |
| Tour não inicia | Verifique se `TourProvider` envolve a app |
| Modal não aparece | Chame `resetTour()` para resetar estado |

## 📝 Próximos Passos

1. Abra [`tourSteps.ts`](tourSteps.ts)
2. Defina os passos do seu tour
3. Adicione `data-tour="..."` aos componentes
4. Teste a experiência do usuário!

---

Para detalhes mais aprofundados, veja [`tourDocumentation.ts`](tourDocumentation.ts).
