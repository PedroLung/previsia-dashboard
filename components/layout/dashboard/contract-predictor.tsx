"use client";

import { useState } from "react";
import { predictCollectionSuccess, fmtPct } from "@/hooks/use-previsia";
import type { ContractFeatures, SuccessPrediction } from "@/hooks/use-previsia";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const defaultFeatures: ContractFeatures = {
  score_risco: 50,
  dias_atraso_inicial: 0,
  valor_inadimplente: 0,
  parcelas_total: 0,
  parcelas_pagas: 0,
  total_pago: 0,
  taxa_adimplencia: 0,
  media_dias_atraso: 0,
  velocidade_pagamento: 0,
  faixa_valor: "Médio",
  dias_atraso_bucket: "0-30",
  regiao: "Sudeste",
  nome_assessoria: "",
  metodo_predominante: "Boleto",
};

const faixasValor = ["Baixo", "Médio", "Alto", "Muito Alto"];
const atrasoBuckets = ["0-30", "31-60", "61-90", "91-120", "120+"];
const regioes = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];
const metodos = ["Boleto", "Cartão", "PIX", "Débito Automático"];

export function ContractPredictor() {
  const [features, setFeatures] = useState<ContractFeatures>(defaultFeatures);
  const [prediction, setPrediction] = useState<SuccessPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictCollectionSuccess(features);
      setPrediction(result);
    } catch (err: any) {
      setError(err.message || "Erro ao fazer previsão");
    } finally {
      setLoading(false);
    }
  };

  const updateFeature = (key: keyof ContractFeatures, value: any) => {
    setFeatures((prev) => ({ ...prev, [key]: value }));
    setPrediction(null); // Limpa previsão anterior ao mudar dados
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-emerald-500";
    if (score >= 40) return "text-amber-500";
    return "text-destructive";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 70) return "Alta Probabilidade";
    if (score >= 40) return "Média Probabilidade";
    return "Baixa Probabilidade";
  };

  const getRiskIcon = (score: number) => {
    if (score >= 70) return CheckCircle2;
    if (score >= 40) return AlertCircle;
    return XCircle;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Simulador de Recuperação
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              Preveja a probabilidade de sucesso na cobrança
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Formulário */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Score de Risco */}
          <div className="space-y-2">
            <Label htmlFor="score_risco">Score de Risco (0-100)</Label>
            <Input
              id="score_risco"
              type="number"
              min={0}
              max={100}
              value={features.score_risco}
              onChange={(e) =>
                updateFeature("score_risco", Number(e.target.value))
              }
            />
          </div>

          {/* Valor Inadimplente */}
          <div className="space-y-2">
            <Label htmlFor="valor_inadimplente">Valor Inadimplente (R$)</Label>
            <Input
              id="valor_inadimplente"
              type="number"
              min={0}
              step={0.01}
              value={features.valor_inadimplente || ""}
              onChange={(e) =>
                updateFeature("valor_inadimplente", Number(e.target.value))
              }
            />
          </div>

          {/* Dias de Atraso */}
          <div className="space-y-2">
            <Label htmlFor="dias_atraso_inicial">Dias de Atraso Inicial</Label>
            <Input
              id="dias_atraso_inicial"
              type="number"
              min={0}
              value={features.dias_atraso_inicial || ""}
              onChange={(e) =>
                updateFeature("dias_atraso_inicial", Number(e.target.value))
              }
            />
          </div>

          {/* Faixa de Valor */}
          <div className="space-y-2">
            <Label>Faixa de Valor</Label>
            <Select
              value={features.faixa_valor}
              onValueChange={(value) => updateFeature("faixa_valor", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {faixasValor.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bucket de Atraso */}
          <div className="space-y-2">
            <Label>Bucket de Atraso</Label>
            <Select
              value={features.dias_atraso_bucket}
              onValueChange={(value) =>
                updateFeature("dias_atraso_bucket", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {atrasoBuckets.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b} dias
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Região */}
          <div className="space-y-2">
            <Label>Região</Label>
            <Select
              value={features.regiao}
              onValueChange={(value) => updateFeature("regiao", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regioes.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Parcelas Total */}
          <div className="space-y-2">
            <Label htmlFor="parcelas_total">Total de Parcelas</Label>
            <Input
              id="parcelas_total"
              type="number"
              min={0}
              value={features.parcelas_total || ""}
              onChange={(e) =>
                updateFeature("parcelas_total", Number(e.target.value))
              }
            />
          </div>

          {/* Parcelas Pagas */}
          <div className="space-y-2">
            <Label htmlFor="parcelas_pagas">Parcelas Pagas</Label>
            <Input
              id="parcelas_pagas"
              type="number"
              min={0}
              value={features.parcelas_pagas || ""}
              onChange={(e) =>
                updateFeature("parcelas_pagas", Number(e.target.value))
              }
            />
          </div>

          {/* Método Predominante */}
          <div className="space-y-2">
            <Label>Método de Pagamento</Label>
            <Select
              value={features.metodo_predominante}
              onValueChange={(value) =>
                updateFeature("metodo_predominante", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {metodos.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botão Prever */}
        <Button onClick={handlePredict} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Brain className="w-4 h-4 mr-2 animate-pulse" />
              Analisando...
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4 mr-2" />
              Prever Probabilidade de Recuperação
            </>
          )}
        </Button>

        {/* Erro */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Resultado */}
        {prediction && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = getRiskIcon(prediction.score * 100);
                  return (
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${getRiskColor(prediction.score * 100)} bg-background`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  );
                })()}
                <div>
                  <p className="text-sm text-muted-foreground">
                    Probabilidade de Sucesso
                  </p>
                  <p
                    className={`text-2xl font-bold tabular-nums ${getRiskColor(prediction.score * 100)}`}
                  >
                    {fmtPct(prediction.score)}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`text-sm ${getRiskColor(prediction.score * 100)} border-current`}
              >
                {getRiskLabel(prediction.score * 100)}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Score de Confiança
                </span>
                <span className="font-semibold">
                  {prediction.score.toFixed(1)}%
                </span>
              </div>
              <Progress value={prediction.score * 100} className="h-2" />
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Classificação:</strong>{" "}
                {prediction.label}
              </p>
            </div>
          </div>
        )}

        {/* Estado inicial */}
        {!prediction && !loading && !error && (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">
              Preencha os dados do contrato e clique em "Prever" para ver a
              probabilidade de recuperação
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
