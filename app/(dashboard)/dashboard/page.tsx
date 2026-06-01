// app/(dashboard)/dashboard/page.tsx
"use client";

import { DashboardHeader } from "@/components/layout/dashboard/header";
import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { KPICards } from "@/components/layout/dashboard/kpi-cards";
import { PortfolioChart } from "@/components/layout/dashboard/portfolio-chart";
import { PortfolioSummary } from "@/components/layout/dashboard/portfolio-summary";
import { AgencyRanking } from "@/components/layout/dashboard/agency-ranking";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Visão geral da sua carteira de cobrança
              </p>
            </div>
            <KPICards />
            <div className="grid gap-6 lg:grid-cols-2">
              <PortfolioChart />
              <PortfolioSummary />
            </div>
            <AgencyRanking />
          </div>
        </main>
      </div>
    </div>
  );
}
