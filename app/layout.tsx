// app/layout.tsx
import { Providers } from "./providers";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#080E1A] text-[#E8F1FB] antialiased">
        <Providers>{children}</Providers>
        <Toaster
          richColors
          position="top-right"
          theme="dark"
          duration={4000}
          toastOptions={{
            style: {
              background: "#0C1828",
              border: "1px solid #152540",
              color: "#E8F1FB",
            },
          }}
        />
      </body>
    </html>
  );
}
