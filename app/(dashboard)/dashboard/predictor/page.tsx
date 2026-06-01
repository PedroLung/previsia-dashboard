"use client";

import { DashboardHeader } from "@/components/layout/dashboard/header";
import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { ContractPredictor } from "@/components/layout/dashboard/contract-predictor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Target } from "lucide-react";

export default function PredictorPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Simulador de Recuperação
              </h1>
              <p className="text-muted-foreground mt-1">
                Use IA para prever a probabilidade de sucesso na cobrança de
                contratos
              </p>
            </div>

            <ContractPredictor />

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <Brain className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    IA Preditiva
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Modelo treinado com milhares de casos reais
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Alta Precisão
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Previsões baseadas em múltiplas variáveis
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Decisões Melhores
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Otimize suas estratégias de cobrança
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
