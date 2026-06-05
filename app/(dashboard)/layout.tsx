// app/(dashboard)/layout.tsx
"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware já protege no servidor - não precisa de lógica aqui
  return <>{children}</>;
}
