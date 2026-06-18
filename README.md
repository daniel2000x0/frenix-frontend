# Fenix Frontend — E-Commerce Platform

**FenixFrontend** es un frontend moderno de comercio electrónico construido con **Angular 21**, **PrimeNG** y **TailwindCSS**. Ofrece una experiencia de usuario completa con autenticación JWT, catálogo de productos con búsqueda y ordenamiento, carrito de compras, procesamiento de pagos y panel administrativo con CRUD real.

---

## Características

| Módulo | Funcionalidad |
|--------|---------------|
| **Autenticación** | Login, registro, JWT, guardias de ruta por rol (ADMIN / CUSTOMER) |
| **Home** | Landing page con categorías, productos recomendados y más vendidos |
| **Productos** | Listado, detalle, búsqueda con debounce (300ms), filtros por categoría, ordenamiento por precio/nombre y paginación |
| **Carrito** | Carrito de compras persistente en localStorage con badge sincronizado en header |
| **Órdenes** | Creación de órdenes con líneas de producto dinámicas e historial |
| **Pagos** | Selección de método, procesamiento simulado y resultado |
| **Admin** | Dashboard con gráficos (Chart.js), CRUD de productos con API real (crear, editar, eliminar), gestión de categorías y usuarios |
| **Perfil** | Perfil de usuario autenticado |
| **Contacto** | Formulario de contacto con servicio HTTP, validaciones y notificaciones Toast |
| **Notificaciones** | Sistema de notificaciones Toast global y ConfirmDialog para feedback de usuario |

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Angular](https://angular.dev) | 21 | Framework SPA (standalone components) |
| [PrimeNG](https://primeng.org) | 21 | UI components (data table, dialog, paginator) |
| [PrimeFlex](https://primeflex.org) | 4 | CSS utility classes (Flexbox, Grid) |
| [PrimeIcons](https://primeng.org/icons) | 7 | Icon set |
| [TailwindCSS](https://tailwindcss.com) | 4 | Utility-first CSS framework |
| [SweetAlert2](https://sweetalert2.github.io) | 11 | Alertas y confirmaciones |
| [Chart.js](https://www.chartjs.org) | — | Dashboard con gráficos estadísticos |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Lenguaje tipado |
| [Vitest](https://vitest.dev) | 4 | Testing unitario |
| [RxJS](https://rxjs.dev) | 7.8 | Programación reactiva |

---

## Estructura del Proyecto

```
src/app/
├── core/                    # Layout (header, footer)
├── features/                # Módulos de negocio
│   ├── auth/                # Login, register, profile
│   ├── home/                # Landing page
│   ├── products/            # Listado, detalle, creación
│   ├── orders/              # Creación e historial de órdenes
│   ├── payment/             # Flujo de pago
│   ├── shopping-card/       # Carrito de compras
│   ├── admin/               # Panel administrativo
│   ├── contact/             # Formulario de contacto
│   └── about/               # Página "Sobre Nosotros"
├── service/                 # Servicios HTTP (auth, product, order, contact)
├── model/ & dto/            # Interfaces de dominio y DTOs
├── guards/                  # authGuard, rolGuard (protección de rutas)
├── interceptors/            # Interceptor JWT + manejo de errores 401/403
├── shared/                  # Directivas (hasRole), pipes (capitalize), página 403
└── primeng/                 # Barrel de imports PrimeNG
```

---

## Inicio Rápido

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd fenix-frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
ng serve

# 4. Abrir en el navegador
open http://localhost:4200
```

> El backend API debe ejecutarse en `http://localhost:3000`.
> Ver configuración en `src/app/environments/enviroment.ts`.

---

## Build para Producción

```bash
ng build
```

Los artefactos se generan en `dist/fenix-frontend/`.

---

## Tests

```bash
ng test
```

Ejecuta pruebas unitarias con Vitest (38+ tests). Incluye:

| Tipo | Cantidad | Cobertura |
|------|----------|-----------|
| Components | 38 spec files | Creación, formularios, submit, estados de carga y error |
| Services | AuthService | Login, register, logout, isAuthenticated, hasRole, getPayload, localStorage |
| Guards | authGuard | Rutas protegidas, redirección con returnUrl |
| Pipes | CapitalizePipe | 7 tests cubriendo mayúsculas, minúsculas, mixto, valores no-string, vacío |
| Directives | HasRole | Visibilidad condicional según rol de usuario |

---

## Rutas Principales

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Home / Landing | Público |
| `/login` | Inicio de sesión | Público |
| `/register` | Registro | Público |
| `/products` | Catálogo de productos | Autenticado |
| `/products/:id` | Detalle de producto | Autenticado |
| `/products/create` | Crear producto | Autenticado |
| `/shopping-cart` | Carrito de compras | Autenticado |
| `/orders/create` | Nueva orden | CUSTOMER / ADMIN |
| `/orders/history` | Historial de órdenes | CUSTOMER / ADMIN |
| `/payment/*` | Flujo de pago | CUSTOMER / ADMIN |
| `/auth/profile` | Perfil de usuario | CUSTOMER |
| `/admin/dashboard` | Panel admin | ADMIN |
| `/About` | Acerca de | Público |
| `/Contact` | Contacto | Público |

---

## API Endpoints

El frontend se conecta a un backend REST en `http://localhost:3000`.

| Endpoint | Método | Descripción | Body |
|----------|--------|-------------|------|
| `/auth/login` | POST | Inicio de sesión | `{ useremail, userpassword }` |
| `/auth/registrar` | POST | Registro de usuario | `{ email, password, firstName, lastName, birthDate, genderId }` |
| `/product` | GET | Lista de productos | — |
| `/product/:id` | GET | Detalle de producto | — |
| `/product` | POST | Crear producto | Product data |
| `/product/:id` | PUT | Actualizar producto | Product data |
| `/product/:id` | DELETE | Eliminar producto | — |
| `/contact` | POST | Enviar mensaje contacto | `{ name, email, message }` |
| `/order` | POST | Crear orden | Order data |
| `/order` | GET | Historial de órdenes | — |

---

## Flujo de Autenticación

1. El usuario se registra (`/register`) o inicia sesión (`/login`)
2. El backend devuelve un **JWT** que se almacena en `localStorage`
3. Un **interceptor HTTP** (`authInterceptor`) adjunta el token Bearer a todas las solicitudes (excepto endpoints públicos)
4. Los **guardias de ruta** (`authGuard`, `rolGuard`) protegen las rutas según el rol
5. En caso de 401 → redirección a `/login`; 403 → SweetAlert + redirección a `/unauthorized`

---

## Roles

- **CUSTOMER** — Acceso a productos, órdenes, carrito, perfil
- **ADMIN** — Acceso completo al panel de administración (dashboard, CRUD productos, usuarios, reportes)

---

## Funcionalidades Recientes

| Funcionalidad | Descripción |
|---------------|-------------|
| **Búsqueda con debounce** | Búsqueda en tiempo real con 300ms de retardo para evitar llamadas excesivas |
| **Filtro por categoría** | Selector de categorías con filtrado instantáneo del catálogo |
| **Ordenamiento** | Ordenar productos por nombre (A-Z, Z-A) y precio (menor a mayor, mayor a menor) |
| **Paginación** | Navegación por páginas en productos y tablas del panel admin |
| **Badge de carrito** | Contador de artículos visible en el header con sincronización cross-tab |
| **Toast Notifications** | Feedback visual con PrimeNG Toast para acciones del usuario |
| **Confirmación de eliminación** | Diálogo de confirmación con ConfirmDialog para evitar borrados accidentales |
| **Servicio de contacto** | Formulario de contacto conectado a backend con validaciones |
| **Logout funcional** | Limpieza completa de sesión al cerrar sesión |
| **Footer dinámico** | Año actualizado automáticamente y enlaces corregidos |
| **Loading states** | Indicadores de carga en componentes con operaciones asíncronas |
| **Admin CRUD real** | Panel admin conectado a API real para crear, editar y eliminar productos |

---

## Licencia

Este proyecto es de uso educativo y portafolio personal.
