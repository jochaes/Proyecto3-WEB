Proyecto 3 


*** Si es la primera vez, debe hacer 
  $npm i 
*** Tanto en el backend como en el frontend


Para Ejecutar Localmente:
  *Desde consola ir al directorio backend y ejecutar: 

  $npm run dev 

  Esto inicializa el backedn en el puerto 3001

  *Con el backend ya inicializado, inicialicar la aplicación VUE
  En consola ir al directorio de formularios 
  y ejecutar con:

  $vue serve

  Esto inicializa el server del frontend en el puerto 3006


Para hacer deploy del full stack 

1. Backend: 
  Ir al dashboard de render y hacer un deploy manual (Se hace deploy del último commit)

2. frontend

  Ir al directorio de formularios 
  2.1 Crear el build con npm buil, esto actualiza la carpeta dist
    $npm build 
  
  2.2 Desplegar la aplicacion en el hosting de firebase (Esto toma el dist y lo sube)
    $firebase deploy




