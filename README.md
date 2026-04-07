# SIPI Posgrados — Frontend (v2)

Cliente web del **Sistema de Información para Posgrado (SIPI)** de la Universidad Autónoma de Yucatán (UADY). Aplicación **React** con **TypeScript**, orientada al acceso institucional, registro y avisos legales.

---

## Stack técnico

| Área | Tecnología | Versión (referencia en `package.json`) |
|------|------------|----------------------------------------|
| UI | React | ^19.2.x |
| Enrutamiento | react-router-dom | ^7.14.x |
| HTTP | Axios | ^1.14.x |
| Lenguaje | TypeScript | ~6.0.x |
| Bundler / dev server | Vite | ^8.0.x |
| Plugin React | @vitejs/plugin-react | ^6.0.x |
| Estilos | Tailwind CSS | ^3.4.x |
| PostCSS | postcss, autoprefixer | — |
| Lint | ESLint + typescript-eslint | ^9.x / ^8.x |

**Fuentes (Google Fonts, ver `index.html`):**

- Source Sans 3 — texto base (`font-sans`)
- Plus Jakarta Sans — titulares (`font-display`)
- Source Serif 4 — nombre institucional en cabecera (`font-serif`)

**Target de compilación (app):** ES2023, módulos ESNext, JSX `react-jsx` (`tsconfig.app.json`).

---

## Requisitos

- **Node.js** recomendado: LTS actual (p. ej. 20.x o 22.x).
- **npm** (incluido con Node) para dependencias y scripts.

---

## Instalación y scripts

```bash
npm install
```

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo Vite (HMR). URL habitual: `http://localhost:5173`. |
| `npm run build` | `tsc -b` (verificación de tipos) + `vite build` → salida en `dist/`. |
| `npm run preview` | Sirve la carpeta `dist/` para probar el build de producción. |
| `npm run lint` | ESLint sobre el proyecto. |

---

## Variables de entorno

Vite solo expone variables con prefijo **`VITE_`**.

| Variable | Descripción | Valor por defecto en código |
|----------|-------------|-----------------------------|
| `VITE_API_BASE_URL` | URL base del API REST (sin barra final recomendada). | `http://127.0.0.1:8000/api/v1` |

Ejemplo (archivo `.env` o `.env.local` en la raíz del proyecto):

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

Tras cambiar `.env`, reinicia `npm run dev`.

---

## Integración con el backend

### Cliente HTTP (`src/api/client.ts`)

- Instancia **Axios** con `baseURL` desde `VITE_API_BASE_URL` o el default anterior.
- Cabecera por defecto: `Content-Type: application/json`.
- **Interceptor de petición:** si existe `localStorage.getItem("token")`, añade `Authorization: Bearer <token>` a todas las peticiones hechas con `apiClient`.

### Autenticación (`src/services/authService.ts`)

- **`login({ folio, password })`** → `POST /auth/login` (ruta relativa al `baseURL`).
- Respuesta esperada (tipo actual): JSON con **`token`** (string).

Si el backend usa otra ruta o nombres de campos (`access_token`, etc.), hay que alinear `authService.ts` y los tipos.

### CORS

El servidor API debe permitir el origen del front en desarrollo (p. ej. `http://localhost:5173`) y los métodos/cabeceras que uses.

---

## Enrutamiento (`src/App.tsx`)

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `LoginPage` | Inicio de sesión (folio + contraseña). |
| `/aviso-de-privacidad` | `PrivacyNoticePage` | Aviso de privacidad; flujo previo al registro. |
| `/registro` | `RegisterPage` | Placeholder del formulario de registro. |

Router: **`BrowserRouter`** (histórico HTML5). En despliegues bajo subruta, configurar `basename` en `BrowserRouter` y `base` en Vite si aplica.

---

## Estructura del código (`src/`)

```
src/
├── api/
│   └── client.ts              # Axios + interceptor Bearer
├── components/
│   ├── layout/
│   │   ├── InstitutionalHeader.tsx
│   │   └── InstitutionalFooter.tsx
│   ├── LoginForm.tsx
│   └── UadySeal.tsx
├── lib/
│   └── safeArea.ts            # Estilos inline safe-area (notch)
├── pages/
│   ├── LoginPage.tsx
│   ├── PrivacyNoticePage.tsx
│   └── RegisterPage.tsx
├── services/
│   └── authService.ts
├── App.tsx
├── main.tsx
└── index.css                  # Tailwind + capa @layer (componentes .uady-*, .login-*)
```

**Assets estáticos** (servidos en la raíz del sitio): carpeta **`public/`**.

| Ruta pública | Uso |
|--------------|-----|
| `/images/uady-escudo.png` | Escudo UADY (cabecera; fallback texto “UADY”). |
| `/images/login-hero.jpg` | Opcional; en diseños anteriores se usaba como fondo (actualmente el login principal no depende de ella). |

---

## Estilos y diseño

- **Tailwind** (`tailwind.config.js`): colores `uady.*`, sombras, fuentes `display` / `serif`, utilidad de rejilla `bg-grid-light` + `bg-grid`.
- **`index.css`:** variables CSS `:root` (`--primary`, `--secondary`, `--accent`, `--bg`) y componentes con colores hex explícitos (`.uady-btn`, `.uady-alert`, `.login-input-shell`, etc.) para compatibilidad y contraste con el reset de formularios.
- Layout responsive y **safe areas** en páginas principales vía `safeAreaStyle`.

---

## Build y despliegue

- Salida de producción: **`dist/`** (HTML, JS y CSS empaquetados y con hash en nombres de archivo).
- Cualquier servidor estático o CDN puede servir `dist/`; para SPA, las rutas deben **redirigir al `index.html`** (fallback) para que React Router resuelva rutas como `/aviso-de-privacidad`.

Ejemplo conceptual (nginx):

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Calidad de código

- TypeScript en modo estricto razonable (`noUnusedLocals`, `noUnusedParameters`, etc.).
- ESLint configurado en `eslint.config.js` (no duplicado aquí; ver archivo en el repo).

---

## Licencia y uso

Proyecto **privado** (`"private": true` en `package.json`). Uso institucional UADY.

---

## Referencias

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
