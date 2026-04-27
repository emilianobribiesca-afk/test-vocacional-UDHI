# Test Vocacional UDHI

Aplicación web de orientación vocacional para la Universidad de Dolores Hidalgo (UDHI). Aplica un instrumento basado en el modelo RIASEC de Holland y entrega al alumno un perfil personalizado junto con las carreras de UDHI más afines.

---

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** en modo `strict`
- **Tailwind CSS 4**
- **Resend** para envío de correo transaccional

---

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Cuenta de Resend con API key (para envío de correos)
- Dominio verificado en Resend para el remitente

---

## Instalación

```bash
git clone https://github.com/emilianobribiesca-afk/test-vocacional-UDHI.git
cd test-vocacional-UDHI
npm install
```

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz con las siguientes variables:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=https://testvocacionaludhi.com
```

| Variable | Requerida | Descripción |
|---|---|---|
| `RESEND_API_KEY` | Sí | Clave de Resend usada por la ruta `/api/send-results` para enviar el correo al call center. |
| `NEXT_PUBLIC_BASE_URL` | Sí | URL pública del sitio. Se usa para generar el enlace firmado de resultados que se incluye en el correo. |

> Nota: nunca commitees `.env.local`. Está incluido en `.gitignore`.

---

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:3000`. |
| `npm run build` | Compila la aplicación para producción. |
| `npm start` | Inicia el servidor de producción (requiere `build` previo). |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto. |

---

## Estructura del proyecto

```
test-vocacional-udhi/
├── app/
│   ├── api/
│   │   └── send-results/      Endpoint POST que valida y envía el correo
│   ├── register/              Formulario de registro y consentimiento
│   ├── instructions/          Instrucciones previas al test
│   ├── test/                  Aplicación del cuestionario (80 reactivos)
│   ├── results/               Resultados, hexágono RIASEC y carreras
│   ├── thanks/                Pantalla de agradecimiento final
│   ├── email-preview/         Vista previa del correo (uso interno)
│   ├── layout.tsx             Layout raíz
│   └── globals.css            Estilos globales (Tailwind)
├── lib/
│   ├── professionalVocationalTestV3.ts   Banco de reactivos y motor de scoring
│   ├── udhiCareers.ts                    Catálogo de carreras y matching
│   └── emailTemplate.ts                  Plantilla HTML del correo al asesor
├── public/                    Assets estáticos (logo, favicon, etc.)
└── package.json
```

---

## Flujo del usuario

1. **Registro** (`/register`) — el aspirante captura nombre, apellido, correo y teléfono, y otorga consentimiento explícito para el uso de sus datos.
2. **Instrucciones** (`/instructions`) — explicación de la mecánica del test, escala de respuesta y duración estimada.
3. **Test** (`/test`) — 80 reactivos en escala Likert de 1 a 5, con barra de progreso y navegación bidireccional.
4. **Envío** — al finalizar, los resultados se envían al endpoint `/api/send-results`, que valida el payload, aplica el algoritmo de matching y dispara un correo al call center con un enlace al perfil completo.
5. **Agradecimiento** (`/thanks`) — confirmación al alumno de que un asesor lo contactará.

---

## Algoritmo

El instrumento se basa en el modelo **RIASEC de Holland**, ampliamente validado en orientación vocacional:

- **80 reactivos** (72 evaluativos + 8 de control de validez)
- **6 dimensiones**: Realista, Investigativo, Artístico, Social, Emprendedor, Convencional
- **Escala Likert** de 5 puntos
- **Validación interna**: control de respuestas inconsistentes, patrones planos, items de baja frecuencia y respuesta dirigida
- **Matching de carreras**: combinación ponderada del **C-Index** (Brown & Gore, 1991) y similitud coseno sobre el perfil completo

Las 20 carreras de UDHI están perfiladas con su código Holland y se rankean según afinidad con el perfil del aspirante.

---

## Seguridad y privacidad

- El endpoint `/api/send-results` valida tipo y longitud de cada campo, y sanitiza saltos de línea para prevenir inyección de cabeceras en el correo.
- El consentimiento del aspirante se valida tanto en cliente como en servidor; sin él, la solicitud es rechazada.
- Los datos personales se transmiten una sola vez al call center y no se persisten en base de datos.
- El enlace de resultados que recibe el asesor codifica los puntajes en `base64url` sobre la URL.

---

## Despliegue

El proyecto está optimizado para **Vercel**. Cualquier `push` a `main` despliega automáticamente si el repositorio está conectado.

Pasos para un despliegue manual:

```bash
npm run build
npm start
```

Recordar configurar `RESEND_API_KEY` y `NEXT_PUBLIC_BASE_URL` en el panel de variables de entorno del proveedor.

---

## Licencia

Propietario — Universidad de Dolores Hidalgo (UDHI). Todos los derechos reservados.
