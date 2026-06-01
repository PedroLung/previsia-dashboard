// app/(dashboard)/dashboard/settings/page.tsx
"use client";

import { useCurrentUser } from "@/hooks/use-previsia";
import { useAuth } from "@/contexts/auth-context";
import { DashboardHeader } from "@/components/layout/dashboard/header";
import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Shield, Key } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: me, isLoading } = useCurrentUser();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Configurações
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie suas preferências e configurações da conta
              </p>
            </div>

            {/* Perfil */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <CardTitle>Perfil</CardTitle>
                </div>
                <CardDescription>Suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    {isLoading ? (
                      <Skeleton className="h-10 w-full mt-1" />
                    ) : (
                      <Input
                        id="name"
                        value={me?.full_name ?? ""}
                        readOnly
                        className="mt-1 bg-muted"
                      />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    {isLoading ? (
                      <Skeleton className="h-10 w-full mt-1" />
                    ) : (
                      <Input
                        id="email"
                        type="email"
                        value={me?.email ?? ""}
                        readOnly
                        className="mt-1 bg-muted"
                      />
                    )}
                  </div>
                  <div>
                    <Label>Função</Label>
                    {isLoading ? (
                      <Skeleton className="h-10 w-full mt-1" />
                    ) : (
                      <Input
                        value={me?.role ?? ""}
                        readOnly
                        className="mt-1 bg-muted capitalize"
                      />
                    )}
                  </div>
                </div>
                <Button
                  disabled
                  onClick={() =>
                    toast.info("Em desenvolvimento", {
                      description:
                        "Atualização de perfil será implementada em breve.",
                    })
                  }
                >
                  Salvar alterações
                </Button>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <CardTitle>Segurança</CardTitle>
                </div>
                <CardDescription>
                  Gerencie suas configurações de segurança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação de dois fatores</p>
                    <p className="text-sm text-muted-foreground">Em breve</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Configurar
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alterar senha</p>
                    <p className="text-sm text-muted-foreground">
                      Atualize sua senha periodicamente
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast.info("Em desenvolvimento", {
                        description:
                          "Mudança de senha será implementada em breve.",
                      })
                    }
                  >
                    Mudar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  <CardTitle>Chaves de API</CardTitle>
                </div>
                <CardDescription>Em desenvolvimento</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" disabled>
                  Gerar nova chave
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
