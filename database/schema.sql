-- =====================================================================
-- AGRANDA - Insumos Agrícolas Premium
-- Script de Base de Datos MySQL (Esquema Completo + Datos Semilla)
-- Compatible con: MySQL 8.0+, MariaDB 10.4+, phpMyAdmin, MySQL Workbench
-- Codificación: UTF-8 (utf8mb4)
-- =====================================================================

-- 1. CREACIÓN Y SELECCIÓN DE BASE DE DATOS
DROP DATABASE IF EXISTS `agranda_db`;
CREATE DATABASE `agranda_db` 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `agranda_db`;

-- =====================================================================
-- 2. TABLAS PRINCIPALES
-- =====================================================================

-- ---------------------------------------------------------------------
-- Tabla: roles_admin
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles_admin` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Tabla: admin_users (Administradores y personal técnico)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `role_id` INT NOT NULL DEFAULT 1,
  `role_name` VARCHAR(50) NOT NULL DEFAULT 'Administrador General',
  `avatar_url` VARCHAR(500) NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_admin_role` FOREIGN KEY (`role_id`) REFERENCES `roles_admin` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Tabla: categories (Categorías de insumos agropecuarios)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `slug` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `icon_name` VARCHAR(50) NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Tabla: products (Catálogo de productos agropecuarios)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category_slug` VARCHAR(50) NOT NULL,
  `subcategory` VARCHAR(100) NOT NULL,
  `price` DECIMAL(12, 2) NOT NULL,
  `original_price` DECIMAL(12, 2) NULL,
  `unit` VARCHAR(80) NOT NULL COMMENT 'Ej: Bulto 50 Kg, Frasco 1 Litro, Unidad',
  `badge` ENUM('Más Vendido', 'Ecológico', 'Alto Rendimiento', 'Oferta Especial', 'Garantía Oficial') NULL,
  `image_url` VARCHAR(600) NOT NULL,
  `short_description` TEXT NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `featured` BOOLEAN NOT NULL DEFAULT FALSE,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_slug`) REFERENCES `categories` (`slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `idx_products_category` ON `products` (`category_slug`);
CREATE INDEX `idx_products_stock` ON `products` (`stock`);

-- ---------------------------------------------------------------------
-- Tabla: product_technical_specs (Ficha técnica agronómica del producto)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_technical_specs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` VARCHAR(50) NOT NULL UNIQUE,
  `variety` VARCHAR(150) NULL COMMENT 'Variedad genética (Semillas/Plantas)',
  `germination_rate` VARCHAR(80) NULL COMMENT 'Porcentaje de germinación garantizado',
  `presentation` VARCHAR(200) NOT NULL COMMENT 'Tipo de empaque o envase',
  `crop_cycle` VARCHAR(150) NULL COMMENT 'Ciclo de cultivo (días/meses)',
  `estimated_yield` VARCHAR(200) NULL COMMENT 'Rendimiento estimado por Hectárea',
  `dosage` VARCHAR(255) NULL COMMENT 'Dosis y frecuencia recomendada',
  `ica_register` VARCHAR(100) NULL COMMENT 'Registro oficial ICA de Colombia',
  `active_component` VARCHAR(255) NULL COMMENT 'Composición química / biológica',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_specs_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Tabla: customers (Clientes y productores agrícolas)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `farm_name` VARCHAR(150) NULL COMMENT 'Nombre de la Finca o Predio',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `idx_customers_email` ON `customers` (`email`);
CREATE INDEX `idx_customers_phone` ON `customers` (`phone`);

-- ---------------------------------------------------------------------
-- Tabla: orders (Pedidos de insumos agrícolas)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) PRIMARY KEY,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_id` INT NULL,
  `customer_full_name` VARCHAR(150) NOT NULL,
  `customer_email` VARCHAR(120) NOT NULL,
  `customer_phone` VARCHAR(30) NOT NULL,
  `delivery_address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `farm_name` VARCHAR(150) NULL,
  `delivery_notes` TEXT NULL,
  `subtotal` DECIMAL(12, 2) NOT NULL,
  `shipping_cost` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `total` DECIMAL(12, 2) NOT NULL,
  `payment_method` ENUM('credit_card', 'digital_transfer', 'cash_on_delivery') NOT NULL,
  `payment_reference` VARCHAR(100) NULL,
  `payment_card_last4` VARCHAR(4) NULL,
  `status` ENUM('Pendiente', 'Cosechando / Despacho', 'En Camino', 'Entregado', 'Cancelado') NOT NULL DEFAULT 'Pendiente',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_order_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `idx_orders_status` ON `orders` (`status`);
CREATE INDEX `idx_orders_created` ON `orders` (`created_at`);

-- ---------------------------------------------------------------------
-- Tabla: order_items (Detalle de productos por pedido)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` VARCHAR(50) NOT NULL,
  `product_id` VARCHAR(50) NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  `unit_price` DECIMAL(12, 2) NOT NULL,
  `unit` VARCHAR(80) NOT NULL,
  `image_url` VARCHAR(600) NULL,
  `subtotal` DECIMAL(12, 2) GENERATED ALWAYS AS (`quantity` * `unit_price`) STORED,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_item_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_item_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `idx_order_items_order` ON `order_items` (`order_id`);

-- ---------------------------------------------------------------------
-- Tabla: pqrs_messages (Atención de Peticiones, Quejas, Reclamos y Asesoría Técnica)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `pqrs_messages` (
  `id` VARCHAR(50) PRIMARY KEY,
  `type` ENUM('Queja', 'Reclamo', 'Sugerencia', 'Consulta Técnica') NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `order_number` VARCHAR(50) NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('Pendiente', 'En Revisión', 'Resuelto') NOT NULL DEFAULT 'Pendiente',
  `admin_response` TEXT NULL,
  `responded_at` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `idx_pqrs_status` ON `pqrs_messages` (`status`);
CREATE INDEX `idx_pqrs_type` ON `pqrs_messages` (`type`);

-- ---------------------------------------------------------------------
-- Tabla: news_articles (Noticias e investigaciones agropecuarias)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `news_articles` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` ENUM('Cosecha', 'Infraestructura', 'Sanidad', 'Mercado', 'Ganadería') NOT NULL,
  `summary` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `author` VARCHAR(120) NOT NULL,
  `read_time` VARCHAR(50) NOT NULL DEFAULT '4 min de lectura',
  `image_url` VARCHAR(600) NOT NULL,
  `source` VARCHAR(150) NOT NULL,
  `is_published` BOOLEAN NOT NULL DEFAULT TRUE,
  `published_date` VARCHAR(80) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `idx_news_category` ON `news_articles` (`category`);

-- ---------------------------------------------------------------------
-- Tabla: inventory_logs (Kárdex y movimientos de inventario)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` VARCHAR(50) NOT NULL,
  `movement_type` ENUM('ENTRADA_COMPRA', 'SALIDA_VENTA', 'AJUSTE_MANUAL', 'DEVOLUCION') NOT NULL,
  `quantity` INT NOT NULL,
  `previous_stock` INT NOT NULL,
  `new_stock` INT NOT NULL,
  `notes` VARCHAR(255) NULL,
  `admin_user_id` INT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_log_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- 3. DATOS SEMILLA (SEED DATA REALISTA)
-- =====================================================================

-- Roles iniciales
INSERT INTO `roles_admin` (`id`, `name`, `description`) VALUES
(1, 'Administrador General', 'Control total de catálogo, pedidos, kárdex y atención al cliente'),
(2, 'Agrónomo Técnico', 'Gestión de fichas técnicas y respuestas a consultas agrícolas'),
(3, 'Logística y Despachos', 'Actualización de estados de envío y guías de transporte');

-- Usuario Administrador por Defecto
INSERT INTO `admin_users` (`id`, `email`, `password_hash`, `name`, `role_id`, `role_name`, `avatar_url`) VALUES
(1, 'admin@agranda.com', '$2y$10$wT.4U8Y80oT8gH9k0L1G8O3L3Y.jQ2D2dZ0E4.eX8lP9oH9k0L1G8', 'Equipo Agronómico AGRANDA', 1, 'Administrador General', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');

-- Categorías
INSERT INTO `categories` (`slug`, `name`, `description`, `icon_name`) VALUES
('fertilizantes', 'Fertilizantes & Abonos', 'Nutrición edáfica y foliar de alta asimilación con registro ICA', 'Leaf'),
('semillas', 'Semillas Certificadas', 'Híbridos y variedades de alto rendimiento con pureza comprobada', 'Sprout'),
('maquinaria', 'Maquinaria & Equipos', 'Tractores, aspersoras y tecnología para mecanización agrícola', 'Tractor'),
('agroquimicos', 'Agroquímicos & Biocontrol', 'Fungicidas, insecticidas y bio-controladores de bajo impacto ambiental', 'ShieldCheck');

-- Catálogo de Productos
INSERT INTO `products` (`id`, `name`, `category_slug`, `subcategory`, `price`, `original_price`, `unit`, `badge`, `image_url`, `short_description`, `stock`, `featured`) VALUES
('prod-001', 'Fertilizante NPK 17-6-18 Granulado Premium', 'fertilizantes', 'N.P.K. Suelo', 185000.00, 210000.00, 'Bulto 50 Kg', 'Más Vendido', 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80', 'Fórmula balanceada ideal para etapas de desarrollo y llenado en café, maíz, frutales y hortalizas.', 140, TRUE),
('prod-002', 'Semilla Certificada Maíz Híbrido Dorado AG-990', 'semillas', 'Cereales', 340000.00, 380000.00, 'Bolsa 60,000 Semillas', 'Alto Rendimiento', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80', 'Semilla híbrida con resistencia a sequía y volcamiento, excelente estabilidad agronómica.', 85, TRUE),
('prod-003', 'Fumigadora Motor 2 Tiempos Asperjadora Agrícola 25L', 'maquinaria', 'Equipos de Aspersión', 1250000.00, 1420000.00, 'Unidad', 'Garantía Oficial', 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80', 'Motor de 26cc de alta presión para aplicación uniforme en cultivos extensivos y laderas.', 22, TRUE),
('prod-004', 'Bio-Fungicida Orgánico Trichoderma Harzianum 1L', 'agroquimicos', 'Control Biológico', 92000.00, 105000.00, 'Frasco 1 Litro', 'Ecológico', 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80', 'Inóculo biológico protector de raíz contra Fusarium, Phytophthora y Rhizoctonia.', 60, TRUE),
('prod-005', 'Fertilizante Foliar Bioestimulante de Algas Marinas 5L', 'fertilizantes', 'Foliares', 165000.00, 180000.00, 'Galón 5 Litros', 'Ecológico', 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80', 'Extracto concentrado de Ascophyllum Nodosum enriquecido con aminoácidos libres y boro.', 45, FALSE),
('prod-006', 'Semilla Certificada Café Castillo Paraguaicito', 'semillas', 'Cafetería', 195000.00, NULL, 'Kilo Semilla Tratada', 'Más Vendido', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', 'Resistente a la Roya del cafeto (Hemileia vastatrix), excelente perfil de taza y rendimiento.', 110, FALSE),
('prod-007', 'Tractor Agrícola 75 HP 4x4 Diésel con Enchanche Tripuntal', 'maquinaria', 'Tractores', 145000000.00, 158000000.00, 'Unidad Maquinaria', 'Oferta Especial', 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12735?auto=format&fit=crop&w=800&q=80', 'Motor Turbo Diésel de 4 cilindros, transmisión sincronizada 12x12 y cabina climatizada.', 3, FALSE),
('prod-008', 'Insecticida Sistémico Clorpirifos + Imidacloprid 1L', 'agroquimicos', 'Insecticidas', 118000.00, NULL, 'Frasco 1 Litro', 'Más Vendido', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', 'Control de amplio espectro contra gusano cogollero, broca, mosca blanca y trips.', 90, FALSE);

-- Fichas Técnicas
INSERT INTO `product_technical_specs` (`product_id`, `variety`, `germination_rate`, `presentation`, `crop_cycle`, `estimated_yield`, `dosage`, `ica_register`, `active_component`) VALUES
('prod-001', NULL, NULL, 'Bulto polipropileno laminado 50 Kg', 'Mantenimiento continuo y floración', 'Incremento del 22% en peso de grano', '150 - 300 Kg/Hectárea según análisis de suelo', 'ICA No. 004821-AG', 'Nitrógeno Total 17%, Fósforo (P2O5) 6%, Potasio (K2O) 18%, Magnesio 2%'),
('prod-002', 'Híbrido AG-990 Calidad Exportación', '98.5% Garantizado', 'Bolsa hermética aluminizada con tratamiento fúngico', '125 - 135 Días a cosecha', '9.8 - 11.5 Toneladas/Hectárea', '60,000 - 65,000 plantas/ha', 'ICA No. 010293-SEM', NULL),
('prod-003', NULL, NULL, 'Caja incluye mangueras, varilla de 3 boquillas y kit de repuestos', 'N/A - Herramienta de fumigación', 'Cobertura hasta 3 Hectáreas/día por operario', 'Presión ajustable 15 - 25 Bar', 'Certificación ISO 9001 - Garantía 1 Año', NULL),
('prod-004', NULL, 'Concentración 1x10^9 esporas/ml', 'Frasco PEAD 1000 cc líquido concentrado', 'Aplicación preventiva desde semillero', 'Protección radicular 100% libre de residuos químicos', '2 - 3 cc por Litro de agua en drench o foliar', 'ICA No. 008321-BIO', 'Trichoderma harzianum cepa AGR-04'),
('prod-005', NULL, NULL, 'Galón 5000 cc', 'Pre-floración y cuajado de frutos', 'Aumento en tamaño y homogenización del fruto', '1.5 - 2.0 Litros por Hectárea', 'ICA No. 005112-FER', 'Extracto de Algas 25%, Aminoácidos 10%, Boro 2%'),
('prod-006', 'Castillo Zona Central Paraguaicito', '95% Mínimo comprobado', 'Empaque de 1 Kg tratada con fungicida sistémico', 'Germinador 60 días / Almácigo 5 meses', '3.5 Toneladas Café Cerezos/ha', NULL, 'ICA No. 000412-CAF', NULL),
('prod-007', NULL, NULL, 'Entrega técnica directamente en predio con capacitación', 'Uso rudo agrícola continuo', 'Capacidad de tiro de 3,200 Kg', NULL, 'Homologación Ministerio de Transporte & Registro RUNT', NULL),
('prod-008', NULL, NULL, 'Envase coextruido 1000 cc con sello de seguridad', 'Aparición de plagas en umbral económico', 'Efecto knock-down inmediato y residualidad 15 días', '350 - 500 cc por caneca de 200 Litros', 'ICA No. 001920-INS', 'Clorpirifos 240g/L + Imidacloprid 100g/L');

-- Clientes Iniciales
INSERT INTO `customers` (`id`, `full_name`, `email`, `phone`, `address`, `city`, `department`, `farm_name`) VALUES
(1, 'Roberto Gómez Silva', 'roberto.gomez@finca.com', '+57 312 456 7890', 'Vereda La Esperanza, Finca El Edén', 'Chinchiná', 'Caldas', 'Finca El Edén'),
(2, 'María Fernanda Aristizábal', 'mf.aristizabal@agro.co', '+57 320 891 2345', 'Km 5 Vía Panamericana, Agrocampo', 'Espinal', 'Tolima', 'Hacienda La Primavera'),
(3, 'Hernán Darío Gutiérrez', 'hernan.gutierrez@gmail.com', '+57 300 555 1234', 'Sector El Triunfo Lote 4', 'Armenia', 'Quindío', 'Finca Bellavista');

-- Pedidos Iniciales
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_full_name`, `customer_email`, `customer_phone`, `delivery_address`, `city`, `department`, `farm_name`, `delivery_notes`, `subtotal`, `shipping_cost`, `total`, `payment_method`, `payment_reference`, `payment_card_last4`, `status`, `created_at`) VALUES
('ord-1001', 'AG-2026-8812', 1, 'Roberto Gómez Silva', 'roberto.gomez@finca.com', '+57 312 456 7890', 'Vereda La Esperanza, Finca El Edén', 'Chinchiná', 'Caldas', 'Finca El Edén', 'Dejar el pedido con el administrador del galpón principal.', 2126000.00, 45000.00, 2171000.00, 'digital_transfer', 'NEQUI-998124', NULL, 'Cosechando / Despacho', '2026-08-11 14:32:00'),
('ord-1002', 'AG-2026-8790', 2, 'María Fernanda Aristizábal', 'mf.aristizabal@agro.co', '+57 320 891 2345', 'Km 5 Vía Panamericana, Agrocampo', 'Espinal', 'Tolima', 'Hacienda La Primavera', 'Llamar 1 hora antes de la entrega para coordinar tractor de transbordo.', 1360000.00, 30000.00, 1390000.00, 'credit_card', NULL, '4242', 'En Camino', '2026-08-10 09:15:00'),
('ord-1003', 'AG-2026-8650', 3, 'Hernán Darío Gutiérrez', 'hernan.gutierrez@gmail.com', '+57 300 555 1234', 'Sector El Triunfo Lote 4', 'Armenia', 'Quindío', 'Finca Bellavista', NULL, 1250000.00, 0.00, 1250000.00, 'cash_on_delivery', NULL, NULL, 'Entregado', '2026-08-08 16:40:00');

-- Ítems de Pedidos
INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `unit`, `image_url`) VALUES
('ord-1001', 'prod-001', 'Fertilizante NPK 17-6-18 Granulado Premium', 10, 185000.00, 'Bulto 50 Kg', 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80'),
('ord-1001', 'prod-004', 'Bio-Fungicida Orgánico Trichoderma Harzianum 1L', 3, 92000.00, 'Frasco 1 Litro', 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80'),
('ord-1002', 'prod-002', 'Semilla Certificada Maíz Híbrido Dorado AG-990', 4, 340000.00, 'Bolsa 60,000 Semillas', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80'),
('ord-1003', 'prod-003', 'Fumigadora Motor 2 Tiempos Asperjadora Agrícola 25L', 1, 1250000.00, 'Unidad', 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80');

-- Mensajes PQRS / Asesorías Técnicas
INSERT INTO `pqrs_messages` (`id`, `type`, `name`, `email`, `phone`, `order_number`, `subject`, `message`, `status`, `admin_response`, `responded_at`, `created_at`) VALUES
('pqrs-201', 'Consulta Técnica', 'Alonso Ramírez', 'alonso.ramirez@agromail.com', '+57 311 789 4561', 'AG-2026-8812', 'Compatibilidad de mezcla de NPK con bioestimulante foliar', 'Buenas tardes. Quisiera saber si el fertilizante NPK granulado 17-6-18 se puede disolver en agua junto con el Bioestimulante de Algas Marinas para una aplicación en fertirriego sin taponar mangueras.', 'En Revisión', NULL, NULL, '2026-08-11 11:20:00'),
('pqrs-202', 'Sugerencia', 'Sonia Restrepo', 'sonia.agro@outlook.com', '+57 318 654 3210', NULL, 'Inclusión de insumos para aguacate Hass', 'Excelente servicio en la entrega de las fumigadoras. Sugiero que incluyan en el catálogo fertilizantes solubles ricos en Calcio y Boro específicos para cuajado en aguacate Hass.', 'Resuelto', 'Estimada Sonia, muchas gracias por su sugerencia. Estamos incorporando la línea Caltrac + Boro de 10L para la próxima semana.', '2026-08-10 09:30:00', '2026-08-09 15:45:00');

-- Artículos de Noticias Agrícolas
INSERT INTO `news_articles` (`id`, `title`, `category`, `summary`, `content`, `author`, `read_time`, `image_url`, `source`, `published_date`, `created_at`) VALUES
('news-001', 'Nuevas técnicas de fertilización de precisión aumentan el rendimiento en cultivos de maíz un 25%', 'Cosecha', 'Estudios agronómicos recientes demuestran que el fraccionamiento de Nitrógeno y Potasio basado en mapas de suelo eleva significativamente el llenado de mazorca.', 'La agricultura de precisión continúa revolucionando los campos latinoamericanos. Según análisis realizados en más de 500 hectáreas piloto, la combinación de sensores de clorofila y fertilizantes granulados con inhibidores de ureasa redujo el desperdicio por lixiviación y aumentó la rentabilidad neta por hectárea en un 25%. Los técnicos recomiendan realizar análisis foliares antes del segundo abonado.', 'Ing. Carlos Mendoza (Agrónomo Senior)', '4 min de lectura', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', 'Boletín Agrícola Nacional', '10 de Agosto, 2026', '2026-08-10 08:00:00'),
('news-002', 'Ministerio de Agricultura aprueba subsidios del 20% en adquisición de maquinaria e infraestructura de riego', 'Infraestructura', 'Incentivos gubernamentales buscan modernizar los sistemas de riego por goteo y la renovación de tractores de baja emisión para pequeños y medianos productores.', 'A partir del presente mes, los productores registrados en el RUA podrán postularse a la devolución del IVA y subsidio directo en la compra de motobombas, tubería de goteo, sistemas de aspersión y tractores hasta de 90 HP. Esta medida busca preparar los distritos de riego frente a los fenómenos climáticos estacionales.', 'Redacción AGRANDA Noticias', '3 min de lectura', 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12735?auto=format&fit=crop&w=800&q=80', 'Gaceta Agropecuaria', '08 de Agosto, 2026', '2026-08-08 09:30:00'),
('news-003', 'Alerta fitosanitaria: Recomendaciones preventivas para el control del Gusano Cogollero en época seca', 'Sanidad', 'Expertos sugieren rotación de moléculas de agroquímicos y aplicaciones nocturnas de bio-controladores para evitar resistencia.', 'El incremento de temperaturas favorece el ciclo biológico de la Spodoptera frugiperda. Se recomienda a los agricultores monitorear postura de huevos y primeros instares larvarios. Las mezclas con bio-pesticidas a base de Bacillus thuringiensis y liberación de Trichogramma han mostrado una eficacia superior al 90%.', 'Dra. Elena Ramos (Sanidad Vegetal)', '5 min de lectura', 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80', 'Instituto Colombiano Agropecuario (ICA)', '05 de Agosto, 2026', '2026-08-05 14:15:00'),
('news-004', 'Tendencias del mercado del Café y Fertilizantes: Precios internacionales al alza favorecen a los productores', 'Mercado', 'El precio del grano de café en bolsa de Nueva York alcanza máximos históricos mientras el costo de insumos de urea se estabiliza.', 'El panorama comercial para los caficultores se torna optimista en el tercer trimestre. La demanda global de cafés especiales con certificación orgánica ha impulsado el precio por carga. Paralelamente, las importaciones masivas de fertilizantes NPK han nivelado los costos de producción por arroba.', 'Economista Agro: Mauricio Restrepo', '4 min de lectura', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', 'Federación Agrocomercial', '01 de Agosto, 2026', '2026-08-01 10:00:00');

-- =====================================================================
-- 4. VISTAS Y CONSULTAS ANALÍTICAS ÚTILES
-- =====================================================================

-- Vista: Resumen de ventas por producto
CREATE OR REPLACE VIEW `view_product_sales_summary` AS
SELECT 
  p.id AS product_id,
  p.name AS product_name,
  p.category_slug,
  p.stock AS current_stock,
  COALESCE(SUM(oi.quantity), 0) AS total_units_sold,
  COALESCE(SUM(oi.subtotal), 0) AS total_revenue
FROM `products` p
LEFT JOIN `order_items` oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.category_slug, p.stock;

-- Vista: Resumen financiero mensual de pedidos
CREATE OR REPLACE VIEW `view_monthly_orders_summary` AS
SELECT 
  DATE_FORMAT(o.created_at, '%Y-%m') AS sale_month,
  COUNT(o.id) AS total_orders,
  SUM(o.subtotal) AS gross_subtotal,
  SUM(o.shipping_cost) AS total_shipping,
  SUM(o.total) AS net_revenue
FROM `orders` o
WHERE o.status != 'Cancelado'
GROUP BY DATE_FORMAT(o.created_at, '%Y-%m')
ORDER BY sale_month DESC;

-- Vista: Alertas de stock bajo (< 10 unidades)
CREATE OR REPLACE VIEW `view_low_stock_alerts` AS
SELECT 
  id,
  name,
  category_slug,
  stock,
  unit,
  price
FROM `products`
WHERE stock <= 10
ORDER BY stock ASC;
