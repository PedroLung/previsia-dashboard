// API Client para Previsia
const API_BASE_URL =
  "https://previsia-api.2ai3ui4gvmwq.us-south.codeengine.appdomain.cloud";

// Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface PortfolioKPIs {
  total_contratos: number;
  valor_total_inadimplente: number;
  valor_total_recuperado: number;
  taxa_recuperacao: number;
  contratos_em_aberto: number;
  contratos_acordo: number;
  contratos_insucesso: number;
  contratos_ajuizados: number;
  ticket_medio: number;
  score_medio_risco: number;
}

export interface Agency {
  nome_assessoria: string;
  total_contratos: number;
  valor_recuperado: number;
  taxa_recuperacao: number;
}

export interface Contract {
  id_contrato: string;
  nome_assessoria: string;
  data_envio_assessoria: string;
  dias_em_atraso_inicial: number;
  valor_inadimplente_inicial: number;
  status_cobranca: string;
  score_interno_risco: number;
  regiao_cliente: string;
}

export interface PredictionInput {
  score_interno_risco: number;
  dias_em_atraso_inicial: number;
  valor_inadimplente_inicial: number;
  parcelas_total: number;
  parcelas_pagas: number;
  total_pago: number;
  taxa_adimplencia: number;
  velocidade_pagamento: number;
  regiao_cliente: string;
  nome_assessoria: string;
  metodo_predominante: string;
  indicador_contemplado: boolean;
  faixa_valor: string;
}

export interface PredictionResult {
  probability: number;
  prediction: string;
  risk_level: string;
}

export interface InsightExplanation {
  id_contrato: string;
  score: number;
  risk_level: string;
  top_factors: string[];
  explanation_pt: string;
}

export interface PortfolioSummary {
  summary_pt: string;
  kpis: {
    total_contratos: number;
    valor_inadimplente: number;
    taxa_recuperacao: number;
  };
}

export interface AskResponse {
  question: string;
  sql: string;
  answer: string;
  rows_returned: number;
}

class ApiClient {
  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("previsia_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = this.getToken();
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ detail: "Erro desconhecido" }));
      throw new Error(error.detail || `Erro ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async register(
    email: string,
    password: string,
    full_name: string,
  ): Promise<User> {
    return this.request<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, full_name }),
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("previsia_token", response.access_token);
    }
    return response;
  }

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("previsia_token");
    }
  }

  async getMe(): Promise<User> {
    return this.request<User>("/me");
  }

  // Analytics
  async getPortfolio(): Promise<PortfolioKPIs> {
    return this.request<PortfolioKPIs>("/analytics/portfolio");
  }

  async getAgencies(): Promise<Agency[]> {
    return this.request<Agency[]>("/analytics/agencies");
  }

  // Predictions
  async predictCollectionSuccess(
    data: PredictionInput,
  ): Promise<PredictionResult> {
    return this.request<PredictionResult>("/predict/collection-success", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Insights (LLM)
  async explainContract(id_contrato: string): Promise<InsightExplanation> {
    return this.request<InsightExplanation>(
      `/insights/explain/${id_contrato}`,
      {
        method: "POST",
      },
    );
  }

  async getPortfolioSummary(): Promise<PortfolioSummary> {
    return this.request<PortfolioSummary>("/insights/portfolio-summary", {
      method: "POST",
    });
  }

  async askQuestion(question: string): Promise<AskResponse> {
    return this.request<AskResponse>("/insights/ask", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
  }

  // Health check
  async health(): Promise<{ status: string; database: string }> {
    return this.request<{ status: string; database: string }>("/health");
  }
}

export const api = new ApiClient();
