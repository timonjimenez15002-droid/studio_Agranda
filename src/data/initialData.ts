import { Product, NewsArticle, Order, PqrsMessage } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Fertilizante NPK 17-6-18 Granulado Premium',
    category: 'fertilizantes',
    subcategory: 'N.P.K. Suelo',
    price: 185000,
    originalPrice: 210000,
    unit: 'Bulto 50 Kg',
    badge: 'Más Vendido',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Fórmula balanceada ideal para etapas de desarrollo y llenado en café, maíz, frutales y hortalizas.',
    stock: 140,
    featured: true,
    specs: {
      presentation: 'Bulto polipropileno laminado 50 Kg',
      dosage: '150 - 300 Kg/Hectárea según análisis de suelo',
      cropCycle: 'Mantenimiento continuo y floración',
      estimatedYield: 'Incremento del 22% en peso de grano',
      icaRegister: 'ICA No. 004821-AG',
      activeComponent: 'Nitrógeno Total 17%, Fósforo (P2O5) 6%, Potasio (K2O) 18%, Magnesio 2%'
    }
  },
  {
    id: 'prod-002',
    name: 'Semilla Certificada Maíz Híbrido Dorado AG-990',
    category: 'semillas',
    subcategory: 'Cereales',
    price: 340000,
    originalPrice: 380000,
    unit: 'Bolsa 60,000 Semillas',
    badge: 'Alto Rendimiento',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Semilla híbrida con resistencia a sequía y volcamiento, excelente estabilidad agronómica.',
    stock: 85,
    featured: true,
    specs: {
      variety: 'Híbrido AG-990 Calidad Exportación',
      germinationRate: '98.5% Garantizado',
      presentation: 'Bolsa hermética aluminizada con tratamiento fúngico',
      cropCycle: '125 - 135 Días a cosecha',
      estimatedYield: '9.8 - 11.5 Toneladas/Hectárea',
      dosage: '60,000 - 65,000 plantas/ha',
      icaRegister: 'ICA No. 010293-SEM'
    }
  },
  {
    id: 'prod-003',
    name: 'Fumigadora Motor 2 Tiempos Asperjadora Agrícola 25L',
    category: 'maquinaria',
    subcategory: 'Equipos de Aspersión',
    price: 1250000,
    originalPrice: 1420000,
    unit: 'Unidad',
    badge: 'Garantía Oficial',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Motor de 26cc de alta presión para aplicación uniforme en cultivos extensivos y laderas.',
    stock: 22,
    featured: true,
    specs: {
      presentation: 'Caja incluye mangueras, varilla de 3 boquillas y kit de repuestos',
      dosage: 'Presión ajustable 15 - 25 Bar',
      cropCycle: 'N/A - Herramienta de fumigación',
      estimatedYield: 'Cobertura hasta 3 Hectáreas/día por operario',
      icaRegister: 'Certificación ISO 9001 - Garantía 1 Año'
    }
  },
  {
    id: 'prod-004',
    name: 'Bio-Fungicida Orgánico Trichoderma Harzianum 1L',
    category: 'agroquimicos',
    subcategory: 'Control Biológico',
    price: 920000 / 10, // 92.000
    originalPrice: 105000,
    unit: 'Frasco 1 Litro',
    badge: 'Ecológico',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Inóculo biológico protector de raíz contra Fusarium, Phytophthora y Rhizoctonia.',
    stock: 60,
    featured: true,
    specs: {
      presentation: 'Frasco PEAD 1000 cc líquido concentrado',
      germinationRate: 'Concentración 1x10^9 esporas/ml',
      dosage: '2 - 3 cc por Litro de agua en drench o foliar',
      cropCycle: 'Aplicación preventiva desde semillero',
      estimatedYield: 'Protección radicular 100% libre de residuos químicos',
      icaRegister: 'ICA No. 008321-BIO',
      activeComponent: 'Trichoderma harzianum cepa AGR-04'
    }
  },
  {
    id: 'prod-005',
    name: 'Fertilizante Foliar Bioestimulante de Algas Marinas 5L',
    category: 'fertilizantes',
    subcategory: 'Foliares',
    price: 165000,
    originalPrice: 180000,
    unit: 'Galón 5 Litros',
    badge: 'Ecológico',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Extracto concentrado de Ascophyllum Nodosum enriquecido con aminoácidos libres y boro.',
    stock: 45,
    specs: {
      presentation: 'Galón 5000 cc',
      dosage: '1.5 - 2.0 Litros por Hectárea',
      cropCycle: 'Pre-floración y cuajado de frutos',
      estimatedYield: 'Aumento en tamaño y homogenización del fruto',
      icaRegister: 'ICA No. 005112-FER',
      activeComponent: 'Extracto de Algas 25%, Aminoácidos 10%, Boro 2%'
    }
  },
  {
    id: 'prod-006',
    name: 'Semilla Certificada Café Castillo Paraguaicito',
    category: 'semillas',
    subcategory: 'Cafetería',
    price: 195000,
    unit: 'Kilo Semilla Tratada',
    badge: 'Más Vendido',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Resistente a la Roya del cafeto (Hemileia vastatrix), excelente perfil de taza y rendimiento.',
    stock: 110,
    specs: {
      variety: 'Castillo Zona Central Paraguaicito',
      germinationRate: '95% Mínimo comprobado',
      presentation: 'Empaque de 1 Kg tratada con fungicida sistémico',
      cropCycle: 'Germinador 60 días / Almácigo 5 meses',
      estimatedYield: '3.5 Toneladas Café Cerezos/ha',
      icaRegister: 'ICA No. 000412-CAF'
    }
  },
  {
    id: 'prod-007',
    name: 'Tractor Agrícola 75 HP 4x4 Diésel con Enchanche Tripuntal',
    category: 'maquinaria',
    subcategory: 'Tractores',
    price: 145000000,
    originalPrice: 158000000,
    unit: 'Unidad Maquinaria',
    badge: 'Oferta Especial',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12735?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Motor Turbo Diésel de 4 cilindros, transmisión sincronizada 12x12 y cabina climatizada.',
    stock: 3,
    specs: {
      presentation: 'Entrega técnica directamente en predio con capacitación',
      cropCycle: 'Uso rudo agrícola continuo',
      estimatedYield: 'Capacidad de tiro de 3,200 Kg',
      icaRegister: 'Homologación Ministerio de Transporte & Registro RUNT'
    }
  },
  {
    id: 'prod-008',
    name: 'Insecticida Sistémico Clorpirifos + Imidacloprid 1L',
    category: 'agroquimicos',
    subcategory: 'Insecticidas',
    price: 118000,
    unit: 'Frasco 1 Litro',
    badge: 'Más Vendido',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Control de amplio espectro contra gusano cogollero, broca, mosca blanca y trips.',
    stock: 90,
    specs: {
      presentation: 'Envase coextruido 1000 cc con sello de seguridad',
      dosage: '350 - 500 cc por caneca de 200 Litros',
      cropCycle: 'Aparición de plagas en umbral económico',
      estimatedYield: 'Efecto knock-down inmediato y residualidad 15 días',
      icaRegister: 'ICA No. 001920-INS',
      activeComponent: 'Clorpirifos 240g/L + Imidacloprid 100g/L'
    }
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-001',
    title: 'Nuevas técnicas de fertilización de precisión aumentan el rendimiento en cultivos de maíz un 25%',
    category: 'Cosecha',
    summary: 'Estudios agronómicos recientes demuestran que el fraccionamiento de Nitrógeno y Potasio basado en mapas de suelo eleva significativamente el llenado de mazorca.',
    content: 'La agricultura de precisión continúa revolucionando los campos latinoamericanos. Según análisis realizados en más de 500 hectáreas piloto, la combinación de sensores de clorofila y fertilizantes granulados con inhibidores de ureasa redujo el desperdicio por lixiviación y aumentó la rentabilidad neta por hectárea en un 25%. Los técnicos recomiendan realizar análisis foliares antes del segundo abonado.',
    date: '10 de Agosto, 2026',
    author: 'Ing. Carlos Mendoza (Agrónomo Senior)',
    readTime: '4 min de lectura',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    source: 'Boletín Agrícola Nacional'
  },
  {
    id: 'news-002',
    title: 'Ministerio de Agricultura aprueba subsidios del 20% en adquisición de maquinaria e infraestructura de riego',
    category: 'Infraestructura',
    summary: 'Incentivos gubernamentales buscan modernizar los sistemas de riego por goteo y la renovación de tractores de baja emisión para pequeños y medianos productores.',
    content: 'A partir del presente mes, los productores registrados en el RUA podrán postularse a la devolución del IVA y subsidio directo en la compra de motobombas, tubería de goteo, sistemas de aspersión y tractores hasta de 90 HP. Esta medida busca preparar los distritos de riego frente a los fenómenos climáticos estacionales.',
    date: '08 de Agosto, 2026',
    author: 'Redacción AGRANDA Noticias',
    readTime: '3 min de lectura',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12735?auto=format&fit=crop&w=800&q=80',
    source: 'Gaceta Agropecuaria'
  },
  {
    id: 'news-003',
    title: 'Alerta fitosanitaria: Recomendaciones preventivas para el control del Gusano Cogollero en época seca',
    category: 'Sanidad',
    summary: 'Expertos sugieren rotación de moléculas de agroquímicos y aplicaciones nocturnas de bio-controladores para evitar resistencia.',
    content: 'El incremento de temperaturas favorece el ciclo biológico de la Spodoptera frugiperda. Se recomienda a los agricultores monitorear postura de huevos y primeros instares larvarios. Las mezclas con bio-pesticidas a base de Bacillus thuringiensis y liberación de Trichogramma han mostrado una eficacia superior al 90%.',
    date: '05 de Agosto, 2026',
    author: 'Dra. Elena Ramos (Sanidad Vegetal)',
    readTime: '5 min de lectura',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80',
    source: 'Instituto Colombiano Agropecuario (ICA)'
  },
  {
    id: 'news-004',
    title: 'Tendencias del mercado del Café y Fertilizantes: Precios internacionales al alza favorecen a los productores',
    category: 'Mercado',
    summary: 'El precio del grano de café en bolsa de Nueva York alcanza máximos históricos mientras el costo de insumos de urea se estabiliza.',
    content: 'El panorama comercial para los caficultores se torna optimista en el tercer trimestre. La demanda global de cafés especiales con certificación orgánica ha impulsado el precio por carga. Paralelamente, las importaciones masivas de fertilizantes NPK han nivelado los costos de producción por arroba.',
    date: '01 de Agosto, 2026',
    author: 'Economista Agro: Mauricio Restrepo',
    readTime: '4 min de lectura',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    source: 'Federación Agrocomercial'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'AG-2026-8812',
    date: '2026-08-11 14:32',
    customer: {
      fullName: 'Roberto Gómez Silva',
      email: 'roberto.gomez@finca.com',
      phone: '+57 312 456 7890',
      address: 'Vereda La Esperanza, Finca El Edén',
      city: 'Chinchiná',
      department: 'Caldas',
      farmName: 'Finca El Edén',
      notes: 'Dejar el pedido con el administrador del galpón principal.'
    },
    items: [
      {
        productId: 'prod-001',
        productName: 'Fertilizante NPK 17-6-18 Granulado Premium',
        quantity: 10,
        unitPrice: 185000,
        unit: 'Bulto 50 Kg',
        image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'prod-004',
        productName: 'Bio-Fungicida Orgánico Trichoderma Harzianum 1L',
        quantity: 3,
        unitPrice: 92000,
        unit: 'Frasco 1 Litro',
        image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 2126000,
    shippingCost: 45000,
    total: 2171000,
    paymentMethod: 'digital_transfer',
    paymentDetails: {
      transferRef: 'NEQUI-998124'
    },
    status: 'Cosechando / Despacho'
  },
  {
    id: 'ord-1002',
    orderNumber: 'AG-2026-8790',
    date: '2026-08-10 09:15',
    customer: {
      fullName: 'María Fernanda Aristizábal',
      email: 'mf.aristizabal@agro.co',
      phone: '+57 320 891 2345',
      address: 'Km 5 Vía Panamericana, Agrocampo',
      city: 'Espinal',
      department: 'Tolima',
      farmName: 'Hacienda La Primavera',
      notes: 'Llamar 1 hora antes de la entrega para coordinar tractor de transbordo.'
    },
    items: [
      {
        productId: 'prod-002',
        productName: 'Semilla Certificada Maíz Híbrido Dorado AG-990',
        quantity: 4,
        unitPrice: 340000,
        unit: 'Bolsa 60,000 Semillas',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 1360000,
    shippingCost: 30000,
    total: 1390000,
    paymentMethod: 'credit_card',
    paymentDetails: {
      cardLast4: '4242'
    },
    status: 'En Camino'
  },
  {
    id: 'ord-1003',
    orderNumber: 'AG-2026-8650',
    date: '2026-08-08 16:40',
    customer: {
      fullName: 'Hernán Darío Gutiérrez',
      email: 'hernan.gutierrez@gmail.com',
      phone: '+57 300 555 1234',
      address: 'Sector El Triunfo Lote 4',
      city: 'RNS Armenia',
      department: 'Quindío',
      farmName: 'Finca Bellavista'
    },
    items: [
      {
        productId: 'prod-003',
        productName: 'Fumigadora Motor 2 Tiempos Asperjadora Agrícola 25L',
        quantity: 1,
        unitPrice: 1250000,
        unit: 'Unidad',
        image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 1250000,
    shippingCost: 0,
    total: 1250000,
    paymentMethod: 'cash_on_delivery',
    status: 'Entregado'
  }
];

export const INITIAL_PQRS: PqrsMessage[] = [
  {
    id: 'pqrs-201',
    date: '2026-08-11 11:20',
    type: 'Consulta Técnica',
    name: 'Alonso Ramírez',
    email: 'alonso.ramirez@agromail.com',
    phone: '+57 311 789 4561',
    orderNumber: 'AG-2026-8812',
    subject: 'Compatibilidad de mezcla de NPK con bioestimulante foliar',
    message: 'Buenas tardes. Quisiera saber si el fertilizante NPK granulado 17-6-18 se puede disolver en agua junto con el Bioestimulante de Algas Marinas para una aplicación en fertirriego sin taponar mangueras.',
    status: 'En Revisión'
  },
  {
    id: 'pqrs-202',
    date: '2026-08-09 15:45',
    type: 'Sugerencia',
    name: 'Sonia Restrepo',
    email: 'sonia.agro@outlook.com',
    phone: '+57 318 654 3210',
    subject: 'Inclusión de insumos para aguacate Hass',
    message: 'Excelente servicio en la entrega de las fumigadoras. Sugiero que incluyan en el catálogo fertilizantes solubles ricos en Calcio y Boro específicos para cuajado en aguacate Hass.',
    status: 'Resuelto',
    adminResponse: 'Estimada Sonia, muchas gracias por su sugerencia. Estamos incorporando la línea Caltrac + Boro de 10L para la próxima semana.',
    respondedAt: '2026-08-10 09:30'
  }
];
