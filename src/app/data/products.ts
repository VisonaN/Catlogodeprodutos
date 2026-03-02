
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Linhas e Fios',
    slug: 'linhas-e-fios',
    image: 'https://images.unsplash.com/photo-1600024512646-5ef7b23d3bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNld2luZyUyMHRocmVhZHMlMjBzcG9vbHxlbnwxfHx8fDE3NzI0NTYxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Linhas de costura, bordado e fios diversos.'
  },
  {
    id: '2',
    name: 'Botões',
    slug: 'botoes',
    image: 'https://images.unsplash.com/photo-1613555612473-90cf723dfb60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NvcnRlZCUyMHNld2luZyUyMGJ1dHRvbnN8ZW58MXx8fHwxNzcyNDU2MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Botões de todos os tamanhos, materiais e cores.'
  },
  {
    id: '3',
    name: 'Zíperes',
    slug: 'ziperes',
    image: 'https://images.unsplash.com/photo-1705248681853-ea65be2a15b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMHppcHBlcnN8ZW58MXx8fHwxNzcyNDU2MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Zíperes invisíveis, de metal e tratorados.'
  },
  {
    id: '4',
    name: 'Fitas e Rendas',
    slug: 'fitas-e-rendas',
    image: 'https://images.unsplash.com/photo-1707150850509-5a6b62960e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRpbiUyMHJpYmJvbnMlMjBhbmQlMjBsYWNlfGVufDF8fHx8MTc3MjQ1NjEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Acabamentos delicados para suas peças.'
  },
  {
    id: '5',
    name: 'Ferramentas',
    slug: 'ferramentas',
    image: 'https://images.unsplash.com/photo-1557185602-2bee13540a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXdpbmclMjBzY2lzc29ycyUyMGFuZCUyMHRhcGUlMjBtZWFzdXJlfGVufDF8fHx8MTc3MjQ1NjEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Tesouras, agulhas, alfinetes e fita métrica.'
  },
  {
    id: '6',
    name: 'Elásticos',
    slug: 'elasticos',
    image: 'https://images.unsplash.com/photo-1751552147774-c374ae8e9910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGVsYXN0aWMlMjBiYW5kJTIwc2V3aW5nfGVufDF8fHx8MTc3MjQ1NjEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Elásticos de diversas larguras e tensões.'
  }
];

export const products: Product[] = [
  {
    id: '101',
    name: 'Kit de Linhas Coloridas (24 cores)',
    price: 45.90,
    category: 'linhas-e-fios',
    image: 'https://images.unsplash.com/photo-1600024512646-5ef7b23d3bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNld2luZyUyMHRocmVhZHMlMjBzcG9vbHxlbnwxfHx8fDE3NzI0NTYxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Conjunto completo com 24 cores vibrantes de linha poliéster.'
  },
  {
    id: '102',
    name: 'Linha Branca 500m',
    price: 8.50,
    category: 'linhas-e-fios',
    image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=800',
    description: 'Carretel de linha branca resistente para costura geral.'
  },
  {
    id: '201',
    name: 'Mix de Botões Vintage',
    price: 12.90,
    category: 'botoes',
    image: 'https://images.unsplash.com/photo-1613555612473-90cf723dfb60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NvcnRlZCUyMHNld2luZyUyMGJ1dHRvbnN8ZW58MXx8fHwxNzcyNDU2MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Pacote com 50g de botões sortidos estilo vintage.'
  },
  {
    id: '202',
    name: 'Botão de Madeira Natural',
    price: 1.50,
    category: 'botoes',
    image: 'https://images.unsplash.com/photo-1596464716127-f9a86255b6c9?auto=format&fit=crop&q=80&w=800',
    description: 'Botão rústico de madeira, 2cm de diâmetro.'
  },
  {
    id: '301',
    name: 'Zíper Invisível 60cm',
    price: 4.20,
    category: 'ziperes',
    image: 'https://images.unsplash.com/photo-1705248681853-ea65be2a15b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMHppcHBlcnN8ZW58MXx8fHwxNzcyNDU2MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Zíper discreto ideal para vestidos e saias.'
  },
  {
    id: '401',
    name: 'Fita de Cetim Vermelha (10m)',
    price: 15.00,
    category: 'fitas-e-rendas',
    image: 'https://images.unsplash.com/photo-1707150850509-5a6b62960e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRpbiUyMHJpYmJvbnMlMjBhbmQlMjBsYWNlfGVufDF8fHx8MTc3MjQ1NjEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Rolo de fita de cetim de alta qualidade.'
  },
  {
    id: '501',
    name: 'Tesoura de Alfaiate Profissional',
    price: 89.90,
    category: 'ferramentas',
    image: 'https://images.unsplash.com/photo-1557185602-2bee13540a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXdpbmclMjBzY2lzc29ycyUyMGFuZCUyMHRhcGUlMjBtZWFzdXJlfGVufDF8fHx8MTc3MjQ1NjEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Tesoura de aço inoxidável com corte preciso.'
  },
  {
    id: '502',
    name: 'Kit de Agulhas de Mão',
    price: 12.00,
    category: 'ferramentas',
    image: 'https://images.unsplash.com/photo-1456518563096-0ff5ee08204e?auto=format&fit=crop&q=80&w=800',
    description: 'Sortimento de agulhas para diversos tipos de tecido.'
  },
  {
    id: '601',
    name: 'Elástico Chato Branco 20mm',
    price: 2.50,
    category: 'elasticos',
    image: 'https://images.unsplash.com/photo-1751552147774-c374ae8e9910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGVsYXN0aWMlMjBiYW5kJTIwc2V3aW5nfGVufDF8fHx8MTc3MjQ1NjEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Venda por metro. Alta elasticidade e durabilidade.'
  }
];
