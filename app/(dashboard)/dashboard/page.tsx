"use client";

import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard/header";
import { KPICards } from "@/components/layout/dashboard/kpi-cards";
import { AgencyRanking } from "@/components/layout/dashboard/agency-ranking";
import { PortfolioChart } from "@/components/layout/dashboard/portfolio-chart";
import { AIAssistant } from "@/components/layout/dashboard/ai-assistant";
import { PortfolioSummary } from "@/components/layout/dashboard/portfolio-summary";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* KPI Cards */}
            <KPICards />

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Charts */}
              <div className="lg:col-span-2 space-y-6">
                <PortfolioChart />
                <AgencyRanking />
              </div>

              {/* Right Column - AI Assistant & Summary */}
              <div className="space-y-6">
                <PortfolioSummary />
                <AIAssistant />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
