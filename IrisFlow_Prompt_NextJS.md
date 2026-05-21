# IrisFlow — Prompt Completo para Desenvolvimento do Site
## Stack: Next.js 14 · React · Tailwind CSS · TypeScript · shadcn/ui

---

## CONTEXTO DO PROJETO

Você vai construir o site completo da **IrisFlow**, uma startup brasileira de tecnologia assistiva que usa rastreamento ocular (íris) via webcam comum para dar autonomia de comunicação a pessoas com ELA (Esclerose Lateral Amiotrófica) e tetraplegia. É um produto SaaS com planos mensais (Familiar, Clínica, Hospitalar).

**Stack obrigatória:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui para componentes
- Framer Motion para animações
- next-themes para dark/light mode
- lucide-react para ícones

---

## IDENTIDADE VISUAL

```
Cores primárias:
  --azul-profundo: #1F4E79
  --teal: #00A693
  --azul-medio: #2E6FA3

Cores de suporte:
  --branco: #FFFFFF
  --cinza-claro: #F4F6F9
  --cinza-texto: #64748B
  --cinza-escuro: #1E293B
  --erro: #EF4444
  --sucesso: #10B981

Dark mode:
  --bg-dark: #0A0F1A
  --bg-dark-card: #111827
  --bg-dark-border: #1F2937

Tipografia:
  - Títulos (display): font-family 'Montserrat', weight 700/800/900
  - Corpo: font-family 'Open Sans', weight 400/500/600
  - Importar via next/font/google

Logo/marca:
  - Nome: IrisFlow
  - Símbolo: ícone de olho estilizado com ondas de sinal emitidas
  - Tagline: "Comunicar vai além das palavras."
```

---

## ARQUITETURA DE PÁGINAS

```
/                    → Landing Page (pública)
/sobre               → Sobre Nós (pública)
/planos              → Planos e Preços (pública)
/login               → Login
/cadastro            → Cadastro / Sign Up
/dashboard           → Dashboard do usuário (privada, protegida)
/dashboard/config    → Configurações (privada)
```

---

## PÁGINA 1 — LANDING PAGE (`/`)

### Estrutura completa de seções:

---

### 1.1 NAVBAR (componente fixo `<Header />`)

```
- Logo IrisFlow (SVG inline do olho + nome em Montserrat bold)
- Links de navegação: Produto | Planos | Sobre | Blog
- Botão "Entrar" → /login (variant: ghost)
- Botão "Começar grátis" → /cadastro (variant: solid teal, com leve glow)
- Toggle dark/light mode (ícone sol/lua com animação de rotação)
- Mobile: menu hamburguer com drawer lateral animado (Framer Motion slide)
- Sticky com backdrop-blur-md e border-b sutil ao rolar
```

---

### 1.2 HERO SECTION

```
Layout: duas colunas (texto esquerda, visual direita) em desktop; stack em mobile.

TEXTO (coluna esquerda):
  - Badge animada no topo: 🟢 "Tecnologia assistiva brasileira" 
    (pill com borda teal, texto pequeno, fade-in com delay)
  - Headline principal (H1, Montserrat 800, ~56px desktop):
    "Devolva a voz a quem não pode mais falar."
  - Subheadline (Open Sans, cinza-texto, ~20px):
    "IrisFlow usa o movimento da íris via webcam comum para traduzir
    olhares em palavras, voz e mensagens — sem hardware caro, sem barreiras."
  - Destaque numérico em linha:
    "95% mais barato · PT-BR nativo · Webcam a partir de R$ 80"
    (3 chips inline, cada um com ícone check em teal)
  - CTAs:
    → Botão primário grande: "Teste grátis por 30 dias" (fundo teal, texto branco, seta →)
    → Botão secundário: "Ver demonstração" (outline, com ícone play)
  - Micro-copy abaixo dos botões:
    "Sem cartão de crédito · Cancele quando quiser · Suporte em português"

VISUAL (coluna direita):
  - Card flutuante simulando a interface do software desktop da IrisFlow
  - Dentro do card: teclado virtual em grid com letras em destaque teal
  - Indicador de rastreamento (ponto animado se movendo entre as teclas)
  - Badge sobreposta no canto: "● Rastreando íris — 98% confiança"
  - Sombra dramática e leve rotação 3D (CSS perspective/rotateY)
  - Fundo do hero: gradiente mesh sutil de azul-profundo para branco
    com noise texture overlay (opacity 4%)
```

---

### 1.3 SOCIAL PROOF / LOGOS

```
- Faixa com fundo cinza-claro (ou dark-card no dark mode)
- Texto: "Desenvolvido com tecnologias de ponta"
- Logos em cinza (grayscale, hover colore):
  Google MediaPipe · OpenAI · Supabase · Stripe · Vercel · Next.js
- Animação: scroll horizontal infinito (marquee CSS) em mobile
```

---

### 1.4 SEÇÃO PROBLEMA → SOLUÇÃO

```
Layout: duas colunas com card de contraste

PROBLEMA (card fundo escuro, texto branco):
  - Ícone: X em vermelho
  - Título: "O problema que ninguém quer encarar"
  - Subtítulo: "Mais de 5 milhões de brasileiros vivem com paralisia
    ou doenças neurodegenerativas que comprometem a comunicação."
  - Lista com 3 bullets em vermelho claro:
    × Soluções existentes custam entre R$ 15.000 e R$ 80.000
    × Interface somente em inglês
    × Hardware proprietário obrigatório
    × Sem suporte nem treinamento para famílias

SOLUÇÃO (card fundo teal, texto branco):
  - Ícone: checkmark animado
  - Título: "A solução que o Brasil precisava"
  - Subtítulo: "Plataforma SaaS que roda em webcam comum desde R$ 80."
  - Lista com 4 bullets em verde claro:
    ✓ Assinatura mensal a partir de R$ 79
    ✓ Interface 100% em português
    ✓ Qualquer webcam USB ou embutida
    ✓ Chatbot GPT-4o + WhatsApp integrado

- Animação: os dois cards entram com slide-in de lados opostos ao entrar na viewport (Framer Motion whileInView)
```

---

### 1.5 COMO FUNCIONA (FEATURES)

```
Título da seção: "Como o IrisFlow funciona"
Subtítulo: "Três passos para devolver a autonomia de comunicação"

STEPS (3 cards em grid ou timeline horizontal):

  Card 1 — Ícone 👁️ "Detecção da Íris"
    "Sua webcam comum captura o movimento dos olhos em tempo real.
    Nosso algoritmo MediaPipe mapeia 478 pontos do rosto com latência < 30ms."

  Card 2 — Ícone ⌨️ "Teclado Virtual Inteligente"
    "O olhar seleciona letras, palavras e frases do teclado virtual.
    O sistema aprende seu padrão ocular e melhora com o tempo."

  Card 3 — Ícone 💬 "Voz, Chat e WhatsApp"
    "O texto vira voz em português, alimenta um chatbot com GPT-4o
    e envia mensagens direto pelo WhatsApp — sem tocar no celular."

Estilo dos cards:
  - Borda sutil, fundo branco (dark: dark-card)
  - Número grande em teal (01, 02, 03) no canto superior do card
  - Linha conectora entre cards em desktop
  - Hover: card sobe 4px com sombra maior (transition suave)
```

---

### 1.6 DIFERENCIAIS / WHY US

```
Título: "Por que o IrisFlow é diferente"
Layout: grid 2x3 de feature cards

Features (ícone + título + descrição 2 linhas):

  🎯 "10x mais barato"
     "Tobii e concorrentes cobram R$ 15k–80k. Nós, R$ 79/mês."

  🌐 "Português nativo"
     "Interface, síntese de voz e suporte 100% em PT-BR."

  📷 "Sem hardware especial"
     "Funciona em qualquer webcam convencional a partir de R$ 80."

  🤖 "IA conversacional"
     "Chatbot com GPT-4o para comunicação natural e frases do cotidiano."

  💬 "WhatsApp integrado"
     "Envie mensagens de texto para contatos sem sair da plataforma."

  🔒 "Privacidade por design"
     "Dados biométricos processados localmente. Nunca vão para a nuvem (LGPD)."

Estilo:
  - Background com gradiente mesh sutil no azul-profundo como fundo da seção
  - Cards com glassmorphism: bg-white/10 backdrop-blur border-white/20
  - Ícones em círculo teal com glow sutil
  - Texto branco
```

---

### 1.7 PLANOS / PRICING

```
Título: "Planos para cada realidade"
Subtítulo: "Comece com 30 dias grátis. Sem cartão de crédito."

Toggle: "Mensal / Anual" (desconto 20% no anual, badge "Economize 20%")

3 CARDS de plano:

  FAMILIAR — R$ 79/mês
    "Para pacientes e famílias em casa"
    • 1 dispositivo
    • Acesso ao dashboard web
    • Teclado virtual + voz PT-BR
    • Chatbot GPT-4o
    • WhatsApp integrado
    • Suporte por e-mail
    CTA: "Começar grátis" (outline teal)

  CLÍNICA — R$ 349/mês ← [badge "Mais popular" em teal]
    "Para clínicas e consultórios"
    • Até 10 dispositivos
    • Painel B2B de gestão de pacientes
    • Suporte prioritário
    • Relatórios de uso e progressão
    • Calibração por perfil de paciente
    • Tudo do plano Familiar
    CTA: "Começar grátis" (fundo teal sólido)

  HOSPITALAR — R$ 1.490/mês
    "Para hospitais e redes de saúde"
    • Dispositivos ilimitados
    • Integração com prontuário eletrônico
    • SLA dedicado
    • Onboarding e treinamento da equipe
    • Dashboard personalizado
    • API de integração
    CTA: "Falar com o time" (outline azul-profundo)

Micro-copy: "Planos para SUS e ONGs disponíveis via editais. Fale conosco."

Estilo:
  - Card do meio (Clínica) levemente maior, com borda teal e sombra colorida
  - Animação: cards entram em sequência com stagger (0, 0.1s, 0.2s delay)
```

---

### 1.8 DEPOIMENTOS / SOCIAL PROOF

```
Título: "O que dizem quem usa"
Subtítulo: "Histórias reais de autonomia e dignidade"

3 cards de depoimento (avatar + nome + cargo + texto):

  "Ana Paula, Terapeuta Ocupacional — Hospital das Clínicas, SP"
  ⭐⭐⭐⭐⭐
  "Finalmente uma solução que consigo indicar para as famílias sem
  constrangimento pelo preço. O suporte em português fez toda a diferença."

  "Dr. Renato Alves, Neurologista — Santa Casa de Belo Horizonte"
  ⭐⭐⭐⭐⭐
  "Em 3 semanas de piloto, dois pacientes com ELA avançada voltaram a
  se comunicar com a família. Resultado que não víamos em anos."

  "Mariana Costa, Cuidadora — São Paulo"
  ⭐⭐⭐⭐⭐
  "Meu pai conseguiu mandar uma mensagem de WhatsApp para minha filha
  pelo primeiro olhar. Nenhum de nós conseguiu segurar as lágrimas."

Estilo:
  - Cards com aspas grandes decorativas em teal (opacity 20%)
  - Carrossel em mobile (swipe) com Embla Carousel ou CSS scroll-snap
  - Avatar: iniciais coloridas em círculo (placeholder)
```

---

### 1.9 IMPACTO / ESG

```
Título: "Tecnologia com propósito"
Layout: 4 blocos de métricas + texto à direita

Métricas animadas (contador que sobe ao entrar na viewport):
  5M+    "brasileiros que precisam de tecnologia assistiva"
  95%    "mais barato que as soluções concorrentes"
  30 dias "de trial gratuito para você testar"
  10k    "usuários ativos projetados até 2030"

Texto ao lado:
  "Cada licença vendida financia uma licença gratuita para pacientes do SUS
  pelo programa IrisFlow Doa. Porque acesso à comunicação é um direito humano,
  não um privilégio."

ODS badges: ODS 3 · ODS 9 · ODS 10 · ODS 17
```

---

### 1.10 CTA FINAL (PRE-FOOTER)

```
Fundo: gradiente de azul-profundo para teal
Texto: "Pronto para devolver a voz a quem você ama?"
Subtexto: "Comece hoje. Sem cartão. Cancele quando quiser."
Botão: "Criar conta gratuita →" (branco, texto azul-profundo)
Micro-copy: "30 dias de acesso completo · Suporte em PT-BR · LGPD compliant"
```

---

### 1.11 FOOTER

```
Logo + tagline
4 colunas:
  Produto: Recursos · Planos · Demo · Download
  Empresa: Sobre · Blog · Parceiros · Imprensa
  Suporte: Central de Ajuda · Contato · Status · Documentação
  Legal: Privacidade · Termos · LGPD · Cookies

Redes sociais: LinkedIn · Instagram · YouTube · GitHub
Copyright: "© 2026 IrisFlow Tecnologia Ltda. · CNPJ XX.XXX.XXX/0001-XX"
Badge: "Feito com ❤️ no Brasil"
```

---

## PÁGINA 2 — LOGIN (`/login`)

```
Layout: split screen
  - Esquerda (40%): branding panel
  - Direita (60%): formulário

ESQUERDA — Branding panel:
  - Fundo azul-profundo (#1F4E79) com gradiente mesh para teal
  - Logo IrisFlow grande em branco
  - Tagline: "Comunicar vai além das palavras."
  - Ilustração SVG inline: olho estilizado com ondas irradiando
  - 3 benefícios em linha vertical:
    ✓ Interface 100% em português
    ✓ Dados biométricos nunca saem do seu dispositivo
    ✓ Suporte humanizado para pacientes e famílias
  - Depoimento curto no rodapé do panel (citação de usuário)

DIREITA — Formulário:
  - Heading: "Entrar na sua conta" (Montserrat bold)
  - Subheading: "Novo por aqui? <Link href='/cadastro'>Criar conta grátis</Link>"

  - Botão OAuth: "Continuar com Google" (ícone Google SVG, borda cinza)
  - Divider: "ou continue com e-mail"

  - Campo: E-mail
    placeholder="seu@email.com"
    type="email"
    autocomplete="email"
    validação: formato de e-mail obrigatório

  - Campo: Senha
    placeholder="Sua senha"
    type="password"
    autocomplete="current-password"
    toggle show/hide password (ícone olho)

  - Linha: checkbox "Lembrar de mim" + Link "Esqueci a senha →"

  - Botão submit: "Entrar" (fundo teal, full width, loading spinner ao enviar)

  - Mensagem de erro: alerta vermelho inline se credenciais inválidas

  - Footer do formulário:
    "Ao entrar, você concorda com os <Link>Termos de Uso</Link>
    e a <Link>Política de Privacidade</Link> da IrisFlow."

COMPORTAMENTO:
  - Redireciona para /dashboard após login bem-sucedido
  - Proteger rota: se já logado, redirecionar para /dashboard
  - Loading state no botão (spinner + "Entrando...")
  - Foco automático no campo de e-mail ao carregar

ESTILO:
  - Mobile: apenas o formulário (panel some)
  - Campos com borda que fica teal ao focar (outline-teal)
  - Animação de entrada do formulário: fade + slide-up (Framer Motion)
  - Dark mode: fundo #0A0F1A, campos #111827
```

---

## PÁGINA 3 — CADASTRO (`/cadastro`)

```
Layout: split screen (mesmo padrão do login, sides invertidas)

ESQUERDA — Formulário:
  - Heading: "Crie sua conta gratuita" (Montserrat bold)
  - Subheading: "30 dias grátis, sem cartão de crédito."
    + "Já tem conta? <Link href='/login'>Entrar</Link>"

  - Botão OAuth: "Cadastrar com Google"
  - Divider: "ou preencha seus dados"

  STEP 1 — Dados pessoais (se usar multi-step, senão formulário único):
    - Campo: Nome completo
      placeholder="Seu nome completo"
      validação: mínimo 3 chars

    - Campo: E-mail
      placeholder="seu@email.com"
      validação: formato e-mail + verificar disponibilidade (debounce 500ms)
      feedback inline: "✓ E-mail disponível" / "✗ E-mail já cadastrado"

    - Campo: Senha
      placeholder="Crie uma senha forte"
      type="password"
      toggle show/hide
      Strength meter abaixo: barra colorida (fraco/médio/forte)
      Regras: mínimo 8 chars, 1 maiúscula, 1 número

    - Campo: Confirmar senha
      validação: deve ser igual à senha

  STEP 2 — Perfil de uso (radio cards):
    Heading: "Como você vai usar o IrisFlow?"
    
    Card A — Paciente / Família
      ícone 🏠 "Para uso em casa com familiar"
    
    Card B — Profissional de Saúde
      ícone 🏥 "Terapeuta, fonoaudiólogo, médico"
    
    Card C — Clínica / Hospital
      ícone 🏢 "Gestão de múltiplos pacientes"

    (radio cards com borda que fica teal ao selecionar)

  - Checkbox obrigatório:
    "Li e aceito os <Link>Termos de Uso</Link> e a <Link>Política de Privacidade</Link>"

  - Checkbox opcional:
    "Quero receber novidades, tutoriais e dicas sobre tecnologia assistiva"

  - Botão submit: "Criar conta gratuita →" (fundo teal, full width)

  - Micro-copy: 
    "🔒 Seus dados biométricos nunca saem do seu dispositivo (LGPD)"

DIREITA — Branding panel (mesmo estilo, com conteúdo diferente):
  - Título: "Junte-se a quem já transformou vidas"
  - Métricas:
    500+ pacientes ativos · 10 clínicas parceiras · 30 dias grátis
  - Cards de benefício:
    ✓ Trial de 30 dias completo, sem cartão
    ✓ Suporte humano em português
    ✓ Cancele quando quiser, sem multa
    ✓ Dados protegidos pela LGPD
  - Depoimento de usuário

PÓS-CADASTRO:
  - Redirecionar para /dashboard com toast de boas-vindas:
    "🎉 Bem-vindo ao IrisFlow! Seu trial de 30 dias começou."
  - E-mail de boas-vindas disparado automaticamente

ESTILO:
  - Progress bar no topo se multi-step (Step 1 de 2)
  - Transição animada entre steps (slide lateral)
  - Validação em tempo real (onChange + onBlur)
  - Botão desabilitado enquanto formulário inválido
```

---

## COMPONENTES COMPARTILHADOS

```typescript
// Estrutura de componentes sugerida:

components/
  ui/               ← shadcn/ui components
  layout/
    Header.tsx      ← Navbar com dark mode toggle
    Footer.tsx
    AuthLayout.tsx  ← Layout split screen para login/cadastro
  sections/         ← Seções da landing page
    Hero.tsx
    Features.tsx
    Pricing.tsx
    Testimonials.tsx
    Impact.tsx
    FinalCTA.tsx
  common/
    Logo.tsx        ← SVG do logo IrisFlow
    ThemeToggle.tsx
    LoadingButton.tsx
    PasswordStrength.tsx
    PlanCard.tsx
    FeatureCard.tsx
    CounterAnimation.tsx  ← Contador animado para métricas
```

---

## CONFIGURAÇÃO TAILWIND

```javascript
// tailwind.config.ts
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'iris-blue': '#1F4E79',
        'iris-teal': '#00A693',
        'iris-blue-mid': '#2E6FA3',
        'dark-bg': '#0A0F1A',
        'dark-card': '#111827',
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px #00A69344' },
          to: { boxShadow: '0 0 40px #00A69388' },
        },
      },
    },
  },
}
```

---

## CONFIGURAÇÃO DE FONTES (next/font)

```typescript
// app/layout.tsx
import { Montserrat, Open_Sans } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800', '900'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})
```

---

## METADATA E SEO

```typescript
// app/layout.tsx
export const metadata = {
  title: 'IrisFlow — Comunicação Assistiva por Rastreamento Ocular',
  description:
    'Plataforma SaaS brasileira de tecnologia assistiva para pessoas com ELA e tetraplegia. Eye tracking via webcam comum. 10x mais barato. PT-BR nativo.',
  keywords: 'tecnologia assistiva, eye tracking, ELA, tetraplegia, comunicação alternativa, acessibilidade',
  openGraph: {
    title: 'IrisFlow — Devolva a voz a quem não pode mais falar',
    description: 'Eye tracking via webcam. A partir de R$ 79/mês. Teste grátis por 30 dias.',
    url: 'https://irisflow.com.br',
    siteName: 'IrisFlow',
    locale: 'pt_BR',
    type: 'website',
  },
}
```

---

## ACESSIBILIDADE (WCAG 2.1 AA)

```
Obrigatório em todas as páginas:
  - aria-label em todos os botões com apenas ícone
  - role="main" no conteúdo principal
  - Contraste mínimo 4.5:1 em texto normal
  - Foco visível em todos os elementos interativos (outline teal 2px)
  - Skip link: "Ir para o conteúdo principal" (visível apenas no foco)
  - alt text descritivo em todas as imagens
  - Formulários: label associado a cada input via htmlFor/id
  - Mensagens de erro lidas por screen reader (aria-live="polite")
  - Suporte completo a navegação por teclado (Tab, Enter, Space, Esc)
  
Importante: o público-alvo inclui cuidadores de pessoas com deficiência,
então acessibilidade não é opcional — é parte do produto.
```

---

## RESPONSIVIDADE

```
Breakpoints Tailwind:
  sm: 640px   → formulários em coluna única
  md: 768px   → grid 2 colunas em features
  lg: 1024px  → split screen no login/cadastro
  xl: 1280px  → layout completo com margens generosas

Mobile first: todas as seções devem funcionar perfeitamente em 375px.
```

---

## ANIMAÇÕES COM FRAMER MOTION

```typescript
// Padrão de animação de entrada para seções:
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Stagger para listas de cards:
const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}

// Usar sempre com: whileInView="visible" initial="hidden" viewport={{ once: true }}
```

---

## NOTAS FINAIS

1. **Dark mode**: implementar com next-themes. Detectar preferência do sistema automaticamente. Persistir escolha no localStorage.

2. **Performance**: usar next/image para todas as imagens. Lazy load em seções abaixo do fold.

3. **Internacionalização**: preparar estrutura para PT-BR (padrão) com possibilidade futura de ES (Argentina/Chile — meta do Ano 3).

4. **Analytics**: preparar slots para Vercel Analytics e Google Analytics (gtag).

5. **Formulários**: usar React Hook Form + Zod para validação tipada.

6. **Toast notifications**: usar shadcn/ui Sonner para feedback de ações.

7. **Proteção de rotas**: middleware Next.js verificando sessão Supabase para rotas /dashboard/*.

---

*IrisFlow Tecnologia Ltda. · Prompt de desenvolvimento v1.0 · Confidencial*
