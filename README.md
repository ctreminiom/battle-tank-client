Proyecto #1 - Servicios Web
===================


Este repositorio contiene un servidor web express, cuyo objetivo se consumir la API del Battle-Tanks y mostrar el funcionamiento del juego.


----------

Requerimientos
-------------


> **Paquetes utilizados:**

> - **express** ---> Web Server
> - **pug** ----> Motor de plantillas
> - **request** ---> Realizar GET, POST, PUT al server

#### <i class="icon-file"></i> Funcionamiento


Este servidor web consume el API para interpretar los datos suministrados para mostrar como se juega automaticamente.

El juego utiliza **Canvas** mediante la utilizacion de una libreria llamada **Phaser.io**. Dicha libreria facilita la creacion de videojuegos y modulariza las funciones principales, tales como, disparar, moverser, la utilizacion de la fisica para los obstaculos, entre otras cosas. 

![enter image description here](https://lh3.googleusercontent.com/-Uma2dAYpXy4/WhJxSYv4m9I/AAAAAAAAjDE/_56CIXQctdAS2yikDPg9RfYe-KNRpDnNACLcBGAs/s0/0.png)

Toda la logica del juego la maneja el servidor, funcionalidades como, marcadores, coordenadas, validaciones las maneja al API. Tambien para interpretar las instrucciones del servidor, el cliente realiza llamadas **AJAX** al servidor, pero las llamadas se hacen indirectamente. Esto se debe porque el llamado **AJAX** se hace a un endpoint que esta en el servidor, dicho endpoint realiza la peticion **POST, GET, PUT, DELETE** al servidor.

![enter image description here](https://lh3.googleusercontent.com/-rRUmsJHKpck/WhJybu4f3AI/AAAAAAAAjDU/ZE007DiOzMg6V1qCjqg6VJ0BHC96RYhMwCLcBGAs/s0/00.png)


----------

![enter image description here](https://lh3.googleusercontent.com/-J4djn_KxBrk/WhJyoy7z1xI/AAAAAAAAjDc/DqzZeQc_bcA3YzLxxhfayVaORrtIm-vnQCLcBGAs/s0/Screenshot+at+2017-11-20+00-13-37.png)


#### <i class="icon-pencil"></i> Instalacion

> **Paso #1** --> git clone https://github.com/ctreminiom/battle-tank-client.git
> **Paso #2** --> npm install
> **Paso #3** --> npm start