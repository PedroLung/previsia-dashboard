"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BarChart2,
  Shield,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      if (res.status === 401) {
        toast.error("E-mail ou senha incorretos", {
          description: "Verifique suas credenciais e tente novamente.",
          duration: 4000,
        });
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error("Erro ao fazer login", {
          description: data?.detail ?? "Tente novamente em instantes.",
          duration: 4000,
        });
        return;
      }

      const data = await res.json();
      localStorage.setItem("previsia_token", data.access_token);

      toast.success("Bem-vindo de volta! 👋", {
        description: "Redirecionando para seu dashboard...",
        duration: 3000,
      });

      // Pequeno delay para o toast aparecer antes do redirect
      setTimeout(() => router.push("/overview"), 800);
    } catch {
      toast.error("Erro de conexão", {
        description: "Verifique sua internet e tente novamente.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    {
      icon: TrendingUp,
      value: "Redução de 32%",
      label: "na inadimplência com monitoramento contínuo",
      color: "#1D9E75",
    },
    {
      icon: BarChart2,
      value: "+20%",
      label: "na taxa de recuperação de crédito via IA",
      color: "#378ADD",
    },
    {
      icon: Shield,
      value: "LGPD Ready",
      label: "conformidade regulatória e auditoria completa",
      color: "#BA7517",
    },
  ];

  const dashboardStats = [
    { label: "Inadimplentes", val: "1.284", delta: "↑ 3,2%", bad: true },
    { label: "Valor em risco", val: "R$ 2,4M", delta: "↓ 1,1%", bad: false },
    { label: "Recuperação", val: "78,4%", delta: "↑ 2,7%", bad: false },
  ];

  return (
    <div className="min-h-screen bg-[#080E1A] flex">
      {/* PAINEL ESQUERDO */}
      <motion.div
        className="flex-1 flex flex-col justify-between p-8 lg:p-12 xl:p-16 max-w-[520px]"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Logo */}
        <motion.div variants={fadeInUp}>
          <Link href="/" className="flex items-center w-fit group">
            <motion.div
              className="bg-white rounded-xl p-2 shadow-lg shadow-[#378ADD]/10"
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image
                src="/logo.png"
                alt="Previsia"
                width={90}
                height={36}
                className="object-contain"
              />
            </motion.div>
          </Link>
        </motion.div>

        {/* Form area */}
        <motion.div className="flex flex-col gap-7" variants={staggerContainer}>
          {/* Header */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#378ADD] mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Acesso à plataforma
            </p>
            <h1 className="text-3xl lg:text-4xl font-light text-[#E8F1FB] tracking-tight leading-tight">
              Bem-vindo de{" "}
              <span className="font-semibold text-white">volta.</span>
            </h1>
            <p className="text-sm text-[#5A7A94] mt-3 leading-relaxed max-w-sm">
              Entre com suas credenciais para acessar os dashboards e insights
              da sua carteira.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            variants={staggerContainer}
          >
            {/* Email */}
            <motion.div className="flex flex-col gap-1.5" variants={fadeInUp}>
              <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#3A5A78]">
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "email" ? "text-[#378ADD]" : "text-[#2A4A68]"}`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="nome@empresa.com.br"
                  required
                  className="w-full bg-[#0C1828] border border-[#152540] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#E8F1FB] placeholder:text-[#2A4A68] focus:outline-none focus:border-[#378ADD] focus:ring-1 focus:ring-[#378ADD]/25 transition-all"
                />
              </div>
            </motion.div>

            {/* Senha */}
            <motion.div className="flex flex-col gap-1.5" variants={fadeInUp}>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#3A5A78]">
                  Senha
                </label>
                <button
                  type="button"
                  className="text-[11px] text-[#378ADD] hover:text-[#B5D4F4] transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "password" ? "text-[#378ADD]" : "text-[#2A4A68]"}`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#0C1828] border border-[#152540] rounded-xl pl-11 pr-11 py-3.5 text-sm text-[#E8F1FB] placeholder:text-[#2A4A68] focus:outline-none focus:border-[#378ADD] focus:ring-1 focus:ring-[#378ADD]/25 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2A4A68] hover:text-[#7BA8D4] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeInUp}>
              <Button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full h-11 bg-[#185FA5] hover:bg-[#1D6FBE] text-[#E8F1FB] text-sm font-medium rounded-xl transition-all mt-1 disabled:opacity-40 shadow-lg shadow-[#185FA5]/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Entrar na plataforma
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <motion.div className="flex items-center gap-3" variants={fadeInUp}>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1A3050] to-transparent" />
            <span className="text-[11px] text-[#2A4A68] px-2">ou</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1A3050] to-transparent" />
          </motion.div>

          {/* Link register */}
          <motion.p
            className="text-sm text-[#5A7A94] text-center"
            variants={fadeInUp}
          >
            Não tem acesso?{" "}
            <Link
              href="/register"
              className="text-[#378ADD] hover:text-[#B5D4F4] font-medium transition-colors"
            >
              Solicitar cadastro →
            </Link>
          </motion.p>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-[11px] text-[#1D3A5C] tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Projeto acadêmico — Desenvolvido para faculdade · 2026
        </motion.p>
      </motion.div>

      {/* PAINEL DIREITO */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#060C16]">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0E3A6E] rounded-full blur-[160px] opacity-30 pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#061E44] rounded-full blur-[120px] opacity-25 pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-[200px] h-[200px] bg-[#1D9E75] rounded-full blur-[100px] opacity-10 pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1A3050] to-transparent" />

        <motion.div
          className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#378ADD] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#378ADD] animate-pulse" />
              Inteligência preditiva
            </p>
            <h2 className="text-3xl xl:text-4xl font-light text-[#E8F1FB] leading-tight tracking-tight max-w-md">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Transforme dados em
              </motion.span>
              <motion.span
                className="font-semibold text-white block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                previsibilidade.
              </motion.span>
            </h2>
            <motion.p
              className="text-sm text-[#5A7A94] mt-5 leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Antecipe inadimplência, otimize cobranças e tome decisões
              estratégicas com modelos de Machine Learning treinados para o
              mercado de consórcios.
            </motion.p>
          </motion.div>

          {/* Metric cards */}
          <div className="flex flex-col gap-3">
            {metrics.map(({ icon: Icon, value, label, color }, i) => (
              <motion.div
                key={value}
                className="flex items-center gap-4 bg-[#0C1828]/60 border border-[#152540] rounded-xl p-4 backdrop-blur-md group"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ x: -4, borderColor: "#1D3A5C" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${color}12`,
                    border: `0.5px solid ${color}35`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#E8F1FB]">
                    {value}
                  </div>
                  <div className="text-xs text-[#5A7A94] mt-0.5 leading-relaxed">
                    {label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mini dashboard */}
          <motion.div
            className="bg-[#0A1525]/80 border border-[#152540] rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-[#0C1828]/80 border-b border-[#152540] px-4 py-3 flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#1D9E75]"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[11px] text-[#4A6A80] font-medium">
                Visão geral da carteira — ao vivo
              </span>
            </div>
            <div className="grid grid-cols-3 gap-px bg-[#152540]/50">
              {dashboardStats.map((k, i) => (
                <motion.div
                  key={k.label}
                  className="bg-[#0A1525] px-4 py-4 hover:bg-[#0E1E32] transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  <div className="text-[10px] uppercase tracking-widest text-[#3A5A78] mb-1.5 font-medium">
                    {k.label}
                  </div>
                  <div className="text-lg font-semibold text-[#E8F1FB]">
                    {k.val}
                  </div>
                  <div
                    className="text-[11px] mt-1 font-medium"
                    style={{ color: k.bad ? "#E05858" : "#2DB87E" }}
                  >
                    {k.delta}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
