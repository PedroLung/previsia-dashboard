// app/(dashboard)/dashboard/assistant/page.tsx
"use client";

import { DashboardHeader } from "@/components/layout/dashboard/header";
import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { AIAssistant } from "@/components/layout/dashboard/ai-assistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lightbulb, TrendingUp, Target } from "lucide-react";

export default function AssistantPage() {
  const suggestedQuestions = [
    {
      icon: TrendingUp,
      question: "Quais clientes têm maior risco de inadimplência?",
      category: "Risco",
    },
    {
      icon: Target,
      question: "Qual assessoria tem a melhor taxa de recuperação?",
      category: "Performance",
    },
    {
      icon: Lightbulb,
      question: "Quanto recuperamos este mês comparado ao anterior?",
      category: "Financeiro",
    },
    {
      icon: Brain,
      question: "Previsão de recuperação para os próximos 3 meses",
      category: "Previsão",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Assistente IA
              </h1>
              <p className="text-muted-foreground mt-1">
                Pergunte qualquer coisa sobre sua carteira em linguagem natural
              </p>
            </div>

            {/* Suggested Questions */}
            <div className="grid gap-4 md:grid-cols-2">
              {suggestedQuestions.map((item, i) => (
                <Card
                  key={i}
                  className="hover:border-primary/50 transition-colors cursor-pointer group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item.question}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Assistant Component */}
            <AIAssistant />

            {/* Features */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <Brain className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    IA Avançada
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Modelo Llama 3.3 70B treinado para entender seu negócio
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-[#1D9E75] mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Respostas Precisas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dados em tempo real da sua carteira de cobrança
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Lightbulb className="w-12 h-12 text-[#BA7517] mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Insights Acionáveis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Recomendações práticas baseadas em dados
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
