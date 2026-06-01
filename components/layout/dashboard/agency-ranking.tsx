// components/layout/dashboard/agency-ranking.tsx
"use client";

import { useAgencies, fmtPct } from "@/hooks/use-previsia";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2 } from "lucide-react";

const MEDAL = [
  "bg-amber-500 text-white",
  "bg-slate-400 text-white",
  "bg-amber-700 text-white",
];

export function AgencyRanking() {
  const { data, error, isLoading } = useAgencies();

  const sorted = data
    ? [...data]
        .filter((a) => a?.nome_assessoria)
        .sort((a, b) => b.taxa_sucesso - a.taxa_sucesso)
    : [];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Ranking de Assessorias
          </CardTitle>
          {!isLoading && (
            <Badge variant="secondary" className="text-xs">
              {sorted.length} assessoria{sorted.length !== 1 ? "s" : ""}
            </Badge>
          )}
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
        ) : sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma assessoria encontrada
          </p>
        ) : (
          <div className="space-y-3">
            {sorted.map((agency, i) => (
              <div
                key={agency.nome_assessoria}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${MEDAL[i] ?? "bg-muted text-muted-foreground"}`}
                >
                  {i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {agency.nome_assessoria}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(agency.casos ?? 0).toLocaleString("pt-BR")} casos
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-emerald-500 tabular-nums">
                    {fmtPct(agency.taxa_sucesso)}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    <span>score {agency.score_medio?.toFixed(1) ?? "—"}</span>
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
