>  # Nuestra API de Computadoras




## Organización de los pasos Realizados:

- [x] ***Nuestro proyecto fue desarrollado con Node.JS + MongoDB.***

- Los ENDPOINTS agregados son los siguientes:
  - [x] MÉTODO GET:
    - URL: /computadoras
    - URL: /computadoras/:codigo
    - URL: /computadoras/:search
  - [x] MÉTODO POST:
    - URL: /computadoras
  - [x] MÉTODO PUT:
    - URL: /computadoras/codigo
  - [x] MÉTODO DELETE:
    - URL: /computadoras/codigo

- [X] Manejo de Errores Por cada endpoint,



## Tabla de Endpoints

| Método | Endpoint | Descripción |
|----------|----------|----------|
| GET    | [/computadoras](http://localhost:3000/computadoras)   | Primeramente conecta con MongoDB. Luego por medio del método find() interactúa con MongoDB, realiza la búsqueda en nuestra base de datos desde nuestra colección ya cargada previamente, una vez que obtiene los elementos encontrados, se desconecta MongoDB y a través del método toArray() nos muestra por pantalla como resultado la lista array en modo json de las computadoras. |
| GET    |  [/computadoras/:codigo](http://localhost:3000/computadoras/codigo/4)  | describir   |
| GET    |  [/computadoras/:search](http://localhost:3000/computadoras/search/moni)  | describir   |
| POST    |   [/computadoras](https://www.../) | describir   |
| PUT    |   [/computadoras/:codigo](https://www.../) | describir   |
| DELETE    |  [/computadoras/:codigo](https://www.../)  | describir   |


## Pasos visuales de los endpoints.

1. Ruta Raíz.

   ![](/src/views/1.%20ruta%20raiz.png)

2. Lista todas las computadoras en modo json.

   ![](/src/views/2.%20metodo%20get.%20lista%20array%20json-computadoras.png)

3.  Muestra la búsqueda de computadora por su código.

   ![](/src/views/3.%20metodo%20get.%20busca%20computadora%20por%20su%20codigo.png)

4.  Muestra la búsqueda parcial, por letra ó palbra entre el nombre ó la descripción.

   ![](/src/views/4.%20metodo%20get.%20search%20-%20busca%20parcial,%20por%20letra,%20y%20palabra%20del%20contenido%20de%20nombre%20o%20descripcion.png)

5.  Muestra cuando se agrega una nueva computadora.

   ![](/src/views/5.%20metodo%20post.%20agrega%20nueva%20computadora.png)