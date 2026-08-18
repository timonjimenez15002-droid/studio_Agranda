# 🌾 AGRANDA — Insumos Agrícolas Premium
> Plataforma de comercio electrónico y panel de administración integral para la distribución de fertilizantes de alta solubilidad, semillas híbridas certificadas por el ICA, maquinaria pesada y agroquímicos de biocontrol.

---

## 📑 Tabla de Contenidos
1. [Ficha Técnica del Proyecto (Stack Tecnológico)](#-1-ficha-técnica-del-proyecto-stack-tecnológico)
2. [Configuración Inicial del Entorno](#-2-configuración-inicial-del-entorno)
3. [Descarga y Configuración del Proyecto](#-3-descarga-y-configuración-del-proyecto)
4. [Configuración de la Base de Datos MySQL](#-4-configuración-de-la-base-de-datos-mysql)
5. [Configuración Global y Variables de Entorno](#-5-configuración-global-y-variables-de-entorno)
6. [Guía de Ejecución y Despliegue](#-6-guía-de-ejecución-y-despliegue)
7. [Credenciales y Acceso al Panel de Administración](#-7-credenciales-y-acceso-al-panel-de-administración)
8. [Arquitectura y Estructura del Código](#-8-arquitectura-y-estructura-del-código)
9. [Diccionario de la Base de Datos (`database/schema.sql`)](#-9-diccionario-de-la-base-de-datos)
10. [Solución de Problemas Frecuentes (Troubleshooting)](#-10-solución-de-problemas-frecuentes)

---

## 🛠️ 1. Ficha Técnica del Proyecto (Stack Tecnológico)

| Componente | Tecnología / Herramienta | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Lenguaje Principal** | **TypeScript** | `~5.8.2` | Tipado estático estricto, interfaces de datos seguras y mantenimiento robusto. |
| **Lenguaje Auxiliar** | **SQL (MySQL Dialect)** | `8.0+` | Scripting relacional DDL/DML, llaves foráneas, índices y vistas analíticas. |
| **Framework Frontend** | **React** (SPA) | `^19.0.1` | Componentes funcionales, React Hooks (`useState`, `useEffect`, `useMemo`), renderizado reactivo. |
| **Entorno de Construcción / Bundler** | **Vite** | `^6.2.3` | Servidor de desarrollo ultra rápido y compilación optimizada en producción. |
| **Framework de Estilos** | **Tailwind CSS** | `^4.1.14` | Sistema de utilidades de diseño, paleta *Sleek Earth & Green* y diseño 100% responsivo. |
| **Base de Datos** | **MySQL / MariaDB** | `MySQL 8.0+ / MariaDB 10.4+` | Persistencia relacional, integridad referencial y almacenamiento estructurado. |
| **Gráficos y Métricas** | **Chart.js** + **React-Chartjs-2** | `^4.5.1` / `^5.3.1` | Gráficos interactivos de ventas, ingresos mensuales y distribución de inventario. |
| **Animaciones & Transiciones** | **Motion** (`motion/react`) | `^12.23.24` | Animaciones fluidas de entrada, transiciones de tabs y modales. |
| **Iconografía** | **Lucide React** | `^0.546.0` | Conjunto de iconos vectoriales optimizados para agricultura y comercio. |
| **Efectos de Feedback** | **Canvas-Confetti** | `^1.9.4` | Animación de confeti al completar compras exitosamente. |

---

## 💻 2. Configuración Inicial del Entorno

Antes de clonar o ejecutar el proyecto en tu máquina local, debes verificar que tu entorno cuente con los siguientes programas instalados:

### 2.1. Instalar Node.js y Gestor de Paquetes
- **Node.js**: Se requiere versión **`18.0.0` o superior** (Se recomienda **Node.js 20 LTS** o **Node.js 22**).
- Descarga el instalador oficial desde: [https://nodejs.org/](https://nodejs.org/).
- Para verificar que Node.js y NPM están instalados correctamente, abre una terminal y ejecuta:
  ```bash
  node -v   # Debe mostrar v18.x.x, v20.x.x o superior
  npm -v    # Debe mostrar v9.x.x o superior
  ```

### 2.2. Instalar el Servidor de Base de Datos MySQL
Puedes elegir cualquiera de las siguientes opciones según tu sistema operativo:
- **Opción recomendada para principiantes (Windows / macOS)**: Instalar una suite integrada como **XAMPP** ([https://www.apachefriends.org/](https://www.apachefriends.org/)) o **Laragon** ([https://laragon.org/](https://laragon.org/)).
- **Opción para desarrolladores**: Instalar **MySQL Community Server 8.0+** ([https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)).
- **Herramienta visual recomendada**: **MySQL Workbench** o **DBeaver** para gestionar consultas y visualizar el esquema gráfico.

---

## 📥 3. Descarga y Configuración del Proyecto

### 3.1. Obtener los archivos del proyecto
Si descargaste el archivo comprimido `.zip` desde la plataforma:
1. Descomprime el archivo en una carpeta de tu preferencia (ej. `C:/proyectos/agranda` o `~/proyectos/agranda`).
2. Abre tu terminal de comandos en la raíz del proyecto.

### 3.2. Instalación de Dependencias
Instala todos los paquetes y módulos de TypeScript, React y Tailwind ejecutando:
```bash
npm install
```
*(También es compatible con `pnpm install`, `yarn install` o `bun install` si utilizas estos gestores).*

---

## 🗄️ 4. Configuración de la Base de Datos MySQL

El proyecto incluye un script SQL profesional, estructurado y listo para producción ubicado en:
📁 `database/schema.sql`

Este script contiene:
1. Creación de la base de datos `agranda_db` con codificación universal **UTF-8** (`utf8mb4_unicode_ci`).
2. Creación de 10 tablas relacionales con llaves foráneas (`FOREIGN KEY`) e integridad referencial (`CASCADE` / `RESTRICT`).
3. Poblado inicial con datos semilla (*seed data*) reales de productos agrícolas, registros ICA, pedidos, clientes y noticias.
4. Vistas SQL automáticas para reportes de ventas y alertas de inventario.

---

### Opción A: Importar mediante phpMyAdmin (XAMPP / Laragon / WampServer)
1. Inicia el panel de control de **XAMPP** o **Laragon** y enciende el servicio de **MySQL** (botón *Start*).
2. Abre tu navegador web e ingresa a: [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. En el menú superior, haz clic en la pestaña **Importar** (*Import*).
4. Haz clic en **Seleccionar archivo** (*Choose File*) y navega hasta el archivo `database/schema.sql` dentro de la carpeta del proyecto.
5. Verifica que la codificación de caracteres esté en **utf-8**.
6. Desplázate hacia abajo y presiona el botón **Importar**.
7. Aparecerá un mensaje verde confirmando la ejecución exitosa de todas las consultas SQL.

---

### Opción B: Importar mediante MySQL Workbench
1. Abre **MySQL Workbench** y abre tu conexión local (ej. `Local instance MySQL80`).
2. En el menú superior selecciona **File** > **Open SQL Script...** (o presiona `Ctrl + Shift + O`).
3. Selecciona el archivo `database/schema.sql`.
4. Haz clic en el ícono del rayo ⚡ (**Execute**) en la barra de herramientas.
5. En el panel izquierdo *Navigator / Schemas*, haz clic derecho y selecciona **Refresh All** para ver la base de datos `agranda_db`.

---

### Opción C: Importar mediante Consola / Terminal (CLI)
Abre tu terminal en la carpeta raíz del proyecto y ejecuta el siguiente comando:
```bash
# Windows / macOS / Linux (solicitará tu contraseña de MySQL):
mysql -u root -p < database/schema.sql
```

Para verificar que la base de datos y las tablas se crearon correctamente:
```bash
mysql -u root -p
```
```sql
USE agranda_db;
SHOW TABLES;
SELECT id, name, category_slug, price, stock FROM products;
```

---

### Opción D: Despliegue rápido con Docker
Si dispones de Docker en tu sistema, puedes iniciar un contenedor con MySQL y el script cargado automáticamente:
```bash
docker run --name mysql-agranda \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=agranda_db \
  -v $(pwd)/database/schema.sql:/docker-entrypoint-initdb.d/schema.sql \
  -p 3306:3306 \
  -d mysql:8.0
```

---

## ⚙️ 5. Configuración Global y Variables de Entorno

### 5.1. Archivo de Variables de Entorno (`.env`)
En la raíz del proyecto se encuentra el archivo `.env.example`. Crea una copia con el nombre `.env`:

```bash
# En Windows (Símbolo del sistema / CMD):
copy .env.example .env

# En Linux / macOS / PowerShell:
cp .env.example .env
```

### 5.2. Parámetros de Configuración Global
Edita el archivo `.env` según la configuración de tu máquina local:

```env
# -------------------------------------------------------------
# CONFIGURACIÓN DEL SERVIDOR WEB
# -------------------------------------------------------------
PORT=3000
HOST=0.0.0.0

# -------------------------------------------------------------
# CONFIGURACIÓN DE LA BASE DE DATOS MYSQL (Local / Producción)
# -------------------------------------------------------------
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=agranda_db

# -------------------------------------------------------------
# SERVICIOS DE INTELIGENCIA ARTIFICIAL (Opcional)
# -------------------------------------------------------------
GEMINI_API_KEY=""
```

---

## 🚀 6. Guía de Ejecución y Despliegue

### 6.1. Ejecución en Modo Desarrollo
Para iniciar la aplicación con recarga en vivo:
```bash
npm run dev
```

La terminal mostrará la dirección de acceso:
```
  VITE v6.2.3  ready in 210 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
```
Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

### 6.2. Verificación de Tipos TypeScript (Linting)
Para comprobar que no existan inconsistencias de tipado:
```bash
npm run lint
```

### 6.3. Compilación para Producción (Build)
Genera el paquete optimizado y minificado para despliegue en la carpeta `dist/`:
```bash
npm run build
```

### 6.4. Probar la Compilación de Producción Localmente
Sirve los archivos estáticos de la carpeta `dist/` en un servidor local:
```bash
npm run preview
```

---

## 🔐 7. Credenciales y Acceso al Panel de Administración

La plataforma cuenta con un **Panel Administrativo Integral** protegido por seguridad:

### ¿Cómo ingresar al Panel de Administración?
1. En la esquina superior derecha del encabezado, presiona el botón **Admin Panel**.
2. Introduce el **PIN de Acceso Maestro**:
   - **PIN por Defecto:** `15002`

### Credenciales de Usuario Administrador:
- **Usuario / Correo:** `admin@agranda.com`
- **Nombre:** Equipo Agronómico AGRANDA
- **Rol:** Administrador General

### Funcionalidades dentro del Panel:
1. **Métricas y Analítica**: Gráficos de ingresos totales, ventas del mes y distribución por categorías de insumos.
2. **Kárdex e Inventario**: Crear nuevos productos, editar precios, ajustar existencias de stock y gestionar avisos de bajo stock.
3. **Gestor de Pedidos**: Visualizar órdenes de compra de los agricultores y actualizar su estado en tiempo real (*Pendiente* ➔ *Cosechando / Despacho* ➔ *En Camino* ➔ *Entregado*).
4. **Mesa de Ayuda PQRS**: Responder dudas técnicas agronómicas y resolver peticiones de clientes con registro de fecha y hora.

---

## 📂 8. Arquitectura y Estructura del Código

```
├── 📁 database/
│   └── 📄 schema.sql            # Script SQL oficial de MySQL (tablas, datos semilla y vistas)
├── 📁 src/
│   ├── 📁 components/           # Componentes modulares de interfaz de usuario
│   │   ├── 📁 admin/            # Vistas del panel de control administrativo
│   │   │   └── 📄 AdminDashboard.tsx # Métricas, Kárdex, Pedidos y PQRS
│   │   ├── 📄 Navbar.tsx        # Navegación fija, buscador de insumos y carrito
│   │   ├── 📄 HeroBanner.tsx    # Banner principal con llamadas a la acción
│   │   ├── 📄 ProductCard.tsx   # Tarjeta de producto con selector y badge
│   │   ├── 📄 ProductModal.tsx  # Ficha técnica completa con registro ICA
│   │   ├── 📄 CartDrawer.tsx    # Carrito lateral deslizable y pasarela de pago a finca
│   │   ├── 📄 OrderTracker.tsx  # Línea de tiempo de rastreo de pedidos
│   │   ├── 📄 PqrsView.tsx      # Formulario de radicación y consulta de PQRS
│   │   ├── 📄 NewsView.tsx      # Portal de noticias y novedades fitosanitarias
│   │   └── 📄 Footer.tsx        # Pie de página institucional y enlaces
│   ├── 📁 data/
│   │   └── 📄 initialData.ts    # Catálogo semilla inicial de productos y noticias
│   ├── 📁 services/
│   │   └── 📄 storage.ts        # Almacenamiento reactivo local en navegador (LocalStorage)
│   ├── 📄 App.tsx               # Componente orquestador principal de vistas y estados
│   ├── 📄 main.tsx              # Punto de entrada de React en el DOM
│   ├── 📄 types.ts              # Modelos de datos e interfaces en TypeScript
│   └── 📄 index.css             # Configuración de Tailwind CSS y paleta Sleek
├── 📄 .env.example              # Plantilla de variables de entorno del sistema
├── 📄 index.html                # Documento HTML principal con fuentes tipográficas
├── 📄 package.json              # Dependencias, scripts y metadatos de Node.js
├── 📄 metadata.json             # Metadatos del proyecto en AI Studio
├── 📄 tsconfig.json             # Configuración estricta del compilador TypeScript
└── 📄 vite.config.ts            # Configuración del servidor y plugins de Vite
```

---

## 📊 9. Diccionario de la Base de Datos

| Nombre de la Tabla | Propósito / Descripción | Llave Primaria | Relaciones (Llaves Foráneas) |
| :--- | :--- | :--- | :--- |
| `categories` | Categorías de insumos (fertilizantes, semillas, maquinaria, agroquímicos). | `slug` | Ninguna |
| `products` | Catálogo de insumos agrícolas con precios, unidad de venta y stock. | `id` | `category_slug` ➔ `categories(slug)` |
| `product_technical_specs` | Fichas técnicas agronómicas (dosis, ciclo, registro ICA, composición). | `id` | `product_id` ➔ `products(id)` ON DELETE CASCADE |
| `customers` | Registro de agricultores, números de teléfono y nombres de fincas/predios. | `id` | Ninguna |
| `orders` | Órdenes de compra registradas con subtotales, fletes y métodos de pago. | `id` | `customer_id` ➔ `customers(id)` |
| `order_items` | Detalle individual de los productos solicitados en cada orden. | `id` | `order_id` ➔ `orders(id)`, `product_id` ➔ `products(id)` |
| `pqrs_messages` | Peticiones, quejas, reclamos y consultas agronómicas radicadas. | `id` | Ninguna |
| `news_articles` | Boletines informativos, alertas de plagas y tendencias de precios. | `id` | Ninguna |
| `roles_admin` | Roles de seguridad administrativa (Administrador, Agrónomo, Logística). | `id` | Ninguna |
| `admin_users` | Cuentas de usuarios administradores con contraseñas encriptadas. | `id` | `role_id` ➔ `roles_admin(id)` |
| `inventory_logs` | Historial de movimientos de kárdex (entradas, salidas y ajustes manuales). | `id` | `product_id` ➔ `products(id)` |

---

## ❓ 10. Solución de Problemas Frecuentes

### 1. Mensaje de error: `Port 3000 is already in use`
- **Causa**: Otra aplicación en tu computadora está utilizando el puerto 3000.
- **Solución**: Puedes iniciar Vite en un puerto alternativo ejecutando:
  ```bash
  npx vite --port 3001
  ```

### 2. Error al importar el archivo `.sql` por caracteres especiales
- **Causa**: La base de datos no está usando codificación UTF-8.
- **Solución**: El script `database/schema.sql` ya incluye la cláusula `CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`. Asegúrate de no modificar esta línea al importar.

### 3. Restablecer el estado y datos de prueba en el navegador
- La aplicación web utiliza `LocalStorage` en el navegador para que puedas realizar compras y registrar consultas de prueba sin depender de servicios externos en tiempo real.
- Si deseas reiniciar todos los datos a los valores de fábrica:
  1. En el navegador presiona `F12` (Herramientas de Desarrollador).
  2. Ve a la pestaña **Application** (o **Almacenamiento**).
  3. En la sección izquierda selecciona **Local Storage** > `http://localhost:3000`.
  4. Haz clic en el botón de basura o **Clear All** y recarga la página (`F5`).

---

🌾 **AGRANDA** — *Tecnología y Nutrición para la Tierra Colombiana.*  
¿Tienes dudas o necesitas asistencia? Comunícate con el equipo agronómico en `soporte@agranda.com`.
