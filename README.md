# TP Tecnologías Web — Frontend (Angular + Deploy)

**Entrega 2 del TP Especial** de la materia Tecnologías Web (TUARI - UNICEN).

Single Page Application en Angular que consume la API REST del backend (NestJS) para
administrar **bandas** y **géneros musicales** (relación 1 a N).

## Deploys

| Parte | URL |
|---|---|
| **Frontend** (Netlify) | https://courageous-dango-2e1b41.netlify.app |
| **Backend** (Render) | https://tp-tecweb-backend.onrender.com |

- El sitio de Netlify se conecta al repositorio y se **redeploya solo con cada push a `main`**.
- El backend de Render usa el plan gratuito, que **duerme el servicio por inactividad**: la
  primera petición puede tardar hasta ~40 segundos. La app muestra un estado de carga
  ("Cargando…") mientras espera, y los errores del backend se muestran al usuario como alertas.

## Overview

El proyecto consume los endpoints del backend para mostrar dos entidades con relación 1:N
(Género → Banda):

- **Género**: clasificación de tipo musical (ej. Rock, Metal, Pop).
- **Banda**: artista con sus campos (nombre, país, año de formación, género).

La aplicación es una SPA construida con Angular 20 usando NgModules (estándar de la cátedra),
Bootstrap 5 para el diseño responsive y formularios Template-Driven.

### Funcionalidades

- CRUD completo de **géneros** y **bandas**, mostrando la relación 1 a N (cada banda muestra su
  género como badge y el formulario lo elige con un `<select>`).
- **Filtro de bandas por género** en el listado: un `<select>` con "Todos los géneros" que
  consulta `GET /bandas?generoId=` y actualiza la tabla sin recargar la página. El badge muestra
  el total y aclara cuando está filtrado, y hay un mensaje propio para el caso sin resultados.
- Manejo de errores del backend como alertas, validación de formularios y estado de carga
  mientras la API responde.

## Levantamiento del Proyecto

El frontend necesita correr sobre el backend de la Primera Entrega. Seguí estos pasos:

### 1. Levantar el backend

Entrá al repositorio del backend (tp-tecweb-backend) y seguí sus instrucciones de despliegue
local. Normalmente:

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

> **Importante**: en desarrollo (`npm start`) la URL de la API se toma de
> `src/environments/environment.development.ts` (`http://localhost:3000`). Si el backend corre
> en otro puerto, hay que actualizar ese archivo. En producción se usa
> `src/environments/environment.ts`, que ya apunta a Render.

### 3. Build de producción

```bash
npm run build
```

Los archivos compilados quedan en `dist/tp-tecweb-frontend` (la salida está aplanada en
`angular.json`, sin subcarpeta `browser`). Ese directorio es el que publica Netlify.

## Deploy en Netlify

- **Build command**: `npm run build`
- **Publish directory**: `dist/tp-tecweb-frontend`
- **SPA**: `public/_redirects` contiene `/* /index.html 200` (también declarado en
  `netlify.toml`), así refrescar en una ruta interna como `/generos` no devuelve 404.

## Endpoints Consumidos (Backend v1)

Base en producción: `https://tp-tecweb-backend.onrender.com`

| Método | Endpoint | Descripción |
|---|---|---|
| GET /generos | Listado de todos los géneros | |
| POST /generos | Crear un nuevo género | |
| PUT /generos/:id | Editar un género | |
| DELETE /generos/:id | Borrar un género | |
| GET /bandas | Listado de bandas (con filtro opcional `?generoId=`, usado por el filtro de la UI) | |
| POST /bandas | Crear una nueva banda | |
| PUT /bandas/:id | Editar una banda | |
| DELETE /bandas/:id | Borrar una banda | |

## Estructura Importante

```
/src
  /app          ← Módulo principal y componentes
    /bandas     ← Componente CRUD de bandas
    /generos    ← Componente CRUD de géneros
    /services   ← Servicios HTTP (BandasService, GenerosService)
    /models     ← Interfaces Banda, BandaPayload, Genero
  /environments ← environment.ts (producción) y environment.development.ts (desarrollo)
/angular.json   ← Configuración del CLI (Bootstrap 5, salida del build, budgets)
/public         ← Archivos estáticos; contiene _redirects para Netlify
/netlify.toml   ← Build y redirecciones del deploy
```

## Scripts Disponibles

| Script | Descripción |
|---|---|
| npm install | Instala dependencias (incluye Bootstrap 5) |
| npm start | Inicia `ng serve` en http://localhost:4200 |
| npm run build | Compila producción en `dist/tp-tecweb-frontend` |
| npm test | Ejecuta los tests unitarios (`ng test`, Karma + Jasmine) |

## Dependencias Clave

- **Angular 20.3** — framework
- **Bootstrap 5.3** — estilo y grilla responsive (cargado desde `angular.json`)
- **RxJS 7.8** — programación reactiva
- **Zone.js** — detección de cambios

> **Nota**: no se usan Reactive Forms ni NgRx. El proyecto usa Template-Driven Forms
> (`[(ngModel)]` + `FormsModule`), como indica la consigna.

## Posibles Problemas

| Problema | Causa | Solución |
|---|---|---|
| ERR_CONNECTION_REFUSED | El backend no está corriendo | Levantar tp-tecweb-backend |
| La primera carga tarda ~40 s | El backend de Render estaba dormido | Es normal en el plan gratis; esperar el estado de carga |
| No provider found for _HttpClient | El TestBed no tiene `provideHttpClient()` | Los tests ya lo incluyen junto con `provideHttpClientTesting()` |
| Estilos no aparecen al recargar | `ng serve` no recarga `angular.json` | Detener y reiniciar `npm start` (Ctrl+C) |
| 404 al refrescar /bandas en Netlify | Falta `_redirects` | Ya está en `public/_redirects` con `/* /index.html 200` |
| Los tests no arrancan | No encuentra el binario de Chrome | Instalar Chrome o definir `CHROME_BIN` (ej. apuntando a Edge) |

## Entrega

- **Repositorio frontend**: https://github.com/germancondinanzo/tp-tecweb-frontend
- **Repositorio backend**: https://github.com/germancondinanzo/tp-tecweb-backend
- **Frontend deployado**: https://courageous-dango-2e1b41.netlify.app
- **Backend deployado**: https://tp-tecweb-backend.onrender.com

Hecho con Angular 20, Bootstrap 5 y TypeScript.
