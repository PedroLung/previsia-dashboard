import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0B1629] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Marca */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Previsia"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">
              Previsia
            </span>
          </div>

          {/* Atribuição Acadêmica */}
          <span className="text-xs text-[#5C6A80] text-center md:text-left">
            Projeto acadêmico — Desenvolvido para faculdade • 2026
          </span>

          {/* Links de Navegação */}
          <div className="flex items-center gap-6">
            <a
              href="#problema"
              className="text-xs text-[#5C6A80] hover:text-[#B5C3D9] transition-colors"
            >
              Problema
            </a>
            <a
              href="#modulos"
              className="text-xs text-[#5C6A80] hover:text-[#B5C3D9] transition-colors"
            >
              Módulos
            </a>
            <a
              href="#assistente"
              className="text-xs text-[#5C6A80] hover:text-[#B5C3D9] transition-colors"
            >
              Assistente
            </a>
            <Link
              href="/login"
              className="text-xs text-[#378ADD] hover:text-[#2E75C9] font-medium transition-colors"
            >
              Entrar na plataforma
            </Link>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-[#4A6A80]">
            © 2026 Previsia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
