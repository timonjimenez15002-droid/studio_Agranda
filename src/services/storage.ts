import { Product, Order, PqrsMessage, CartItem, AdminUser } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_PQRS } from '../data/initialData';

const KEYS = {
  SALES: 'ag_v', // Histórico de pedidos y ventas
  PQRS: 'ag_q',  // Almacenamiento de reportes/PQRS
  PRODUCTS: 'ag_products',
  CART: 'ag_cart',
  ADMIN_AUTH: 'ag_admin_session'
};

// --- PRODUCTS MANAGEMENT ---
export const getStoredProducts = (): Product[] => {
  try {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading products from localStorage:', err);
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving products:', err);
  }
};

export const addProduct = (newProduct: Omit<Product, 'id'>): Product => {
  const products = getStoredProducts();
  const product: Product = {
    ...newProduct,
    id: `prod-${Date.now().toString().slice(-6)}`
  };
  const updated = [product, ...products];
  saveStoredProducts(updated);
  return product;
};

export const updateProduct = (updatedProduct: Product): void => {
  const products = getStoredProducts();
  const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
  saveStoredProducts(updated);
};

export const deleteProduct = (productId: string): void => {
  const products = getStoredProducts();
  const updated = products.filter(p => p.id !== productId);
  saveStoredProducts(updated);
};

// --- SALES & ORDERS MANAGEMENT (`ag_v`) ---
export const getStoredOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(KEYS.SALES);
    if (!data) {
      localStorage.setItem(KEYS.SALES, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading sales from localStorage:', err);
    return INITIAL_ORDERS;
  }
};

export const saveOrder = (order: Order): Order => {
  const orders = getStoredOrders();
  const updated = [order, ...orders];
  try {
    localStorage.setItem(KEYS.SALES, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving order to ag_v:', err);
  }
  return order;
};

export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  const orders = getStoredOrders();
  const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
  try {
    localStorage.setItem(KEYS.SALES, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating order status in ag_v:', err);
  }
};

// --- PQRS & REPORTS MANAGEMENT (`ag_q`) ---
export const getStoredPqrs = (): PqrsMessage[] => {
  try {
    const data = localStorage.getItem(KEYS.PQRS);
    if (!data) {
      localStorage.setItem(KEYS.PQRS, JSON.stringify(INITIAL_PQRS));
      return INITIAL_PQRS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading PQRS from localStorage:', err);
    return INITIAL_PQRS;
  }
};

export const savePqrsMessage = (messageData: Omit<PqrsMessage, 'id' | 'date' | 'status'>): PqrsMessage => {
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const newMessage: PqrsMessage = {
    ...messageData,
    id: `pqrs-${Date.now().toString().slice(-5)}`,
    date: formattedDate,
    status: 'Pendiente'
  };

  const current = getStoredPqrs();
  const updated = [newMessage, ...current];
  try {
    localStorage.setItem(KEYS.PQRS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving PQRS to ag_q:', err);
  }
  return newMessage;
};

export const respondToPqrs = (pqrsId: string, response: string): void => {
  const messages = getStoredPqrs();
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const updated = messages.map(msg => {
    if (msg.id === pqrsId) {
      return {
        ...msg,
        status: 'Resuelto' as const,
        adminResponse: response,
        respondedAt: formattedDate
      };
    }
    return msg;
  });

  try {
    localStorage.setItem(KEYS.PQRS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error responding to PQRS in ag_q:', err);
  }
};

// --- CART MANAGEMENT ---
export const getStoredCart = (): CartItem[] => {
  try {
    const data = localStorage.getItem(KEYS.CART);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading cart:', err);
    return [];
  }
};

export const saveStoredCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  } catch (err) {
    console.error('Error saving cart:', err);
  }
};

// --- ADMIN SESSION ---
export const getAdminSession = (): AdminUser | null => {
  try {
    const data = localStorage.getItem(KEYS.ADMIN_AUTH);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveAdminSession = (user: AdminUser | null): void => {
  if (user) {
    localStorage.setItem(KEYS.ADMIN_AUTH, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.ADMIN_AUTH);
  }
};
