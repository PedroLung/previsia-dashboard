# 🎨 Previsia Design System

> Sistema visual para dashboards de inadimplência, análise de risco e inteligência financeira.

---

## Princípios

| Princípio               | Descrição                                    |
| ----------------------- | -------------------------------------------- |
| Clareza Analítica       | Dados em primeiro plano, ruído visual mínimo |
| Confiança Institucional | Aparência corporativa e profissional         |
| Densidade Controlada    | Layout compacto sem perder legibilidade      |
| Foco em Ação            | Destaque para informações críticas           |

---

# 🎨 Cores

> A identidade da Previsia é baseada em tons escuros, azuis institucionais e semântica clara para análise financeira.

---

## Marca

| Token         | Valor     | Uso                   |
| ------------- | --------- | --------------------- |
| `--brand-50`  | `#EAF4FE` | Backgrounds suaves    |
| `--brand-100` | `#D5E9FC` | Estados informativos  |
| `--brand-200` | `#A9D2F9` | Hover leve            |
| `--brand-300` | `#7DBCF6` | Elementos secundários |
| `--brand-400` | `#4FA3EE` | Ícones                |
| `--brand-500` | `#378ADD` | Ação principal        |
| `--brand-600` | `#185FA5` | Cor institucional     |
| `--brand-700` | `#134C84` | Hover botão           |
| `--brand-800` | `#0F3B66` | Estados ativos        |
| `--brand-900` | `#092441` | Elementos premium     |

---

## Superfícies

| Token                | Valor             | Uso             |
| -------------------- | ----------------- | --------------- |
| `--bg-primary`       | `#0B1629`         | Fundo principal |
| `--bg-surface`       | `#111C30`         | Cards           |
| `--bg-surface-hover` | `#16233D`         | Hover           |
| `--bg-elevated`      | `#1A2844`         | Modais          |
| `--bg-overlay`       | `rgba(0,0,0,.65)` | Overlay         |

---

## Neutros

| Token        | Valor     | Uso              |
| ------------ | --------- | ---------------- |
| `--gray-50`  | `#F8FAFC` | Texto escuro     |
| `--gray-100` | `#F1F5F9` | Background claro |
| `--gray-200` | `#E2E8F0` | Bordas claras    |
| `--gray-300` | `#CBD5E1` | Divisores        |
| `--gray-400` | `#94A3B8` | Texto auxiliar   |
| `--gray-500` | `#64748B` | Texto secundário |
| `--gray-600` | `#475569` | Labels           |
| `--gray-700` | `#334155` | Bordas           |
| `--gray-800` | `#1E293B` | Superfícies      |
| `--gray-900` | `#0F172A` | Texto principal  |

---

## Texto

| Token              | Valor     | Uso             |
| ------------------ | --------- | --------------- |
| `--text-primary`   | `#F8FAFC` | Texto principal |
| `--text-secondary` | `#B5C3D9` | Descrições      |
| `--text-muted`     | `#8A9AB5` | Labels          |
| `--text-disabled`  | `#5C6A80` | Desabilitado    |
| `--text-link`      | `#4FA3EE` | Links           |

---

## Semântica

| Token           | Valor     | Uso     |
| --------------- | --------- | ------- |
| `--success-500` | `#1D9E75` | Sucesso |
| `--success-700` | `#127356` | Hover   |
| `--warning-500` | `#BA7517` | Atenção |
| `--warning-700` | `#8A560F` | Hover   |
| `--danger-500`  | `#E24B4A` | Crítico |
| `--danger-700`  | `#B63333` | Hover   |

---

## Bordas

| Token              | Valor                   |
| ------------------ | ----------------------- |
| `--border-subtle`  | `rgba(255,255,255,.06)` |
| `--border-default` | `rgba(255,255,255,.10)` |
| `--border-strong`  | `rgba(255,255,255,.18)` |
| `--border-focus`   | `#378ADD`               |

---

## Gráficos

| Uso              | Cor       |
| ---------------- | --------- |
| Série principal  | `#378ADD` |
| Série secundária | `#4FA3EE` |
| Comparação       | `#7DBCF6` |
| Sucesso          | `#1D9E75` |
| Atenção          | `#BA7517` |
| Crítico          | `#E24B4A` |

### Escala de risco

🟢 Baixo risco → `#1D9E75`

🟡 Médio risco → `#BA7517`

🔴 Alto risco → `#E24B4A`

---

## Sombras

| Token         | Valor                        |
| ------------- | ---------------------------- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.2)`   |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,.25)` |
| `--shadow-lg` | `0 10px 30px rgba(0,0,0,.3)` |

> A Previsia prioriza superfícies limpas. Use sombras apenas quando necessário para destacar contexto ou profundidade.

---

# 🔤 Tipografia

### Page Title

```txt
Carteira em risco: R$ 2,4M
```

| Propriedade | Valor                 |
| ----------- | --------------------- |
| Tamanho     | 28px                  |
| Peso        | 500                   |
| Tracking    | -0.5px                |
| Uso         | Cabeçalhos principais |

### KPI

```txt
78,4%
```

| Propriedade | Valor               |
| ----------- | ------------------- |
| Tamanho     | 32px                |
| Peso        | 500                 |
| Uso         | Métricas principais |

### Label

```txt
Taxa de recuperação
```

| Propriedade | Valor               |
| ----------- | ------------------- |
| Tamanho     | 11px                |
| Peso        | 600                 |
| Uso         | Rótulos e overlines |

---

# 📐 Espaçamento

| Token       | Valor |
| ----------- | ----- |
| `--space-1` | 4px   |
| `--space-2` | 8px   |
| `--space-3` | 12px  |
| `--space-4` | 16px  |
| `--space-6` | 24px  |
| `--space-8` | 32px  |

Grid base: **8px**

---

# 🧩 Componentes

## KPI Card

```txt
R$ 2,4M
Carteira em risco
▲ +12,4%
```

| Propriedade | Valor   |
| ----------- | ------- |
| Radius      | 12px    |
| Padding     | 16px    |
| Border      | Default |

---

## Status Badge

| Estado  | Exemplo       |
| ------- | ------------- |
| Sucesso | 🟢 Adimplente |
| Atenção | 🟠 Atenção    |
| Crítico | 🔴 Crítico    |

---

# 📊 Dashboards

### Gráfico de Barras Empilhadas

Objetivo: acompanhar a evolução da carteira por faixa de risco.

### Heatmap

Objetivo: identificar concentração de inadimplência por região e produto.

### Funil de Recuperação

```txt
Inadimplentes
    ↓
Contatados
    ↓
Responderam
    ↓
Regularizaram
```

### Scatter Plot

Eixo X: Score de risco

Eixo Y: Valor em aberto

### Gauge

```txt
Score Médio da Carteira

      82
   [███████░░]
```
