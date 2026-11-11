# TP Tecnologias Web - Frontend (Angular + Deploy)

## Descripcion

Este es el Trabajo Práctico de la materia Tecnologías Web, backend NestJS + frontend Angular. Segunda entrega.

## Overview

El proyecto consume los endpoints del backend para mostrar dos entidades con relacion 1:N (Genero -> Banda):

- **Genero**: Clasificación de tipo musical (ej. Rock, Metal, Pop).
- **Banda**: Artista con sus campos (nombre, país, año de formación, género).

La aplicación es una Single Page Application (SPA) construida con Angular 20 usando NgModules (estándar de la cátedra), Bootstrap 5 para el diseño responsive y Formularios Template-Driven.

## Levantamiento del Proyecto

El frontend necesita correr sobre el backend de la Primera Entrega. Seguí estos pasos:

### 1. Levantar el backend

Entrá al repositorio del backend (tp-tecweb-backend) y seguí sus instrucciones de despliegue local. Normalmente:

```bash
cd tp-tecweb-backend
npm install
npm run start:dev
```

El backend correrá en http://localhost:3000 (puerto configurable).

### 2. Levantar el frontend

```bash
cd tp-tecweb-frontend
npm install
npm start
```

La app estará disponible en http://localhost:4200/.

> **Importante**: El frontend realiza peticiones HTTP al backend en localhost:3000. Si el backend corren en otro puerto, hay que actualizar el environment.ts.

### 3. Build de producción

```bash
npm run build
```

Los archivos compilados quedan en dist/tp-tecweb-frontend/browser. Ese directorio es el que se sube a Netlify.

## Endpoints Consumidos (Backend v1)

| Método | Endpoint | Descripción |
|---|---|---|
| GET /generos | Listado de todos los géneros |
| POST /generos | Crear un nuevo género |
| PUT /generos/:id | Editar un género |
| DELETE /generos/:id | Borrar un género |
| GET /bandas | Listado de bandas (con filtro opcional ?generoId=) |
| POST /bandas | Crear una nueva banda |
| PUT /bandas/:id | Editar una banda |
| DELETE /bandas/:id | Borrar una banda |

## Estructura Importante

```
/src
  /app          ← Módulo principal y componentes
    /bandas     ← Componente CRUD de bandas
    /generos    ← Componente CRUD de géneros
    /services   ← Servicios HTTP (BandasService, GenerosService)
    /models     ← Interfaces Banda, BandaPayload, Genero
  /environments ← environment.ts (dev) y environment.prod (deploy)
/angular.json   ← Configuración del CLI (Bootstrap 5, budgets)
/public         ← Archivos estáticos; contiene _redirects para Netlify
```

## Scripts Disponibles

| Script | Descripción |
|---|---|
| npm install | Instala dependencias (incluye Bootstrap 5) |
| npm start | Inicia ng serve en http://localhost:4200 |
| npm build | Compila producción (dist/tp-tecweb-frontend/browser) |
| npm test | Ejeciona ng test (Karma + Jest) |

## Dependencias Clave

- **Angular 20.3.35** — framework
- **Bootstrap 5.3.8** — estilo y responsive grid (cargado desde angular.json)
- **RxJS 7.8.0** — programación reactiva
- **Zone.js** — detección de cambios

> **Nota**: No se usan Reactive Forms ni NgRx. El proyecto usa Template-Driven Forms ((ngModel), ngModel, forms) tal como indica la consigna.

## Posibles Problemas

| Problema | Causa | Solución |
|---|---|---|
| ERR_CONNECTION_REFUSED | El backend no está corriendo | Levantar tp-tecweb-backend |
| No provider found for _HttpClient | El TestBed no tiene provideHttpClient() | Los tests ya incluyen provideHttpClientTesting() |
| Estilos no aparecen al recargar | ng serve no recarga angular.json | Detener y reiniciar ng serve (Ctrl+C + npm serve) |
| 404 al refrescar /bandas en Netlify | Falta _redirects | Ya está en public/_redirects con /* /index.html 200 |

## Contacto / Entrega

- **Repositorio frontend**: https://github.com/germancondinanzo/tp-tecweb-frontend
- **Repositorio backend**: https://github.com/germancondinanzo/tp-tecweb-backend
- **Autor**: Trabajo Práctico - Tecnologías Web (TUARI - UNICEN)

Hecho con Angular 20, Bootstrap 5 y TypeScript.