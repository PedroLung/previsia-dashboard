// hooks/use-previsia.ts
import useSWR from "swr";

// ─── Tipos — campos reais confirmados via Network tab ─────────────────────────

export interface PortfolioKPIs {
  total_contratos: number;
  total_inadimplente_brl: number;
  score_risco_medio: number;
  taxa_acordo: number; // ex: 0.3407 → 34.07%
  taxa_insucesso: number;
  taxa_em_aberto: number;
}

export interface Agency {
  nome_assessoria: string;
  casos: number;
  taxa_sucesso: number; // ex: 0.7044 → 70.44%
  score_medio: number;
}

export interface CurrentUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export interface PortfolioSummaryResponse {
  summary_pt: string;
  kpis: {
    total_contratos: number;
    taxa_recuperacao: number;
    valor_inadimplente: number;
  };
}

export interface AskResponse {
  answer: string;
  sql: string;
}

// ─── Auth helper ──────────────────────────────────────────────────────────────

function handleUnauthorized() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("previsia_token");
    fetch("/api/auth/logout", { method: "POST" }).finally(() => {
      window.location.href = "/login";
    });
  }
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

const get = async (path: string) => {
  const res = await fetch(`/api/proxy?path=${path}`);
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("Sessão expirada");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || err.error || `Erro ${res.status}`);
  }
  return res.json();
};

const post = async (path: string, body: unknown = {}) => {
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, method: "POST", body }),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("Sessão expirada");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || err.error || `Erro ${res.status}`);
  }
  return res.json();
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function usePortfolio() {
  return useSWR<PortfolioKPIs>("portfolio", () => get("/analytics/portfolio"), {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });
}

export function useAgencies() {
  return useSWR<Agency[]>("agencies", () => get("/analytics/agencies"), {
    refreshInterval: 60_000,
    shouldRetryOnError: false,
  });
}

export function useCurrentUser() {
  return useSWR<CurrentUser>("me", () => get("/me"), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
}

// ─── Ações (não-SWR) ──────────────────────────────────────────────────────────

export async function fetchPortfolioSummary(): Promise<PortfolioSummaryResponse> {
  return post("/insights/portfolio-summary");
}

export async function askAssistant(question: string): Promise<AskResponse> {
  return post("/insights/ask", { question });
}

export async function explainContract(id: string) {
  return post(`/insights/explain/${id}`);
}

// ─── Formatadores ─────────────────────────────────────────────────────────────

export function fmtBRL(
  value: number | undefined | null,
  compact = true,
): string {
  if (value == null || isNaN(value)) return "R$ —";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 2,
  }).format(value);
}

export function fmtPct(value: number | undefined | null): string {
  if (value == null || isNaN(value)) return "—%";
  return `${(value * 100).toFixed(1)}%`;
}

export function fmtNum(value: number | undefined | null): string {
  if (value == null || isNaN(value)) return "—";
  return new Intl.NumberFormat("pt-BR").format(value);
}
