# SIPI Posgrados — Frontend (v2)

Cliente web del **Sistema de Información para Posgrado (SIPI)** de la Universidad Autónoma de Yucatán (UADY). Aplicación **React** con **TypeScript**: acceso institucional, **registro rápido**, login con **correo y contraseña**, y pantalla para **completar el registro** tras iniciar sesión.

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

- **Inter** (variable) — texto base y titulares (`font-sans`, `font-display`).
- **Source Serif 4** — nombre de la universidad en cabecera (`font-serif`).
- **Source Sans Pro** — línea de coordinación en cabecera (`font-coordination`).

**Cabecera institucional:** escudo en `src/assets/images/esc3.png` (importado en `InstitutionalHeader`).

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
|----------|-------------|------------------------------|
| `VITE_API_BASE_URL` | URL base del API REST (sin barra final recomendada). | `http://127.0.0.1:8000/api/v1` |

Ejemplo (archivo `.env` o `.env.local` en la raíz del proyecto):

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

Tras cambiar `.env`, reinicia `npm run dev`.

---

## Integración con el backend

### Cliente HTTP (`src/api/client.ts`)

- Instancia **Axios** con `baseURL` desde `VITE_API_BASE_URL` o el valor por defecto (incluye **`/api/v1`**).
- Cabecera por defecto: `Content-Type: application/json`.
- **Interceptor de petición:** si existe `localStorage.getItem("token")`, añade `Authorization: Bearer <token>` a todas las peticiones hechas con `apiClient`.

### Autenticación (`src/services/authService.ts`)

- **`register({ identity_type, identity_value, email, phone })`** → `POST /auth/register` (registro rápido; **no** devuelve token de sesión). Respuesta tipada como **`RegisterResponse`** (`message`, `user`).
- **`login({ email, password })`** → `POST /auth/login`; respuesta con **`token`**, **`message`** y **`user`** (incl. `user_status`, `folio`).

### Errores HTTP (`src/lib/apiErrors.ts`)

- Funciones compartidas para mensajes de error: **`getLoginErrorMessage`**, **`getRegisterSubmitErrorMessage`**, **`parseRegisterFieldErrors422`** (validación Laravel por campo).

### Validación de registro (`src/lib/validation/register.ts`)

- Reglas de cliente y **`buildRegisterPayload`** para el registro rápido (CURP / pasaporte, correo, teléfono).

Referencia detallada del contrato API (Laravel / Sanctum): **`src/assets/docs/API_FRONTEND.md`**.

### CORS

El servidor API debe permitir el origen del front en desarrollo (p. ej. `http://localhost:5173`) y los métodos/cabeceras que uses.

---

## Flujo de usuario (resumen)

1. **Inicio (`/`):** login con correo y contraseña, o acceso al **registro rápido** embebido en la misma vista.
2. **Aviso de privacidad:** se muestra en un **modal** desde el formulario de registro (no hay ruta dedicada).
3. Tras un **registro exitoso**, se vuelve a la vista de login con un mensaje (correo de confirmación cuando el envío automático esté disponible).
4. Tras un **login exitoso**, redirección a **`/completar-perfil`** para completar la información del aspirante (requiere token).
5. **`/completar-perfil`** sin sesión redirige a `/`.

---

## Enrutamiento (`src/App.tsx`)

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `LoginPage` | Login (correo + contraseña) y registro rápido embebido. |
| `/completar-perfil` | `CompleteProfilePage` | Completar perfil / registro ampliado (requiere `token` en `localStorage`). |

Router: **`BrowserRouter`** (histórico HTML5). En despliegues bajo subruta, configurar `basename` en `BrowserRouter` y `base` en Vite si aplica.

**Rutas eliminadas respecto a versiones anteriores:** ya no existen `/aviso-de-privacidad`, `/registro` ni `/nacionalidad` (el aviso se ve en modal; el registro inicial es en la página principal).

---

## Estructura del código (`src/`)

```
src/
├── assets/
│   ├── docs/
│   │   └── API_FRONTEND.md    # Contrato API para el front (auth / registro)
│   └── images/
│       ├── esc3.png           # Escudo cabecera (UADY)
│       └── b1.jpg             # Fondo (LoginPage)
├── api/
│   └── client.ts              # Axios + interceptor Bearer
├── components/
│   ├── layout/
│   │   ├── InstitutionalHeader.tsx
│   │   └── InstitutionalFooter.tsx
│   ├── EmbeddedRegisterForm.tsx
│   ├── icons.tsx              # Íconos SVG reutilizables (login, privacidad)
│   ├── LoginForm.tsx
│   ├── PrivacyNoticeContent.tsx
│   └── PrivacyNoticeModal.tsx
├── hooks/
│   └── useRequireAuth.ts      # Redirección si no hay token (rutas protegidas)
├── lib/
│   ├── apiErrors.ts           # Mensajes y 422 Laravel (login / registro)
│   ├── currentYear.ts
│   ├── safeArea.ts            # Estilos inline safe-area (notch)
│   └── validation/
│       └── register.ts        # Validación cliente registro rápido
├── pages/
│   ├── CompleteProfilePage.tsx
│   └── LoginPage.tsx
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
| `/images/login-hero.jpg` | Opcional; diseños anteriores (el login actual usa imagen importada desde `src/assets`). |

---

## Estilos y diseño

- **Tailwind** (`tailwind.config.js`): colores `uady.*`, sombras, fuentes `display` / `serif`, utilidad de rejilla `bg-grid-light` + `bg-grid`.
- **`index.css`:** variables CSS `:root` (`--primary`, `--secondary`, `--accent`, `--bg`) y componentes con colores hex explícitos (`.uady-btn`, `.uady-alert`, `.login-input-shell`, etc.) para compatibilidad y contraste con el reset de formularios.
- Layout responsive y **safe areas** en páginas principales vía `safeAreaStyle`.

---

## Build y despliegue

- Salida de producción: **`dist/`** (HTML, JS y CSS empaquetados y con hash en nombres de archivo).
- Cualquier servidor estático o CDN puede servir `dist/`; para SPA, las rutas deben **redirigir al `index.html`** (fallback) para que React Router resuelva rutas como `/completar-perfil`.

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
