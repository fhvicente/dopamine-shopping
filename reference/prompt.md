# PROMPT — Fake E-commerce de Dopamina

> **Stack sugerida:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion  
> **Referência analisada:** dopamineshopping.com  
> **Objetivo:** Site de "compras fake" que entrega o prazer neurológico do ato de comprar sem gastar um cêntimo.

---

## CONTEXTO DO PRODUTO

Cria um site de e-commerce 100% falso chamado **dopamina.shop** (ou nome à escolha).  
O conceito central é: **a dopamina da compra sem o custo da compra**.

O utilizador navega num catálogo real de produtos, adiciona ao carrinho, faz "checkout", "paga" com um cartão fictício — e acompanha a entrega em tempo real num mapa animado com eventos absurdos (baleia, OVNIs, alfândega imaginária, triângulo das Bermudas). A conta bancária nunca é debitada. Nenhum dado real é processado.

---

## IDENTIDADE VISUAL

### Paleta de cores
```
--brand-primary: #7C3AED       /* roxo dopamina — cor principal */
--brand-accent:  #F59E0B       /* âmbar elétrico — alertas, badges, CTAs secundários */
--brand-hot:     #EF4444       /* vermelho urgência — contagens, "oferta a acabar" */
--bg-dark:       #0D0D0D       /* fundo quase-preto */
--bg-card:       #1A1A2E       /* cards de produto */
--text-primary:  #F8FAFC       /* texto principal */
--text-muted:    #94A3B8       /* texto secundário */
--border:        #2D2D4E       /* bordas subtis */
```

### Tipografia
- **Display:** `Space Grotesk` — pesado, tech, geek. Usado em títulos grandes e no hero.
- **Body:** `Inter` — legível, neutro, limpo. Usado em descrições e UI.
- **Mono/Dados:** `JetBrains Mono` — preços, tracking IDs, códigos de desconto.

### Personalidade visual
- Dark mode por defeito, sem opção de toggle.
- Pill badges com brilho (box-shadow colorido).
- Gradientes subtis em roxo/índigo nos CTAs principais.
- Ícone da marca: uma cápsula 💊 estilizada.
- Ticker/fita animada no topo com avisos fake em loop.
- Micro-animações nos botões "Adicionar ao carrinho" (bounce, shake, confetti).
- Estrelas de avaliação sempre entre ★★★★ e ★★★★★ com números absurdamente altos (ex: 47.321 avaliações).

---

## ESTRUTURA DE PÁGINAS

### 1. `/` — Página Inicial (Homepage)

**Componentes por ordem:**

#### A) Ticker de topo (sticky, animado)
Fita horizontal com scroll infinito de esquerda para direita:
```
✦ 🛵 ENTREGA POR ESTAFETAS (QUASE) REAIS  
✦ 📍 RASTREIO EM TEMPO REAL  
✦ 💸 CHECKOUT COM PAGAMENTO AUTOMÁTICO  
✦ 💊 100% FALSO, 200% DOPAMINA  
✦ 🧾 A FATURA NUNCA CHEGA  
✦ 🛍️ PREÇO FINAL: SEMPRE 0,00€
```

#### B) Navbar
```
[💊 dopamina]    [Catálogo]  [Ofertas 🔥]  [A minha conta 👤]  [Carrinho 🛒 (3)]
```
O número no carrinho incrementa com animação quando produto é adicionado.

#### C) Hero Section
- Título grande em 2 linhas:  
  `compra tudo.`  
  `paga nada.`
- Subtítulo: *"A loja que vende a dopamina de comprar. A fatura nunca chega. 🧠"*
- 2 CTAs: `[obter a minha dopamina 🚀]` (roxo) e `[ver ofertas 🔥]` (outline)
- Imagem/mockup flutuante de um produto premium (ex: RTX 4090 ou iPhone 16 Pro) com badge "DOPAMINA GRÁTIS ✦ VEM BUSCAR"

#### D) Banner de Boas-vindas (Cupão Fake)
Fundo: gradiente roxo/índigo. Copy:
> **25% OFF na tua primeira encomenda**  
> *Usa o cupão no checkout e vê o dinheiro imaginário derreter-se. ✨*  
> `[PRIMEIRADOSE]` `[copiar]` → botão [começar a comprar 🚀]

#### E) Flash Deals (carrossel horizontal)
Título: `🔥 flash deals — até 38% OFF no que não existe`  
Cards horizontais com scroll snap + setas de navegação.

#### F) Proposta de Valor (4 ícones em grid)
```
🧾 dopamina 100% real    →  a fatura nunca chega
🛵 estafetas (quase) reais → saem de casa para te entregar
⚡ checkout auto-pay       → em 15 segundos
📍 rastreio ao vivo        → a viagem real até à tua porta
```

#### G) Categorias (Grid 2x3 ou 3x2)
```
🎮 Jogos         📱 Tech
💄 Beleza        👟 Moda
🛋️ Casa          🎁 Presentes
```
Cada card com hover que eleva + gradiente de fundo + contagem de produtos.

#### H) Catálogo Principal
Filtros por categoria (tabs horizontais): `✨ Todos | 🎮 Jogos | 📱 Tech | 💄 Beleza | 👟 Moda | 🛋️ Casa`

Grid de produtos (3 colunas desktop, 2 tablet, 1 mobile).

#### I) FAQ (Accordion)
Ver secção "Conteúdo" abaixo para perguntas completas.

#### J) Newsletter Fake
> *"ofertas que não existem, direto para a tua caixa de entrada"*
> Campo de email + botão `[quero 🚀]`

#### K) Footer
```
💊 dopamina
A loja que vende a dopamina de comprar.
Sem custo, sem fatura, sem culpa. Só a viagem.

[Loja]        [A loja]        [Ajuda]         ["Pagamento"]
Jogos         Sobre nós       Centro ajuda     PayPal
Tech          Sugestão?       Rastrear         Cartão Imaginário
Beleza        Apoiar 💊       Devoluções       Fatura que não chega 👻
Moda
Casa

© 2026 dopamina™ · NIF 69-6969696 · 100% uma piada, cada bocadinho
feito com 💊 e zero euros · nenhuma fatura foi aqui emitida
```

---

### 2. `/produto/[slug]` — Página de Produto

**Layout:** 60% imagem + galeria | 40% info

**Elementos:**
- Breadcrumb: `Início > Tech > Placas Gráficas > RTX 4090`
- Badge: `EM STOCK — entrega amanhã se encomendares até às 23:59`
- Nome do produto (H1 grande)
- Estrelas + contagem (ex: ★★★★★ 63.761 avaliações)
- Preço riscado → preço atual (em `JetBrains Mono`, tamanho grande)
- Parcelamento: `4x de 0,00€ sem juros 💳`
- Seletor de quantidade
- CTA principal: `[Adicionar ao Carrinho 🛒]` — com animação de confetti ao clicar
- CTA secundário: `[Comprar Agora ⚡]`
- Badges de confiança: `✅ Pagamento 100% fake` | `🛡️ Devolução fácil` | `📦 Entrega via baleia opcional`
- Tabs: `Descrição | Avaliações | Perguntas`
- Produtos relacionados (carrossel)

---

### 3. `/carrinho` — Carrinho

- Lista de produtos com imagem, nome, preço, quantidade, remover
- Subtotal (sempre grandioso, ex: 15.743,90€)
- Campo de cupão: input + `[Aplicar]`
- Resumo:
  ```
  Subtotal:        15.743,90€
  Desconto (25%):   -3.935,97€
  Envio:            GRÁTIS 🎉
  Total:           11.807,93€
  Que nunca vais pagar.
  ```
- Botão: `[Finalizar Encomenda 🚀]`
- Texto subtil: *"O teu cartão não será cobrado. Nunca."*

---

### 4. `/checkout` — Checkout (Multi-step)

**Step 1: Dados de entrega**
- Nome, morada, código postal, cidade, país
- Copy subtil: *"Precisamos da tua morada para a viagem épica do teu pacote."*

**Step 2: Pagamento Fake**
- Tabs: `💳 Cartão` | `🏦 MB Way` | `📄 Referência MB`
- Cartão: campos de número (aceita qualquer coisa), validade, CVV
- Número especial que sempre funciona: `4242 4242 4242 4242`
- Botão: `[Pagar 11.807,93€ ⚡]`
- Animação de loading 2-3 segundos → "A processar pagamento..." → "✅ Pago!"

**Step 3: Confirmação**
```
🎉 ENCOMENDA CONFIRMADA!
N.º de rastreio: DSH-2024-420-REAL
Valor cobrado: 0,00€ (como sempre)
Entrega prevista: amanhã (talvez)
[Rastrear Encomenda 📍]  [Continuar a Comprar 🛍️]
```

---

### 5. `/rastrear` — Rastreio ao Vivo

**O componente mais importante do site.**

- Input de número de encomenda (pré-preenchido após checkout)
- Mapa interativo (Leaflet.js ou Mapbox) com marcador animado
- Timeline de estados da encomenda:

```
✅ Encomenda recebida           — há 5 min
✅ Pagamento confirmado         — há 4 min (0,00€ debitados 👻)
✅ Em preparação no armazém     — há 3 min
✅ Saiu para entrega             — há 2 min
🔄 Em trânsito                  — A DECORRER
   📍 Atualmente: Oceano Atlântico (a bordo de uma baleia)
⏳ Entrega prevista             — Amanhã
```

**Eventos aleatórios absurdos (escolhe 1 por encomenda):**
- 🐋 "O teu pacote foi engolido por uma baleia. A baleia vai cuspir no destino certo."
- 🛸 "ALERTA: encomenda abduzida por OVNI. Os alienígenas prometeram entregar."
- 🏴‍☠️ "Interceptado por piratas no Canal do Suez. Negociações em curso."
- ⛺ "O estafeta perdeu-se no Triângulo das Bermudas. GPS a recalcular."
- 🌋 "Desvio ativo por erupção vulcânica. A lava está a ser contornada com elegância."
- 🐢 "A encomenda foi dada a uma tartaruga para a etapa final. Ela é confiável."

---

### 6. `/ofertas` — Flash Deals

Grid de todos os produtos em promoção com countdown timer (sempre a reiniciar quando chega a zero).

---

### 7. `/sobre` — Sobre Nós

Copy irreverente sobre o projeto. Referência: *"Dois tipos, sem anúncios, sem investidores — só pela graça disso (e da dopamina)."*

---

## COMPONENTES REUTILIZÁVEIS

### ProductCard
```
Props: id, name, image, originalPrice, salePrice, rating, reviewCount, discount?, badge?

Visual:
┌─────────────────────┐
│  [-15%]   [❤️]     │  ← badge desconto + wishlist
│                     │
│    [imagem produto] │
│                     │
├─────────────────────┤
│ ★★★★★ (63.761)     │
│ Nome do Produto     │
│ Nome longo trunca.. │
│                     │
│ ~~12.236€~~         │
│ **10.369€**         │
│ 4x de 2.592€ 💳    │
│                     │
│ [Adicionar ao 🛒]  │
└─────────────────────┘
```

### CartNotification (toast animado)
Aparece no canto superior direito ao adicionar produto:
> ✅ *RTX 4090 adicionado ao carrinho*  
> Valor total ficto: 10.369€

### FakePriceCounter
Animação de números a subir no hero mostrando "total 'poupado' pelos utilizadores hoje":
`Poupámos €4.238.917 hoje 💊`

---

## DADOS / CATÁLOGO

Usa um ficheiro `data/products.ts` com pelo menos 20 produtos reais divididos por categoria:

**Tech:** RTX 4090, iPhone 16 Pro Max, MacBook Pro M4, PlayStation 5 Pro, Meta Quest 3  
**Jogos:** Cyberpunk 2077, GTA VI (Collector's Edition), Nintendo Switch 2  
**Beleza:** Dyson Airwrap, La Mer Cream, SK-II Essence  
**Moda:** Balenciaga Triple S, Louis Vuitton Neverfull, Rolex Submariner  
**Casa:** iRobot Roomba j9+, Thermomix TM7, Nespresso Vertuo Next

Cada produto tem: `id, slug, name, category, images[], originalPrice, salePrice, rating, reviewCount, description, specs{}`

---

## GAMIFICAÇÃO (OPCIONAL — FASE 2)

- **XP por compra:** cada "compra" dá pontos
- **Achievements:** "Primeira Dose", "Viciado", "Baleia Sobrevivente", "Gastador Imaginário do Mês"
- **Leaderboard:** ranking dos maiores "gastadores" fictícios
- **Níveis:** Dopamineiro Jr → Sénior → Lendário → Milionário Imaginário

---

## FAQ (CONTEÚDO COMPLETO)

```
Q: O dopamina.shop é uma loja real?
A: Não — é uma loja paródia. Os produtos, o pagamento e a entrega são 100% falsos.
   A única coisa real é a dopamina de comprar.

Q: Como funciona?
A: "Compras" um produto, "pagas" com um cartão falso que se autoriza sozinho,
   e depois rastreias uma entrega absurda que percorre o mundo em tempo real
   — às vezes engolida por uma baleia ou abduzida por um OVNI.
   Nem um cêntimo sai da tua conta.

Q: É mesmo gratuito?
A: É. Nenhuma cobrança é processada e nenhuma fatura chega. Zero custo, sempre.

Q: É uma burla? É seguro?
A: Não é uma burla — é comédia. Como nada é cobrado e nenhum pagamento é real,
   não há nada a roubar. É 100% seguro precisamente porque é 100% falso.

Q: Guardam os meus dados de cartão?
A: Não. O ecrã de pagamento é só para aparato: nada é processado,
   nada é cobrado, nenhum dado de cartão é guardado.

Q: Quanto tempo demora a "entrega"?
A: Alguns dias, tal como uma encomenda real — e podes seguir cada passo
   no rastreador ao vivo, com mapa incluído.

Q: Porque é que o meu pacote foi engolido por uma baleia?
A: Faz parte da brincadeira. Há uma hipótese de ocorrer um imprevisto cómico.
   Quase sempre chega ao destino, com uma história épica para contar.
```

---

## ESPECIFICAÇÕES TÉCNICAS

```
Framework:     Next.js 14 (App Router)
Styling:       Tailwind CSS v3
Animações:     Framer Motion
Mapa:          Leaflet.js (open-source, sem custos de API)
Icons:         Lucide React
Fonts:         Space Grotesk + Inter + JetBrains Mono (Google Fonts)
State:         Zustand (carrinho, user)
Storage:       localStorage (carrinho, encomendas fake)
Deploy:        Vercel
```

### Estrutura de ficheiros
```
src/
├── app/
│   ├── page.tsx                 ← Homepage
│   ├── produto/[slug]/page.tsx  ← Produto
│   ├── carrinho/page.tsx        ← Carrinho
│   ├── checkout/page.tsx        ← Checkout multi-step
│   ├── rastrear/page.tsx        ← Tracking ao vivo
│   ├── ofertas/page.tsx         ← Flash Deals
│   └── sobre/page.tsx           ← Sobre nós
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Ticker.tsx           ← Fita animada no topo
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── CategoryFilter.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartNotification.tsx
│   ├── checkout/
│   │   ├── AddressForm.tsx
│   │   ├── FakePaymentForm.tsx
│   │   └── OrderConfirmation.tsx
│   ├── tracking/
│   │   ├── TrackingMap.tsx
│   │   └── TrackingTimeline.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── StarRating.tsx
├── data/
│   └── products.ts
├── store/
│   └── cartStore.ts             ← Zustand
└── lib/
    ├── tracking.ts              ← Lógica de eventos fake
    └── utils.ts
```

---

## COPY / TOM DE VOZ

- **Irreverente mas simpático.** Nunca agressivo.
- Usa "tu" (informal), nunca "você".
- Avisos legais escritos como piada: *"NIF 69-6969696"*
- Preços formatados com separadores portugueses: `10.369,99€`
- Sempre lembrar que é fake, mas **nunca quebrar o "teatro"** durante o fluxo de compra.
- Tagline principal: **"compra tudo. paga nada."**
- Tagline alternativa: *"a única loja honesta da internet"*

---

## PRIORIDADE DE IMPLEMENTAÇÃO

```
Fase 1 (MVP)
├── Homepage completa com catálogo
├── Página de produto
├── Carrinho funcional (localStorage)
├── Checkout com animação de pagamento
└── Página de confirmação

Fase 2
├── Rastreio ao vivo com mapa + eventos aleatórios
├── Página de ofertas com countdown
└── Conta de utilizador (opcional)

Fase 3
├── Gamificação (XP, achievements, leaderboard)
├── Newsletter fake
└── Submissão de produto por utilizadores
```

---

*Prompt gerado para: Flávio — dopamina.shop*  
*Referência analisada: dopamineshopping.com*