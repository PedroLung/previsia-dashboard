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
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const PASSWORD_RULES = [
  { label: "8+ caracteres", test: (p: string) => p.length >= 8 },
  { label: "Letra maiúscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Letra minúscula", test: (p: string) => /[a-z]/.test(p) },
  { label: "Número", test: (p: string) => /\d/.test(p) },
];

type Step = 1 | 2;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  // Validação do step 1
  const step1Valid =
    form.full_name.trim().length >= 2 && /\S+@\S+\.\S+/.test(form.email);

  // Validação da senha
  const pwRules = PASSWORD_RULES.map((r) => ({
    ...r,
    met: r.test(form.password),
  }));
  const pwValid = pwRules.every((r) => r.met);
  const matchValid = form.password === form.confirm && form.confirm.length > 0;
  const step2Valid = pwValid && matchValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!step1Valid) {
        toast.error("Campos incompletos", {
          description: "Preencha nome e e-mail válidos para continuar.",
          duration: 4000,
        });
        return;
      }
      setStep(2);
      return;
    }

    if (!step2Valid) {
      toast.error("Senha inválida", {
        description: "Verifique se sua senha atende todos os requisitos.",
        duration: 4000,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      if (res.status === 409) {
        toast.error("E-mail já cadastrado", {
          description: "Este e-mail já possui uma conta. Tente fazer login.",
          duration: 5000,
          action: {
            label: "Ir para login",
            onClick: () => router.push("/login"),
          },
        });
        setStep(1);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error("Erro ao criar conta", {
          description: data?.detail ?? "Tente novamente em instantes.",
          duration: 4000,
        });
        return;
      }

      toast.success("Conta criada com sucesso! 🎉", {
        description: "Faça login para acessar a plataforma.",
        duration: 4000,
      });
      setSuccess(true);
    } catch {
      toast.error("Erro de conexão", {
        description: "Verifique sua internet e tente novamente.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  // ── Tela de sucesso ──────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-[#080E1A] flex items-center justify-center p-8">
        <motion.div
          className="max-w-sm text-center flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/30 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 400 }}
          >
            <CheckCircle2 className="w-8 h-8 text-[#1D9E75]" />
          </motion.div>

          <div>
            <h1 className="text-xl font-medium text-white mb-2">
              Conta criada!
            </h1>
            <p className="text-sm text-[#5A7A94] leading-relaxed">
              Cadastro realizado com sucesso. Faça login para acessar a
              plataforma.
            </p>
          </div>

          <Button
            onClick={() => router.push("/login")}
            className="h-11 px-8 bg-[#185FA5] hover:bg-[#1D6FBE] text-[#E8F1FB] text-sm font-medium rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ir para o login
          </Button>
        </motion.div>
      </div>
    );
  }

  // ── Layout principal ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080E1A] flex">
      {/* PAINEL ESQUERDO */}
      <motion.div
        className="flex-1 flex flex-col justify-between p-8 lg:p-12 xl:p-16 max-w-[520px]"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Logo + step indicator */}
        <motion.div
          className="flex items-center justify-between"
          variants={fadeInUp}
        >
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

          <div className="flex items-center gap-2">
            {([1, 2] as Step[]).map((s) => (
              <motion.div
                key={s}
                className="h-1.5 rounded-full transition-all duration-500"
                animate={{
                  width: step === s ? 28 : 20,
                  backgroundColor: step >= s ? "#378ADD" : "#152540",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Header */}
        <motion.div className="flex flex-col gap-6" variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#378ADD] mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {step === 1 ? "Criar conta" : "Defina sua senha"}
            </p>
            <h1 className="text-3xl font-light text-[#E8F1FB] tracking-tight leading-tight">
              {step === 1 ? (
                <>
                  Crie sua{" "}
                  <span className="font-semibold text-white">conta.</span>
                </>
              ) : (
                <>
                  Quase <span className="font-semibold text-white">lá.</span>
                </>
              )}
            </h1>
            <p className="text-sm text-[#5A7A94] mt-3 leading-relaxed max-w-sm">
              {step === 1
                ? "Preencha nome e e-mail para começar."
                : "Escolha uma senha segura para proteger sua conta."}
            </p>
          </motion.div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={step}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: step === 1 ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: step === 1 ? 16 : -16 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 ? (
                <>
                  {/* Nome */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#3A5A78]">
                      Nome completo
                    </label>
                    <div className="relative">
                      <User
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "name" ? "text-[#378ADD]" : "text-[#2A4A68]"}`}
                      />
                      <input
                        type="text"
                        value={form.full_name}
                        onChange={set("full_name")}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Seu nome completo"
                        required
                        className="w-full bg-[#0C1828] border border-[#152540] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#E8F1FB] placeholder:text-[#2A4A68] focus:outline-none focus:border-[#378ADD] focus:ring-1 focus:ring-[#378ADD]/25 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#3A5A78]">
                      E-mail
                    </label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "email" ? "text-[#378ADD]" : "text-[#2A4A68]"}`}
                      />
                      <input
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="nome@empresa.com.br"
                        required
                        className="w-full bg-[#0C1828] border border-[#152540] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#E8F1FB] placeholder:text-[#2A4A68] focus:outline-none focus:border-[#378ADD] focus:ring-1 focus:ring-[#378ADD]/25 transition-all"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Senha */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#3A5A78]">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "pw" ? "text-[#378ADD]" : "text-[#2A4A68]"}`}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={set("password")}
                        onFocus={() => setFocused("pw")}
                        onBlur={() => setFocused(null)}
                        placeholder="Mínimo 8 caracteres"
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
                  </div>

                  {/* Confirmar senha */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#3A5A78]">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "confirm" ? "text-[#378ADD]" : "text-[#2A4A68]"}`}
                      />
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={form.confirm}
                        onChange={set("confirm")}
                        onFocus={() => setFocused("confirm")}
                        onBlur={() => setFocused(null)}
                        placeholder="Repita a senha"
                        required
                        className={`w-full bg-[#0C1828] border rounded-xl pl-11 pr-11 py-3.5 text-sm text-[#E8F1FB] placeholder:text-[#2A4A68] focus:outline-none focus:ring-1 transition-all ${
                          form.confirm.length > 0
                            ? matchValid
                              ? "border-[#1D9E75] focus:border-[#1D9E75] focus:ring-[#1D9E75]/20"
                              : "border-[#E24B4A] focus:border-[#E24B4A] focus:ring-[#E24B4A]/20"
                            : "border-[#152540] focus:border-[#378ADD] focus:ring-[#378ADD]/25"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2A4A68] hover:text-[#7BA8D4] transition-colors"
                      >
                        {showConfirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Requisitos */}
                  <div className="grid grid-cols-2 gap-2 p-4 bg-[#0C1828] border border-[#152540] rounded-xl">
                    {pwRules.map((r) => (
                      <div key={r.label} className="flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${r.met ? "bg-[#1D9E75]/20" : "bg-[#152540]"}`}
                        >
                          <CheckCircle2
                            className={`w-2.5 h-2.5 transition-colors ${r.met ? "text-[#1D9E75]" : "text-[#2A4A68]"}`}
                          />
                        </div>
                        <span
                          className={`text-xs transition-colors ${r.met ? "text-[#E8F1FB]" : "text-[#4A6A80]"}`}
                        >
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Botões de navegação */}
              <div className="flex gap-3 mt-2">
                {step === 2 && (
                  <Button
                    type="button"
                    onClick={() => {
                      setStep(1);
                    }}
                    variant="outline"
                    className="flex-1 h-11 bg-transparent border-[#152540] text-[#5A7A94] hover:bg-[#0E1E32] hover:text-[#E8F1FB] hover:border-[#1A3050] rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={
                    loading ||
                    (step === 1 && !step1Valid) ||
                    (step === 2 && !step2Valid)
                  }
                  className="flex-1 h-11 bg-[#185FA5] hover:bg-[#1D6FBE] text-[#E8F1FB] text-sm font-medium rounded-xl transition-all disabled:opacity-40 shadow-lg shadow-[#185FA5]/20"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Criando conta...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {step === 1 ? "Continuar" : "Criar conta"}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </motion.form>
          </AnimatePresence>

          {/* Link login */}
          <p className="text-sm text-[#5A7A94] text-center">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-[#378ADD] hover:text-[#B5D4F4] font-medium transition-colors"
            >
              Fazer login →
            </Link>
          </p>
        </motion.div>

        <p className="text-[11px] text-[#1D3A5C] tracking-wider uppercase">
          Projeto acadêmico — Desenvolvido para faculdade · 2026
        </p>
      </motion.div>

      {/* PAINEL DIREITO */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#060C16]">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0E3A6E] rounded-full blur-[150px] opacity-30 pointer-events-none"
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-[250px] h-[250px] bg-[#1D9E75] rounded-full blur-[120px] opacity-08 pointer-events-none"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#112035] to-transparent" />

        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16 w-full gap-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#378ADD] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
              Por que a Previsia
            </p>
            <h2 className="text-3xl xl:text-4xl font-light text-[#E8F1FB] leading-tight tracking-tight">
              A plataforma que sua
              <br />
              <span className="font-semibold text-white">empresa precisa.</span>
            </h2>
            <p className="text-sm text-[#4A6A80] mt-4 leading-relaxed max-w-sm">
              Inteligência artificial para antecipar inadimplência, otimizar
              cobranças e transformar dados em decisões estratégicas.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                icon: ShieldCheck,
                title: "Segurança & LGPD",
                desc: "Dados criptografados em trânsito e em repouso. Conformidade regulatória completa.",
                color: "#1D9E75",
              },
              {
                icon: Zap,
                title: "Inferência em tempo real",
                desc: "Score de risco calculado em menos de 300ms por requisição via API REST.",
                color: "#378ADD",
              },
              {
                icon: CheckCircle2,
                title: "Modelos auditáveis",
                desc: "ROC-AUC 0,965 no modelo principal. Explicabilidade local com SHAP por predição.",
                color: "#BA7517",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                className="flex items-start gap-4 bg-[#0C1828]/60 border border-[#112035] rounded-xl p-4 backdrop-blur-sm"
                whileHover={{ x: -4, borderColor: "#1D3A5C" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${color}12`,
                    border: `0.5px solid ${color}35`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#E8F1FB] mb-1">
                    {title}
                  </div>
                  <div className="text-xs text-[#4A6A80] leading-relaxed">
                    {desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Passo a passo */}
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#2A4A68] mb-1">
              O que acontece agora
            </p>
            {[
              { n: "01", t: "Crie sua conta", s: "Nome, e-mail e senha" },
              {
                n: "02",
                t: "Acesse a plataforma",
                s: "Login imediato após cadastro",
              },
              {
                n: "03",
                t: "Explore os dashboards",
                s: "KPIs, scores e insights em tempo real",
              },
            ].map((item) => (
              <div key={item.n} className="flex items-center gap-3">
                <span className="text-[10px] font-medium text-[#1D3A5C] w-5 flex-shrink-0">
                  {item.n}
                </span>
                <div className="flex-1 h-px bg-[#0F1E30]" />
                <div className="text-right">
                  <span className="text-xs font-medium text-[#7BA8D4]">
                    {item.t}
                  </span>
                  <span className="text-xs text-[#2A4A68] ml-2">{item.s}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
