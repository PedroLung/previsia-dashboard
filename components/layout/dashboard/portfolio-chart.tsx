"use client";

import useSWR from "swr";
import { api, type PortfolioKPIs } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart3 } from "lucide-react";

const fetcher = () => api.getPortfolio();
const COLORS = ["#BA7517", "#1D9E75", "#E24B4A", "#A78BFA"];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function PortfolioChart() {
  const { data, error, isLoading } = useSWR<PortfolioKPIs>(
    "portfolio",
    fetcher,
    { refreshInterval: 60000 },
  );

  const chartData = data
    ? [
        {
          name: "Em Aberto",
          value: data.contratos_em_aberto,
          color: COLORS[0],
        },
        { name: "Acordos", value: data.contratos_acordo, color: COLORS[1] },
        {
          name: "Insucesso",
          value: data.contratos_insucesso,
          color: COLORS[2],
        },
        {
          name: "Ajuizados",
          value: data.contratos_ajuizados,
          color: COLORS[3],
        },
      ]
    : [];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

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
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111C30",
                      border: "1px solid #112035",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                    formatter={(value: number) => [
                      value.toLocaleString("pt-BR"),
                      "Contratos",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full md:w-1/2 space-y-3">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">
                      {item.value.toLocaleString("pt-BR")}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}
                      %)
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total de Contratos
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {total.toLocaleString("pt-BR")}
                  </span>
                </div>
                {data && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">
                      Ticket Médio
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {formatCurrency(data.ticket_medio)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
