
  # MindScan - Plataforma para la Regularización del Estado Anímico ☁️✨

MindScan es una aplicación móvil diseñada para la gestión del bienestar emocional y la estabilización del ánimo de los usuarios. A través de una interfaz empática y herramientas de apoyo con inteligencia artificial, el proyecto busca transformar la salud mental digital en una experiencia de acompañamiento activo y gamificado.

Este proyecto fue desarrollado durante el segundo semestre de la **ESPOL** para la materia de **Computación y Sociedad**.

🔗 [Ver Prototipo Interactivo en Figma](https://www.figma.com/make/QZ0HWJ4nnZG6oxoyGaxp5n/MindScan-Mobile-Design?fullscreen=1&t=uu6QuRVbGuHpDbxx-1)

---

## ▶️ Correr el proyecto

Instala las dependencias:
```bash
npm i
```

Inicia el servidor de desarrollo:
```bash
npm run dev
```

---

## ✨ Características Principales

- **Regularización del Estado Anímico:** Herramientas interactivas para identificar, monitorear y estabilizar el equilibrio emocional diario.
- **Virtual Pet Growth System:** Una mascota virtual evolutiva (nube) con cuatro etapas de crecimiento: Bebé, Joven, Adulta y Campeona, cuya progresión depende de la constancia del usuario.
- **MindBot (Soporte Emocional):** Chatbot interactivo para brindar acompañamiento emocional, respuestas empáticas y mensajes motivacionales en tiempo real.
- **Sistema de Progresión Dinámico:** Visualización de misiones diarias, días activos y barras de progreso que incentivan la formación de hábitos saludables.
- **Hub de Recursos para el Bienestar:** Acceso centralizado a ejercicios de meditación guiada, respiración, un diario de pensamientos privado y un historial detallado de emociones.

---

## 🎨 Diseño y Experiencia de Usuario (UI/UX)

- **Estética Soft UI:** Paleta de colores suaves y bordes redondeados para un entorno digital libre de estrés.
- **Lógica de Estado Visual:** El ánimo de la mascota cambia dinámicamente entre "Calma" o "Angustia" según el cumplimiento de objetivos del usuario.
- **Privacidad y Ética:** Diseño centrado en la seguridad de los datos del usuario y el soporte ético a la salud mental.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React con TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui (con Radix UI)
- **Entorno de Desarrollo:** Vite
- **Diseño:** Figma

---

## 📂 Estructura del Proyecto

```
mindscan-app/
│
├── guidelines/
│   └── Guidelines.md
│
├── src/
│   └── app/
│       ├── components/
│       │   ├── ui/              # Componentes base de shadcn/ui
│       │   ├── figma/           # Utilidades de imágenes
│       │   └── [Screens].tsx    # Pantallas principales de la app
│       └── App.tsx
│   └── styles/
│
├── package.json
├── vite.config.ts
└── README.md
```

  