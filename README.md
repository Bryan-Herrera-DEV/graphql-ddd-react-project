# MTC Test
Este proyecto consiste en una aplicación web con una carpeta front-end construida con React y una carpeta back-end construida con Node y TypeScript.

Se basa en codigo limpio y buenas practicas de programacion asi como tambien arquitectura de software escalable.

A continuación, se presentan los pasos para instalar correctamente el proyecto en un ambiente local.

## Prerrequisitos
Antes de comenzar, asegúrese de tener los siguientes requisitos instalados en su computadora:

Node.js (versión 16 o superior)
npm (viene incluido con Node.js)

## Instalación
Clone el repositorio del proyecto en su computadora:
```sh
git clone https://github.com/Bryan-Herrera-DEV/mtc-ecuador-test
```
### Instalación del back-end
Para ejecutar el back-end, vuelva a la carpeta principal del proyecto y luego a la carpeta backend:

Instale las dependencias del back-end con npm:

```sh
npm install
```

Una vez finalizada la instalación levantar el servidor de Node.js:
```sh
npm run dev
```
El servidor estará disponible en la dirección http://localhost:4000.


### Instalación del front-end
Navegue a la carpeta del proyecto y luego a la carpeta front:
```sh
cd nombre-del-repositorio/front
```
Instale las dependencias del front-end con npm:
```sh
npm install
```
Una vez finalizada la instalación, inicie la aplicación front-end:

```sh
npm run dev
```
Abra un navegador web y vaya a la dirección http://localhost:3000 para ver la aplicación.


## Docker
El proyecto incluye archivos de configuración de Docker para ejecutar la aplicación y la base de datos en contenedores. Para utilizar Docker:

Instala Docker y Docker Compose.
Ejecuta:
```sh
docker-compose build
docker-compose up
```

El servidor de Node.js estará disponible en la dirección http://localhost:4000 y el front-end en http://localhost:3000.
La API estará disponible en la ruta /graphql del servidor expuesto por Docker.

