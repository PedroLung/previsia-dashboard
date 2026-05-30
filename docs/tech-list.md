# Previsia — Dependências e Setup do Projeto

## Stack resumida

| Camada | Tecnologia | Tipo |
|---|---|---|
| Framework | Next.js 15 + React 19 | `dependencies` |
| Linguagem | TypeScript 5 | `devDependencies` |
| Estilização | Tailwind CSS v4 | `devDependencies` |
| Componentes UI | Shadcn (CLI) + Radix UI | CLI + `dependencies` |
| Gráficos | Recharts 3 | `dependencies` |
| Autenticação | next-auth v5 (beta) | `dependencies` |
| Ícones | lucide-react | `dependencies` |

---

## Instalação passo a passo

### 1. Criar o projeto do zero

```bash
mkdir previsia-frontend && cd previsia-frontend
npm init -y
```

### 2. Framework base

```bash
npm install next@15 react react-dom
```

### 3. TypeScript e tipagens

```bash
npm install -D typescript @types/node @types/react @types/react-dom
```

### 4. Tailwind CSS v4

```bash
npm install -D tailwindcss @tailwindcss/postcss postcss
```

### 5. Autenticação SSO / OAuth 2.0

```bash
npm install next-auth@beta
```

> **Atenção:** o `@beta` é obrigatório. Sem ele o npm instala a v4 antiga, que não funciona com o App Router do Next.js 15.

### 6. Gráficos do dashboard

```bash
npm install recharts
```

### 7. Ícones

```bash
npm install lucide-react
```

### 8. Shadcn — inicializar e adicionar componentes

```bash
# Inicializa o Shadcn no projeto (configura CSS, cria components.json)
npx shadcn init

# Adiciona os componentes que o projeto vai usar
npx shadcn add button badge table dialog sidebar select tooltip
```

> O Shadcn **não é um `npm install`** — é um CLI que copia os componentes direto na sua pasta `/components/ui`. As dependências (`clsx`, `tailwind-merge`, `class-variance-authority`, `@radix-ui/react-*`) são instaladas automaticamente conforme você adiciona componentes.

---

## package.json final esperado

```json
{
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-auth": "^5.0.0-beta.31",
    "recharts": "^3.8.1",
    "lucide-react": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-select": "latest"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/node": "^22.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.0.0"
  }
}
```

> Não precisa copiar esse bloco manualmente — os comandos acima geram tudo isso automaticamente. Os `@radix-ui` vão aparecer conforme você rodar `npx shadcn add`.

---

## O que ficou de fora (e por quê)

| Lib | Motivo de não usar |
|---|---|
| `axios` | `fetch` nativo do Next.js resolve sem dependência extra |
| `redux` / `zustand` | React Context basta para o escopo deste projeto |
| `styled-components` / `emotion` | Tailwind já cobre toda a estilização |
| `chart.js` | Recharts é mais simples e idiomático no React |
| `prisma` / `drizzle` | O banco de dados é responsabilidade do backend (Túlio) |

---

## Componentes Shadcn que o projeto vai usar

| Componente | Onde usar |
|---|---|
| `button` | Ações gerais, exportação, formulários |
| `badge` | Níveis de risco (adimplente / baixo / médio / alto) |
| `table` | Listagem de clientes inadimplentes |
| `dialog` | Detalhe do cliente, explicabilidade do score |
| `sidebar` | Navegação principal com controle por papel (RBAC) |
| `select` | Filtros do dashboard (período, segmento, região) |
| `tooltip` | Informações extras nos gráficos e KPIs |