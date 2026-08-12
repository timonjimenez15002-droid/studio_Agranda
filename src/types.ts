export type ProductCategory = 'fertilizantes' | 'semillas' | 'maquinaria' | 'agroquimicos';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  unit: string; // e.g. "Bulto 50kg", "Galón 5L", "Unidad"
  badge?: 'Más Vendido' | 'Ecológico' | 'Alto Rendimiento' | 'Oferta Especial' | 'Garantía Oficial';
  image: string;
  shortDescription: string;
  stock: number;
  featured?: boolean;
  // Ficha técnica
  specs: {
    variety?: string; // Variedad
    germinationRate?: string; // % de Germinación
    presentation: string; // Presentación
    cropCycle?: string; // Ciclo de cultivo (días/meses)
    estimatedYield?: string; // Rendimiento estimado
    dosage?: string; // Dosis recomendada
    icaRegister?: string; // Registro ICA
    activeComponent?: string; // Ingrediente activo
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  farmName?: string;
  notes?: string;
}

export type OrderStatus = 'Pendiente' | 'Cosechando / Despacho' | 'En Camino' | 'Entregado' | 'Cancelado';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: OrderCustomer;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    unit: string;
    image: string;
  }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: 'credit_card' | 'digital_transfer' | 'cash_on_delivery';
  paymentDetails?: {
    cardLast4?: string;
    transferRef?: string;
  };
  status: OrderStatus;
}

export type PqrsType = 'Queja' | 'Reclamo' | 'Sugerencia' | 'Consulta Técnica';
export type PqrsStatus = 'Pendiente' | 'En Revisión' | 'Resuelto';

export interface PqrsMessage {
  id: string;
  date: string;
  type: PqrsType;
  name: string;
  email: string;
  phone: string;
  orderNumber?: string;
  subject: string;
  message: string;
  status: PqrsStatus;
  adminResponse?: string;
  respondedAt?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Cosecha' | 'Infraestructura' | 'Sanidad' | 'Mercado' | 'Ganadería';
  summary: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  source: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatar?: string;
  isLoggedIn: boolean;
}
