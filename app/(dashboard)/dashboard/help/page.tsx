// app/(dashboard)/dashboard/help/page.tsx
"use client";

import { DashboardHeader } from "@/components/layout/dashboard/header";
import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Book,
  MessageSquare,
  Mail,
  Search,
  ExternalLink,
  Video,
  FileText,
} from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      question: "Como funciona a análise de risco preditiva?",
      answer:
        "Nossa IA analisa histórico de pagamentos, score interno e padrões de comportamento para prever a probabilidade de recuperação de cada contrato.",
    },
    {
      question: "Como posso exportar os dados da minha carteira?",
      answer:
        "Vá até a página de Configurações > Dados e clique em 'Exportar todos os dados'. Você receberá um arquivo CSV com todas as informações.",
    },
    {
      question: "Qual a frequência de atualização dos dados?",
      answer:
        "Os dados são atualizados automaticamente a cada 60 segundos. Você também pode forçar uma atualização manual clicando no botão de refresh.",
    },
    {
      question: "Como funciona o Assistente IA?",
      answer:
        "O Assistente usa processamento de linguagem natural para entender suas perguntas e buscar informações diretamente no banco de dados, respondendo em português.",
    },
  ];

  const resources = [
    {
      icon: Book,
      title: "Documentação",
      description: "Guia completo de uso da plataforma",
      link: "#",
    },
    {
      icon: Video,
      title: "Tutoriais em Vídeo",
      description: "Aprenda com nossos tutoriais passo a passo",
      link: "#",
    },
    {
      icon: FileText,
      title: "Relatórios Técnicos",
      description: "Documentação detalhada dos modelos de IA",
      link: "#",
    },
    {
      icon: MessageSquare,
      title: "Comunidade",
      description: "Troque experiências com outros usuários",
      link: "#",
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
                Central de Ajuda
              </h1>
              <p className="text-muted-foreground mt-1">
                Encontre respostas e aprenda a usar a Previsia
              </p>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar na central de ajuda..."
                    className="pl-12 h-12 text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <div className="grid gap-4 md:grid-cols-2">
              {resources.map((resource, i) => (
                <Card
                  key={i}
                  className="hover:border-primary/50 transition-colors cursor-pointer group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <resource.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto"
                        >
                          Acessar
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQs */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <CardTitle>Perguntas Frequentes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="border-b border-border last:border-0 pb-4 last:pb-0"
                  >
                    <h3 className="font-medium text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <CardTitle>Precisa de ajuda adicional?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Nossa equipe de suporte está disponível para ajudar você.
                  Entre em contato conosco e responderemos em até 24 horas.
                </p>
                <div className="flex gap-3">
                  <Button>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat ao vivo
                  </Button>
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar e-mail
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
