# Proyecto GraphQL con Arquitectura Hexagonal
Este proyecto implementa una API GraphQL utilizando la arquitectura hexagonal. Se trata de una aplicación de lista de tareas (ToDo List) en la que los usuarios pueden gestionar varias listas de tareas y elementos de la lista. El proyecto está desarrollado en TypeScript y utiliza SQLite como base de datos.

## Estructura del Proyecto
El proyecto sigue la arquitectura hexagonal y se organiza en las siguientes carpetas:

```css.
└── src
    ├── domain
    │   ├── interfaces
    │   │   ├── IToDoItemRepository.ts
    │   │   ├── IToDoListRepository.ts
    │   │   └── IUserRepository.ts
    │   └── models
    │       ├── ToDoItem.ts
    │       ├── ToDoList.ts
    │       └── User.ts
    ├── infrastructure
    │   ├── database
    │   │   ├── entities
    │   │   │   ├── ToDoItemEntity.ts
    │   │   │   ├── ToDoListEntity.ts
    │   │   │   └── UserEntity.ts
    │   │   └── repositories
    │   │       ├── ToDoItemRepository.ts
    │   │       ├── ToDoListRepository.ts
    │   │       └── UserRepository.ts
    │   └── graphql
    │       ├── resolvers
    │       │   ├── ToDoItemResolver.ts
    │       │   ├── ToDoListResolver.ts
    │       │   └── UserResolver.ts
    │       └── types
    │           ├── ToDoItemType.ts
    │           ├── ToDoListType.ts
    │           └── UserType.ts
    ├── main
    │   ├── config
    │   │   ├── apollo-server.ts
    │   │   └── app.ts
    │   │   └── sqliteConfig.ts
    │   └── provider
    │       └── HashProvider.ts
    │       └── IHashProvider.ts
    │       └── ILogger.ts
    │       └── Logger.ts
    └── server.ts

```


## Instalación
1. Asegúrate de tener instalado Node.js (versión 18 o superior) y npm (versión 6 o superior).
2. Clona el repositorio y navega al directorio del proyecto.
3. Ejecuta npm install para instalar las dependencias del proyecto.
4. Configura un archivo .env en la raíz del proyecto con las variables de entorno necesarias (por ejemplo, la cadena de conexión de la base de datos).
5. Ejecuta npm run dev para iniciar el servidor de desarrollo.

## Uso
La API GraphQL está disponible en la ruta /graphql del servidor. Puedes utilizar una herramienta como GraphQL Playground o Postman para enviar consultas y mutaciones a la API.

## Docker
El proyecto incluye archivos de configuración de Docker para ejecutar la aplicación y la base de datos en contenedores. Para utilizar Docker:

Instala Docker y Docker Compose.
Ejecuta docker-compose up -d para iniciar los contenedores.
La API estará disponible en la ruta /graphql del servidor expuesto por Docker.