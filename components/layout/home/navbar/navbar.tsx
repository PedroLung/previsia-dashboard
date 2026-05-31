import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Função para normalizar texto (remover acentos)
const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1629] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo com Círculo Branco */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Container circular branco */}
          <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/20 group-hover:shadow-black/30 transition-shadow duration-300">
            <Image
              src="/logo.png"
              alt="Previsia"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>

          {/* Texto da marca */}
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-[#378ADD] transition-colors duration-200">
              Previsia
            </span>
            <span className="text-[10px] font-medium text-[#8A9AB5] tracking-[0.2em] uppercase">
              Inteligência Preditiva
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {["Problema", "Módulos", "Assistente"].map((item) => {
            const normalizedId = normalizeText(item);
            return (
              <a
                key={item}
                href={`#${normalizedId}`}
                className="relative text-sm font-medium text-[#B5C3D9] hover:text-white transition-colors duration-200 py-2 group"
              >
                {item}
                {/* Linha branca animada */}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-150 ease-out origin-left" />
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex items-center">
          <Link href="/login">
            <Button className="bg-[#378ADD] hover:bg-[#2E75C9] text-white text-sm font-semibold h-10 px-6 rounded-md transition-colors duration-200">
              Entrar na plataforma
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
