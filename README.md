# Radio Lele 🎵

Una aplicación de radio vintage con display de karaoke interactivo, construida con React, TypeScript y Tailwind CSS.

## 🚀 Características

- **Radio Vintage**: Interfaz realista con diseño retro
- **Sintonización Interactiva**: Gira el dial para encontrar la frecuencia correcta
- **Control de Volumen**: Ajusta el volumen con el knob interactivo
- **Display de Karaoke**: Muestra las letras sincronizadas con la música
- **Efectos de Audio**: Ruido blanco cuando no está sintonizado correctamente
- **Animaciones Suaves**: Transiciones fluidas con Framer Motion

## 📋 Requisitos Previos

- Node.js 18+ 
- npm, yarn o pnpm

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd "Radio Lele"
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

## 🎮 Uso

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🏗️ Construcción

Para crear una versión de producción:

```bash
npm run build
# o
yarn build
# o
pnpm build
```

Los archivos se generarán en la carpeta `dist`.

## 📁 Estructura del Proyecto

```
Radio Lele/
├── Components/          # Componentes React
│   ├── radio/          # Componentes específicos de la radio
│   └── ui/             # Componentes UI reutilizables
├── Pages/              # Páginas de la aplicación
├── hooks/              # Custom hooks
├── lib/                # Utilidades y helpers
├── src/                # Archivos de entrada
└── public/             # Archivos estáticos
```

## 🎨 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animaciones
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos

## 📝 Notas

- Asegúrate de tener un archivo `musica.mp3` en la carpeta `public` para que la radio funcione correctamente.
- El proyecto está configurado para usar path aliases (`@/`) para importaciones más limpias.
- Desplegado en Vercel con configuración optimizada para aplicaciones SPA.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
