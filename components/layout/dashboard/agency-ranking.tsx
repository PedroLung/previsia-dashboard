"use client";

import useSWR from "swr";
import { api, type Agency } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2 } from "lucide-react";

const fetcher = () => api.getAgencies();

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function AgencyRanking() {
  const { data, error, isLoading } = useSWR<Agency[]>("agencies", fetcher, {
    refreshInterval: 60000,
  });

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Ranking de Assessorias
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {data?.length || 0} assessorias
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-sm text-destructive">Erro ao carregar dados</p>
        ) : isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {data?.map((agency, index) => (
              <div
                key={agency.nome_assessoria}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0
                      ? "bg-[#BA7517] text-white"
                      : index === 1
                        ? "bg-gray-400 text-white"
                        : index === 2
                          ? "bg-amber-700 text-white"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {agency.nome_assessoria}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {agency.total_contratos} contratos
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-[#1D9E75]">
                    {formatCurrency(agency.valor_recuperado)}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    <span>{formatPercent(agency.taxa_recuperacao)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
