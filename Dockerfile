# Utiliza la imagen oficial de Node.js con la versión de Alpine (más liviana)
FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm ci

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compila el proyecto de TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que se ejecutará el servidor (en este caso, 4000)
EXPOSE 4000

# Ejecuta el comando para iniciar el servidor
CMD ["npm", "start"]