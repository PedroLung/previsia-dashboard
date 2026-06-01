// components/layout/dashboard/portfolio-chart.tsx
"use client";

import { usePortfolio, fmtPct } from "@/hooks/use-previsia";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart3 } from "lucide-react";

const SLICES = [
  { key: "taxa_acordo" as const, name: "Acordo", color: "#1D9E75" },
  { key: "taxa_em_aberto" as const, name: "Em Aberto", color: "#BA7517" },
  { key: "taxa_insucesso" as const, name: "Insucesso", color: "#E24B4A" },
];

export function PortfolioChart() {
  const { data, error, isLoading } = usePortfolio();

  // Recharts lê `fill` direto do objeto — sem <Cell>
  const chartData = data
    ? SLICES.map((s) => ({
        name: s.name,
        value: data[s.key] ?? 0,
        fill: s.color,
      }))
    : [];

  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Distribuição da Carteira
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-sm text-destructive">Erro ao carregar dados</p>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Skeleton className="h-48 w-48 rounded-full" />
          </div>
        ) : total === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Sem dados disponíveis
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={
                      ((value: unknown) => [
                        fmtPct(Number(value)),
                        "Taxa",
                      ]) as any
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full md:w-1/2 space-y-3">
              {chartData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-foreground tabular-nums">
                    {fmtPct(item.value)}
                  </span>
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Contratos
                  </span>
                  <span className="text-lg font-semibold text-foreground tabular-nums">
                    {(data?.total_contratos ?? 0).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Score Médio
                  </span>
                  <span className="text-sm font-semibold text-primary tabular-nums">
                    {data?.score_risco_medio?.toFixed(1) ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
