// hooks/use-previsia.ts
import useSWR from "swr";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface PortfolioKPIs {
  total_contratos: number;
  total_inadimplente_brl: number;
  score_risco_medio: number;
  taxa_acordo: number;
  taxa_insucesso: number;
  taxa_em_aberto: number;
}

export interface AgencyPerf {
  nome_assessoria: string;
  casos: number;
  taxa_sucesso: number;
  score_medio: number;
}

export interface UserOut {
  id: number;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string | null;
}

export type PortfolioSummaryResponse =
  | string
  | {
      summary_pt: string;
      kpis?: {
        total_contratos: number;
        taxa_recuperacao: number;
        valor_inadimplente: number;
      };
    };

export interface AskResponse {
  question: string;
  sql_generated: string;
  validation_error: string;
  row_count: number;
  rows_preview: any[];
  answer_pt: string;
}

export interface SuccessPrediction {
  score: number;
  label: string;
}

export interface ContractFeatures {
  score_risco: number;
  dias_atraso_inicial?: number | null;
  valor_inadimplente: number;
  parcelas_total?: number;
  parcelas_pagas?: number;
  total_pago?: number;
  taxa_adimplencia?: number;
  media_dias_atraso?: number;
  velocidade_pagamento?: number;
  faixa_valor: string;
  dias_atraso_bucket: string;
  regiao: string;
  nome_assessoria: string;
  metodo_predominante?: string;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("previsia_token");
}

function handleUnauthorized() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("previsia_token");
    document.cookie = "previsia_token=; path=/; max-age=0";
    window.location.replace("/login");
  }
}

const get = async (path: string) => {
  const token = getToken();

  if (!token) {
    throw new Error("Não autenticado");
  }

  const res = await fetch(`/api/proxy?path=${path}`, {
    headers: { Authorization: `Bearer ${token}` },
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

const post = async (path: string, body: unknown = {}) => {
  const token = getToken();

  if (!token) {
    throw new Error("Não autenticado");
  }

  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

// HOOKS OTIMIZADOS
export function usePortfolio() {
  return useSWR<PortfolioKPIs>(
    getToken() ? "portfolio" : null,
    () => get("/analytics/portfolio"),
    {
      refreshInterval: 0, // ← Desliga refresh automático (só atualiza quando necessário)
      revalidateOnFocus: false, // ← Não recarrega quando muda de aba
      revalidateOnReconnect: true, // ← Recarrega só quando reconecta
      shouldRetryOnError: false,
      dedupingInterval: 60000, // ← Evita requests duplicadas em 1 minuto
    },
  );
}

export function useAgencies() {
  return useSWR<AgencyPerf[]>(
    getToken() ? "agencies" : null,
    () => get("/analytics/agencies"),
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
      dedupingInterval: 60000,
    },
  );
}

export function useCurrentUser() {
  return useSWR<UserOut>(getToken() ? "me" : null, () => get("/me"), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    dedupingInterval: 300000, // ← 5 minutos de cache
  });
}

// ─── Ações (não-SWR) ──────────────────────────────────────────────────────────

export async function fetchPortfolioSummary(): Promise<PortfolioSummaryResponse> {
  return post("/insights/portfolio-summary");
}

export async function askAssistant(question: string): Promise<AskResponse> {
  return post("/insights/ask", { question });
}

export async function explainContract(id: string): Promise<string> {
  return post(`/insights/explain/${id}`);
}

export async function predictCollectionSuccess(
  features: any,
): Promise<SuccessPrediction> {
  return post("/predict/collection-success", features);
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
