export function KPICards() {
  return (
    <div className="mt-16 w-full max-w-7xl mx-auto px-6">
      <div className="bg-[#0C1828] rounded-xl border border-[#112035] p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Efeito de brilho sutil no topo */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#378ADD]/50 to-transparent" />

        {/* Header da Seção */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Visão Geral da Carteira
          </h2>
          <p className="text-[#8A9AB5] text-sm">
            Monitoramento em tempo real dos principais indicadores de risco e
            recuperação.
          </p>
        </div>

        {/* Grid de KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Contratos Totais */}
          <div className="bg-[#0A1525] rounded-lg p-5 border border-[#112035] hover:border-[#378ADD]/50 transition-all duration-200 group">
            <span className="text-xs text-[#4A6A80] uppercase tracking-wider font-medium block mb-3">
              Contratos Monitorados
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-white">10.000</span>
              <span className="text-sm text-[#378ADD]">●</span>
            </div>
            <p className="text-[10px] text-[#5C6A80] mt-2">
              Carteira ativa de consórcios
            </p>
          </div>

          {/* Card 2: Valor em Risco */}
          <div className="bg-[#0A1525] rounded-lg p-5 border border-[#112035] hover:border-[#E24B4A]/50 transition-all duration-200 group">
            <span className="text-xs text-[#4A6A80] uppercase tracking-wider font-medium block mb-3">
              Valor em Risco
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[#E24B4A]">
                R$ 62,3M
              </span>
            </div>
            <p className="text-[10px] text-[#5C6A80] mt-2">
              Total inadimplente da carteira
            </p>
          </div>

          {/* Card 3: Precisão da Previsão (sem "modelo") */}
          <div className="bg-[#0A1525] rounded-lg p-5 border border-[#112035] hover:border-[#378ADD]/50 transition-all duration-200 group">
            <span className="text-xs text-[#4A6A80] uppercase tracking-wider font-medium block mb-3">
              Precisão da Previsão
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[#378ADD]">
                96,5%
              </span>
            </div>
            <p className="text-[10px] text-[#5C6A80] mt-2">
              Taxa de acerto nas projeções
            </p>
          </div>

          {/* Card 4: Recuperação (sem "R²") */}
          <div className="bg-[#0A1525] rounded-lg p-5 border border-[#112035] hover:border-[#1D9E75]/50 transition-all duration-200 group">
            <span className="text-xs text-[#4A6A80] uppercase tracking-wider font-medium block mb-3">
              Potencial de Recuperação
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[#1D9E75]">
                Alto
              </span>
            </div>
            <p className="text-[10px] text-[#5C6A80] mt-2">
              Correlação forte com resultados reais
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
