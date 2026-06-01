// app/(dashboard)/dashboard/agencies/page.tsx
"use client";

import { useAgencies, fmtBRL, fmtPct, fmtNum } from "@/hooks/use-previsia";
import { DashboardHeader } from "@/components/layout/dashboard/header";
import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { AgencyRanking } from "@/components/layout/dashboard/agency-ranking";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, TrendingUp, Users, Award } from "lucide-react";

export default function AgenciesPage() {
  const { data: agencies, error, isLoading } = useAgencies();

  const totalContratos =
    agencies?.reduce((s, a) => s + a.total_contratos, 0) ?? 0;
  const totalRecuperado =
    agencies?.reduce((s, a) => s + a.valor_recuperado, 0) ?? 0;
  const mediaRecuperacao = agencies?.length
    ? agencies.reduce((s, a) => s + a.taxa_recuperacao, 0) / agencies.length
    : 0;

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6 lg:p-8">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive">Erro: {error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-primary text-sm mt-2 hover:underline"
              >
                Recarregar
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Assessorias
              </h1>
              <p className="text-muted-foreground mt-1">
                Acompanhe o desempenho de cada assessoria parceira
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              {[
                {
                  icon: Building2,
                  color: "text-primary",
                  bg: "bg-primary/10",
                  label: "Assessorias",
                  value: isLoading ? null : (agencies?.length ?? 0),
                  fmt: (v: number) => String(v),
                },
                {
                  icon: Users,
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10",
                  label: "Contratos",
                  value: isLoading ? null : totalContratos,
                  fmt: fmtNum,
                },
                {
                  icon: TrendingUp,
                  color: "text-amber-500",
                  bg: "bg-amber-500/10",
                  label: "Média Recuperação",
                  value: isLoading ? null : mediaRecuperacao,
                  fmt: fmtPct,
                },
                {
                  icon: Award,
                  color: "text-violet-400",
                  bg: "bg-violet-400/10",
                  label: "Total Recuperado",
                  value: isLoading ? null : totalRecuperado,
                  fmt: fmtBRL,
                },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}
                      >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        {item.value === null ? (
                          <Skeleton className="h-7 w-16" />
                        ) : (
                          <p className="text-2xl font-bold tabular-nums">
                            {item.fmt(item.value as number)}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <AgencyRanking />
          </div>
        </main>
      </div>
    </div>
  );
}
