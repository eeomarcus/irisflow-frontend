import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "sonner";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "IrisFlow — Comunicação Assistiva por Rastreamento Ocular",
  description:
    "Plataforma SaaS brasileira de tecnologia assistiva para pessoas com ELA e tetraplegia. Eye tracking via webcam comum. 10x mais barato. PT-BR nativo.",
  keywords:
    "tecnologia assistiva, eye tracking, ELA, tetraplegia, comunicação alternativa, acessibilidade",
  openGraph: {
    title: "IrisFlow — Devolva a voz a quem não pode mais falar",
    description:
      "Eye tracking via webcam. A partir de R$ 79/mês. Teste grátis por 30 dias.",
    url: "https://irisflow.com.br",
    siteName: "IrisFlow",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${openSans.variable} font-body antialiased bg-white dark:bg-dark-bg text-gray-dark dark:text-gray-100 transition-colors duration-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
