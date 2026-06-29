export type Category =
  | "tech"
  | "games"
  | "beauty"
  | "fashion"
  | "home"
  | "gifts";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  images: string[];
  originalPrice: number;
  salePrice: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  specs: Record<string, string>;
  featured?: boolean;
  flashDeal?: boolean;
};

const img = (seed: string, w = 800, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const products: Product[] = [
  {
    id: "p1",
    slug: "nvidia-rtx-4090",
    name: "Nvidia GeForce RTX 4090 24GB",
    category: "tech",
    brand: "Nvidia",
    images: [img("rtx4090-1"), img("rtx4090-2"), img("rtx4090-3")],
    originalPrice: 12236.99,
    salePrice: 10369.0,
    rating: 4.9,
    reviewCount: 63761,
    badge: "TOP DOPAMINA",
    description:
      "A placa gráfica que vais ter para sempre, num universo paralelo onde encomendaste mesmo isto. 24GB de VRAM para correr Excel a 8K.",
    specs: {
      VRAM: "24 GB GDDR6X",
      "Clock Boost": "2.52 GHz",
      Conectores: "3x DisplayPort 1.4a, 1x HDMI 2.1",
      Consumo: "450W",
      "Realidade do envio": "Engolida por uma baleia",
    },
    featured: true,
    flashDeal: true,
  },
  {
    id: "p2",
    slug: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max 1TB",
    category: "tech",
    brand: "Apple",
    images: [img("iphone16-1"), img("iphone16-2"), img("iphone16-3")],
    originalPrice: 2049.0,
    salePrice: 1739.0,
    rating: 4.8,
    reviewCount: 47321,
    badge: "RECÉM-CHEGADO",
    description:
      "O smartphone mais avançado que nunca vais segurar. Câmara espacial, chip A18, e o privilégio de não pagar nada por ele.",
    specs: {
      Ecrã: "6.9'' Super Retina XDR",
      Chip: "Apple A18 Pro",
      Armazenamento: "1TB",
      Câmara: "48MP triplo + LiDAR",
      Bateria: "33 dias (em sonhos)",
    },
    featured: true,
    flashDeal: true,
  },
  {
    id: "p3",
    slug: "macbook-pro-m4-max",
    name: "MacBook Pro 16'' M4 Max 64GB",
    category: "tech",
    brand: "Apple",
    images: [img("mbp16-1"), img("mbp16-2")],
    originalPrice: 4499.0,
    salePrice: 3899.0,
    rating: 4.9,
    reviewCount: 18204,
    description:
      "Para profissionais que precisam de processar 5 separadores do Chrome ao mesmo tempo. Mas com classe.",
    specs: {
      Chip: "Apple M4 Max",
      RAM: "64GB unificada",
      SSD: "2TB",
      Ecrã: "16'' Liquid Retina XDR",
    },
    featured: true,
  },
  {
    id: "p4",
    slug: "ps5-pro",
    name: "PlayStation 5 Pro + 2 Comandos",
    category: "games",
    brand: "Sony",
    images: [img("ps5pro-1"), img("ps5pro-2")],
    originalPrice: 899.99,
    salePrice: 749.0,
    rating: 4.7,
    reviewCount: 92847,
    badge: "ESGOTADO (MENTIRA)",
    description:
      "A consola da Sony que vais ter, juntamente com o teu doutoramento em ficção. 8K, 120fps, infinita imaginação.",
    specs: {
      GPU: "RDNA 3 customizada",
      CPU: "AMD Zen 4 8-core",
      Armazenamento: "2TB SSD",
      "Jogos incluídos": "Zero, como sempre",
    },
    flashDeal: true,
  },
  {
    id: "p5",
    slug: "meta-quest-3",
    name: "Meta Quest 3 512GB",
    category: "games",
    brand: "Meta",
    images: [img("quest3-1"), img("quest3-2")],
    originalPrice: 749.0,
    salePrice: 599.0,
    rating: 4.6,
    reviewCount: 23491,
    description:
      "Realidade virtual para escapares da realidade desta loja, que também é virtual. Inceção.",
    specs: {
      Resolução: "2064x2208 por olho",
      Processador: "Snapdragon XR2 Gen 2",
      Armazenamento: "512GB",
    },
  },
  {
    id: "p6",
    slug: "gta-vi-collector",
    name: "GTA VI Collector's Edition",
    category: "games",
    brand: "Rockstar",
    images: [img("gta6-1"), img("gta6-2")],
    originalPrice: 249.99,
    salePrice: 199.99,
    rating: 5.0,
    reviewCount: 168432,
    badge: "PRÉ-VENDA",
    description:
      "A edição de colecionador que nunca chegará, exatamente como o jogo. Inclui estatueta, mapa, e fé.",
    specs: {
      Plataforma: "PS5, Xbox Series X, PC",
      Conteúdo: "Jogo + estatueta + mapa de tecido",
      "Data real de envio": "2031, talvez",
    },
    flashDeal: true,
  },
  {
    id: "p7",
    slug: "nintendo-switch-2",
    name: "Nintendo Switch 2 OLED",
    category: "games",
    brand: "Nintendo",
    images: [img("switch2-1")],
    originalPrice: 449.0,
    salePrice: 379.0,
    rating: 4.8,
    reviewCount: 54219,
    description:
      "Joga em qualquer lado, exceto na realidade onde isto chegou a tua casa.",
    specs: {
      Ecrã: "8'' OLED HDR",
      Armazenamento: "256GB",
    },
  },
  {
    id: "p8",
    slug: "cyberpunk-2077",
    name: "Cyberpunk 2077: Ultimate Edition",
    category: "games",
    brand: "CD Projekt Red",
    images: [img("cp2077-1")],
    originalPrice: 79.99,
    salePrice: 49.99,
    rating: 4.5,
    reviewCount: 211384,
    description:
      "Inclui DLCs, atualizações e a versão funcional que demorou 3 anos a sair.",
    specs: {
      Edição: "Ultimate",
      DLCs: "Todos",
    },
  },
  {
    id: "p9",
    slug: "dyson-airwrap",
    name: "Dyson Airwrap Complete Long",
    category: "beauty",
    brand: "Dyson",
    images: [img("dyson-1"), img("dyson-2")],
    originalPrice: 599.0,
    salePrice: 449.0,
    rating: 4.7,
    reviewCount: 38291,
    badge: "BESTSELLER FALSO",
    description:
      "O secador de cabelo que custa o salário de uma semana e que tu, neste universo, podes ter por 0,00€.",
    specs: {
      Motor: "Digital V9",
      "Acessórios incluídos": "8",
      Cor: "Vinca / Rosé",
    },
    featured: true,
    flashDeal: true,
  },
  {
    id: "p10",
    slug: "la-mer-cream",
    name: "La Mer Crème de la Mer 100ml",
    category: "beauty",
    brand: "La Mer",
    images: [img("lamer-1")],
    originalPrice: 689.0,
    salePrice: 599.0,
    rating: 4.6,
    reviewCount: 12048,
    description:
      "Creme que custa mais por grama do que ouro. Para te sentires rico sem o seres.",
    specs: {
      Volume: "100ml",
      "Ingrediente mágico": "Algas (e marketing)",
    },
  },
  {
    id: "p11",
    slug: "skii-essence",
    name: "SK-II Facial Treatment Essence 230ml",
    category: "beauty",
    brand: "SK-II",
    images: [img("skii-1")],
    originalPrice: 295.0,
    salePrice: 229.0,
    rating: 4.8,
    reviewCount: 28473,
    description:
      "A 'pitera' que promete pele de bebé. Resultado real: dopamina de comprar.",
    specs: {
      Volume: "230ml",
      Ingrediente: "Galactomyces ferment filtrate",
    },
  },
  {
    id: "p12",
    slug: "balenciaga-triple-s",
    name: "Balenciaga Triple S Sneakers",
    category: "fashion",
    brand: "Balenciaga",
    images: [img("balenciaga-1"), img("balenciaga-2")],
    originalPrice: 1090.0,
    salePrice: 890.0,
    rating: 4.3,
    reviewCount: 9821,
    description:
      "Ténis grossos e caros. Perfeitos para não andares a lado nenhum, com estilo.",
    specs: {
      Material: "Couro + malha técnica",
      "País de fabrico": "Itália",
      Tamanho: "37-46",
    },
    flashDeal: true,
  },
  {
    id: "p13",
    slug: "louis-vuitton-neverfull",
    name: "Louis Vuitton Neverfull MM Monogram",
    category: "fashion",
    brand: "Louis Vuitton",
    images: [img("lv-1")],
    originalPrice: 2200.0,
    salePrice: 1899.0,
    rating: 4.9,
    reviewCount: 18342,
    description:
      "A mala que nunca enche, tal como a tua conta bancária após comprar aqui.",
    specs: {
      Material: "Canvas Monogram",
      Dimensão: "32x29x17 cm",
    },
  },
  {
    id: "p14",
    slug: "rolex-submariner",
    name: "Rolex Submariner Date 41mm",
    category: "fashion",
    brand: "Rolex",
    images: [img("rolex-1"), img("rolex-2")],
    originalPrice: 12500.0,
    salePrice: 10999.0,
    rating: 5.0,
    reviewCount: 4729,
    badge: "EDIÇÃO LIMITADA",
    description:
      "O relógio que diz 'eu chegei'. Neste caso, chegou ao teu carrinho. Nada mais.",
    specs: {
      Caixa: "Aço Oystersteel 41mm",
      Movimento: "Calibre 3235",
      Resistência: "300m",
    },
    featured: true,
  },
  {
    id: "p15",
    slug: "iroomba-j9",
    name: "iRobot Roomba j9+ Combo",
    category: "home",
    brand: "iRobot",
    images: [img("roomba-1")],
    originalPrice: 1399.0,
    salePrice: 999.0,
    rating: 4.6,
    reviewCount: 14821,
    description:
      "Aspirador inteligente que limpa a casa sozinho. A tua, não. A do universo paralelo onde recebeste isto.",
    specs: {
      Autonomia: "180 min",
      "Esvazia-se": "Sim",
      "Limpa o chão": "Sim",
    },
    flashDeal: true,
  },
  {
    id: "p16",
    slug: "thermomix-tm7",
    name: "Thermomix TM7 + Cook-Key",
    category: "home",
    brand: "Vorwerk",
    images: [img("thermomix-1")],
    originalPrice: 1599.0,
    salePrice: 1399.0,
    rating: 4.7,
    reviewCount: 9384,
    description:
      "Faz tudo na cozinha, exceto aparecer realmente na tua. Mas no checkout, é teu.",
    specs: {
      Potência: "1500W",
      "Receitas guiadas": "80.000+",
    },
  },
  {
    id: "p17",
    slug: "nespresso-vertuo-next",
    name: "Nespresso Vertuo Next + 100 Cápsulas",
    category: "home",
    brand: "Nespresso",
    images: [img("nespresso-1")],
    originalPrice: 299.0,
    salePrice: 199.0,
    rating: 4.5,
    reviewCount: 28471,
    description:
      "Café premium que nunca beberás, mas que terás 'comprado' com orgulho.",
    specs: {
      Tipo: "Vertuo Next",
      Cápsulas: "100 incluídas",
    },
  },
  {
    id: "p18",
    slug: "lego-millennium-falcon",
    name: "LEGO Star Wars Millennium Falcon UCS",
    category: "gifts",
    brand: "LEGO",
    images: [img("lego-1"), img("lego-2")],
    originalPrice: 849.99,
    salePrice: 699.99,
    rating: 4.9,
    reviewCount: 32184,
    description:
      "7541 peças de plástico que nunca vão arranhar os teus pés. Que paz.",
    specs: {
      Peças: "7541",
      Idade: "16+",
      Minifiguras: "10",
    },
    flashDeal: true,
  },
  {
    id: "p19",
    slug: "bose-qc-ultra",
    name: "Bose QuietComfort Ultra Headphones",
    category: "tech",
    brand: "Bose",
    images: [img("bose-1")],
    originalPrice: 499.0,
    salePrice: 379.0,
    rating: 4.7,
    reviewCount: 19384,
    description:
      "Cancelamento de ruído tão bom que cancela até a culpa de comprar.",
    specs: {
      Autonomia: "24h",
      "Cancelamento ativo": "Sim",
    },
  },
  {
    id: "p20",
    slug: "kindle-scribe",
    name: "Kindle Scribe 64GB + Premium Pen",
    category: "tech",
    brand: "Amazon",
    images: [img("kindle-1")],
    originalPrice: 449.0,
    salePrice: 329.0,
    rating: 4.5,
    reviewCount: 8473,
    description:
      "E-reader com caneta. Para anotares todas as coisas que não vais comprar.",
    specs: {
      Ecrã: "10.2'' Paperwhite",
      Armazenamento: "64GB",
    },
  },
  {
    id: "p21",
    slug: "diptyque-baies",
    name: "Diptyque Baies Vela 600g",
    category: "gifts",
    brand: "Diptyque",
    images: [img("diptyque-1")],
    originalPrice: 195.0,
    salePrice: 159.0,
    rating: 4.7,
    reviewCount: 5821,
    description:
      "Vela que cheira a frutos vermelhos parisienses. Em casa, continuarás a cheirar a nada.",
    specs: {
      Peso: "600g",
      Duração: "75 horas",
    },
  },
  {
    id: "p22",
    slug: "supreme-box-logo",
    name: "Supreme Box Logo Hoodie (FW24)",
    category: "fashion",
    brand: "Supreme",
    images: [img("supreme-1")],
    originalPrice: 380.0,
    salePrice: 299.0,
    rating: 4.4,
    reviewCount: 12041,
    badge: "DROP DA SEMANA",
    description: "O hoodie que define gerações de revenda. Aqui é teu por 0€.",
    specs: {
      Material: "100% algodão",
      Origem: "Made in Canada",
    },
  },
];

export const productsBySlug = Object.fromEntries(
  products.map((p) => [p.slug, p]),
);

export function getProductBySlug(slug: string) {
  return productsBySlug[slug];
}

export function getProductsByCategory(cat?: Category | "all") {
  if (!cat || cat === "all") return products;
  return products.filter((p) => p.category === cat);
}

export function getFlashDeals() {
  return products.filter((p) => p.flashDeal);
}

export function getFeatured() {
  return products.filter((p) => p.featured);
}

export function getRelated(slug: string, limit = 4) {
  const target = productsBySlug[slug];
  if (!target) return [];
  return products
    .filter((p) => p.category === target.category && p.slug !== slug)
    .slice(0, limit);
}

export const categoriesMeta: {
  key: Category;
  emoji: string;
  gradient: string;
}[] = [
  { key: "games", emoji: "🎮", gradient: "from-violet-500/30 to-fuchsia-500/30" },
  { key: "tech", emoji: "📱", gradient: "from-indigo-500/30 to-cyan-500/30" },
  { key: "beauty", emoji: "💄", gradient: "from-pink-500/30 to-rose-500/30" },
  { key: "fashion", emoji: "👟", gradient: "from-amber-500/30 to-orange-500/30" },
  { key: "home", emoji: "🛋️", gradient: "from-emerald-500/30 to-teal-500/30" },
  { key: "gifts", emoji: "🎁", gradient: "from-red-500/30 to-pink-500/30" },
];
