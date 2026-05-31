import { NavBar } from "@/components/layout/home/navbar/navbar";
import { Hero } from "@/components/layout/home/hero/hero";
import { DashboardSection } from "@/components/layout/home/dashboard/dashboard";
import { LandingPage } from "@/components/layout/home/landing/landing";
import { Footer } from "@/components/layout/home/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1629]">
      <NavBar />
      <Hero />
      <DashboardSection />
      <LandingPage />
      <Footer />
    </main>
  );
}
