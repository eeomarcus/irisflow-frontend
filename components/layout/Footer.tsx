import React from "react"
import Link from "next/link"
import { Logo } from "@/components/common/Logo"

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
)

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: "Produto",
      links: [
        { name: "Recursos", href: "/#features" },
        { name: "Planos", href: "/planos" },
        { name: "Demonstração", href: "/dashboard" },
        { name: "Downloads", href: "#" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nós", href: "/sobre" },
        { name: "Blog", href: "#" },
        { name: "Parceiros", href: "#" },
        { name: "Imprensa", href: "#" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", href: "#" },
        { name: "Contato", href: "#" },
        { name: "Status do Sistema", href: "#" },
        { name: "Documentação", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacidade", href: "#" },
        { name: "Termos de Uso", href: "#" },
        { name: "LGPD Compliant", href: "#" },
        { name: "Cookies", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { name: "LinkedIn", icon: LinkedinIcon, href: "#" },
    { name: "Instagram", icon: InstagramIcon, href: "#" },
    { name: "YouTube", icon: YoutubeIcon, href: "#" },
    { name: "GitHub", icon: GithubIcon, href: "#" },
  ]

  return (
    <footer className="bg-slate-50 dark:bg-dark-card border-t border-slate-200/60 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 sm:gap-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm font-body text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              "Comunicar vai além das palavras." Devolvendo a autonomia de comunicação a quem não pode mais falar.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 bg-white dark:bg-dark-bg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-iris-teal hover:border-iris-teal/50 dark:hover:text-iris-teal rounded-lg transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-display mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-iris-teal dark:hover:text-iris-teal transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {currentYear} IrisFlow Tecnologia Ltda. · Todos os direitos reservados.</p>
            <p>CNPJ 45.123.456/0001-89 · São Paulo, SP</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-dark-bg border border-slate-200/50 dark:border-slate-800/50 rounded-full">
            <span>Feito com ❤️ no Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
