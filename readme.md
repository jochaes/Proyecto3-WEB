# Proyecto 3

¡Bienvenido al Proyecto 3! Este repositorio contiene tanto el backend como el frontend de la aplicación. Antes de comenzar, asegúrate de seguir estos pasos iniciales:

### Configuración inicial
Si es la primera vez que trabajas en este proyecto, ejecuta el siguiente comando tanto en el directorio del backend como en el del frontend para instalar las dependencias necesarias:

$ npm i

### Ejecución local

#### Backend
Desde la consola, ve al directorio del backend y ejecuta el siguiente comando para iniciar el servidor local:

$ npm run dev

Esto inicializa el backend en el puerto 3001.

#### Frontend
Una vez que el backend esté en funcionamiento, dirígete al directorio de formularios desde la consola y ejecuta:

$ vue serve

Esto inicia el servidor del frontend en el puerto 3006.

### Deploy del Full Stack

#### 1. Backend
Para desplegar el backend, dirígete al dashboard de Render y realiza un deploy manual. Esto desplegará la última versión del commit.

#### 2. Frontend
Para desplegar el frontend, sigue estos pasos:

##### 2.1 Crear el build
En el directorio de formularios, ejecuta el siguiente comando para crear el build y actualizar la carpeta 'dist':

$ npm run build

##### 2.2 Desplegar en Firebase
Despliega la aplicación en el hosting de Firebase ejecutando:

$ firebase deploy

Esto toma la carpeta 'dist' generada en el paso anterior y la sube al hosting de Firebase.

¡Listo! Tu aplicación Full Stack está ahora desplegada y lista para ser utilizada. ¡Gracias por ser parte de este proyecto!
