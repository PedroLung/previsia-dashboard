import useSWR from "swr";

// ─── Tipos 100% alinhados com o Swagger/OpenAPI ──────────────────────────────

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
  id: number; // Swagger define como integer
  email: string;
  full_name: string | null;
  role: string;
  created_at: string | null;
}

// O Swagger diz que retorna "string", mas na prática pode vir formatado.
// Deixamos flexível para não quebrar a UI.
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

// Alinhado com o JSON REAL que sua API retornou (ignorando o "string" genérico do Swagger)
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
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("previsia_token")
      : null;
  const res = await fetch(`/api/proxy?path=${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
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
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("previsia_token")
      : null;
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

// ─── Hooks SWR ────────────────────────────────────────────────────────────────

export function usePortfolio() {
  return useSWR<PortfolioKPIs>("portfolio", () => get("/analytics/portfolio"), {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });
}

export function useAgencies() {
  return useSWR<AgencyPerf[]>("agencies", () => get("/analytics/agencies"), {
    refreshInterval: 60_000,
    shouldRetryOnError: false,
  });
}

export function useCurrentUser() {
  return useSWR<UserOut>("me", () => get("/me"), {
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
