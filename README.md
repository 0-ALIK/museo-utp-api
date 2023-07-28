# Museo Interactivo UTP - API REST

¡Bienvenido al repositorio del API del Museo Interactivo UTP! Este proyecto tiene como objetivo desarrollar el API del museo interactivo para la Universidad Tecnológica de Panamá, utilizando tecnologías como Node.js y Express.

<div style="display: flex">
<img src="https://utp.ac.pa/documentos/2015/imagen/logo_utp_1_72.png" 
    alt="Texto alternativo" 
    style="width: 200px; height: 100px;">
<img src="https://fisc.utp.ac.pa/sites/fisc.utp.ac.pa/files/documentos/2020/imagen/logo_en_contactenos.png" 
    alt="Texto alternativo" 
    style="width: 200px; height: 100px;">
</div>

## Equipo de Desarrollo

Este proyecto está siendo desarrollado por el equipo de desarrollo del departamento de API del proyecto, compuesto por los siguientes miembros:

- Flavio Sánchez (ALIK)
- Gustavo Leoteau
- José Liao
- Yunier Yau

## Tecnologías Utilizadas

- Node.js
- Express
- Jest
- Otros paquetes y librerías que pueden verse a detalle en `package.json`

## Documentación

* [Login y auth](#login-autenticación)
* [Usuarios](#usuarios)
* [Carreras y facultades](#facultades-y-carreras)
* [Categorias](#categorias)
* [Visitas](#visitantes)
* [Artículos](#articulos)
* [Comentarios](#comentarios)

Para empezar a utilizar el API, realizar la instalación de todas las dependencias del proyecto, ejecute el siguiente comando en la raíz del proyecto:

```
npm i
```

Crear un archivo llamado `.env` para colocar las variables de entorno

Las variables que el proyecto esta utilizando son las siguientes: 

```
# Puerto del servidor
PORT =

# Credenciales para la base de datos principal (MySQL)
DB_HOST =
DB_PORT =
DB_NAME =
DB_USER =
DB_PASS =

# Json Web Token
JWT_SECRET =

# Credenciales para FireStorage uwu
FIREBASE_API_KEY = 
FIREBASE_AUTH_DOMAIN = 
FIREBASE_PROJECT_ID = 
FIREBASE_STORAGE_BUCKET = 
FIREBASE_MESSAGING_SENDER_ID = 
FIREBASE_APP_ID = 
FIREBASE_MEASURAMENT_ID = 
```

Agregar esas variables al archivo `.env` usted debe encargarse de colocarle el valor a cada una

## LOGIN (Autenticación)
---
---

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/auth/login

Iniciar sesión, Mantener sesiones será importante para un usuario ya que esto permitirá tener un registro de los artículos que ha visitado 

Será incluso más útil para los administradores ya que en la **web administrativa** habrá aún más funcionalidades que requerirán de autenticación 

#### Body data (application/json)

| Data | Validaciones |
| ------------ | ------------ |
| `nombre_usuario` - *obligatorio* | Aqui no hay ninguna |
| `password` - *obligatorio* | Aqui no hay ninguna |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando los datos del usuario logueado junto con su token de sesión además de un código de status *200*

Importante, este token debe ser almacenado ya sea en el localStorage, una cookie o un sharedpreferences, ya que es necesario para poder utilizar otros endpoint que requieren `AUTH`

```json
{
    "token": "...",
    "usuario": {
        "id": "...",
        "usuario": "...",
        "rol": "...",
        "created_at": "...",
        "updated_at": "...",
        ...
    }
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/auth

Permite validar el token de sesión y obtener los datos del usuario ligado al token

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario |

#### Ejemplo de respuesta (application/json)

Responde enviado al usuario al que pertenece el token de sesión enviado en el header

```json
{
    "id": "...",
    "usuario": "...",
    "rol": "...",
    "created_at": "...",
    "updated_at": "...",
    ...
}
```

---
---
## FACULTADES Y CARRERAS    
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/facultades/all

Obtener todas las facultades

#### Query params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `query` - *opcional* | Realizar búsqueda por su nombre | texto |

#### Ejemplo de respuesta (application/json)

```json
[
    {
        "id": "...",
        "nombre": "..."
    },
    ...
]
```

---

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/facultades `AUTH ADMIN`

Permite publicar una nueva facultad

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario |

#### Body data (application/json)

| Data | Validaciones |
| ------------ | ------------ |
| `nombre` - *obligatorio* | lenght(min: 2, max: 200) |

---

### <span style="background-color:#DA4E30; color: white; padding: 2px 5px; border-radius: 50px;">DELETE</span> /api/facultades/**{facultad id}** `AUTH ADMIN`

permite realizar la eliminación en base al id de la facultad

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario |

#### Params

| Param | Descripción | Validaciones | 
| ------------ | ------------ | ------------ |
| `facultad id` - *obligatorio* | Es el id de la facultad | numérico |

---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/carreras/all

Obtener todas las carreras

#### Query params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `query` - *opcional* | Realizar búsqueda por su nombre | texto |

#### Ejemplo de respuesta (application/json)

```json
[
    {
        "id": "...",
        "nombre": "...",
        "facultad": "..."
    },
    ...
]
```

---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/carreras/facultad/{facultad id}

Obtener todas las carreras en base al id de una facultad

#### Params

| Param | Descripción | Validaciones | 
| ------------ | ------------ | ------------ |
| `facultad id` - *obligatorio* | Es el id de la facultad de las carreras | numérico |

#### Ejemplo de respuesta (application/json)

```json
[
    {
        "id": "...",
        "nombre": "...",
        "facultad": "..."
    },
    ...
]
```

---

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/carreras `AUTH ADMIN`

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario |

#### Body data (application/json)

| Data | Validaciones |
| ------------ | ------------ |
| `nombre` - *obligatorio* | lenght(min: 2, max: 200) |
| `facultad_id` - *obligatorio* | numérico |

---

### <span style="background-color:#DA4E30; color: white; padding: 2px 5px; border-radius: 50px;">DELETE</span> /api/carreras/**{carrera id}** `AUTH ADMIN`

Permite realizar la eliminación de una carrera en base a su id

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario |

#### Params

| Param | Descripción | Validaciones | 
| ------------ | ------------ | ------------ |
| `carrera id` - *obligatorio* | Es el id de la carrera | numérico |

---
---
## CATEGORIAS
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/categorias/all

Obtener todas las categorias

#### Query params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `query` - *opcional* | Realizar búsqueda por su nombre | texto |

#### Ejemplo de respuesta (application/json)

```json
[
    {
        "id": "...",
        "nombre": "..."
    },
    ...
]
```

---

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/categorias `AUTH ADMIN`

Permite publicar una nueva categoria

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario |

#### Body data (application/json)

| Data | Validaciones |
| ------------ | ------------ |
| `nombre` - *obligatorio* | lenght(min: 2, max: 200) |

---

### <span style="background-color:#DA4E30; color: white; padding: 2px 5px; border-radius: 50px;">DELETE</span> /api/categorias/**{categoria id}** `AUTH ADMIN`

permite realizar la eliminación en base al id de la categoria

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario |

#### Params

| Param | Descripción | Validaciones | 
| ------------ | ------------ | ------------ |
| `categoria id` - *obligatorio* | Es el id de la facultad | numérico |

---
---
## USUARIOS
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/usuarios/all

Obtener todos los usuarios de tipo ESTUD de la base de datos

#### Query params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `query` - *opcional* | Realizar búsqueda por su nombre_usuario | texto |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde con un arreglo de usuarios de tipo ESTUD junto con un código de status **200**

```json
[
    {
        "id": "...",
        "usuario": "...",
        "rol": "...",
        "created_at": "...",
        "updated_at": "...",
        ...
    },
    ...
]
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px;border-radius: 50px;">GET</span> /api/usuarios/**{usuario id}**

Obtener un usuario de tipo ESTUD en específico de la base de datos a través de su ID

#### Params

| Param | Descripción | Validaciones | 
| ------------ | ------------ | ------------ |
| `usuario id` - *obligatorio* | Es el id del usuario a buscar | numérico |

#### Ejemplo de respuesta (application/json)

```json
{
    "id": "...",
    "usuario": "...",
    "rol": "...",
    "created_at": "...",
    "updated_at": "...",
    ...
}
```

Si no existe un usuario con el ID suministrado no retornará nada y responderá con código de status *404*

---

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/usuarios

Agrega un nuevo usuario en la base de datos, puede utilizarlo para realizar la pantalla de registro de usuario

#### Body data (application/json)

| Data | Validaciones |
| ------------ | ------------ |
| `nombre_usuario` - *obligatorio* | Formato de nombre de usuario (sin espacios y sin caracteres especiales), lenght(min: 2, max: 32) |
| `password` - *obligatorio* | lenght(min: 8, max: 16) |
| `nombre` - *obligatorio* | lenght(min: 2, max: 30) |
| `apellido` - *obligatorio* | lenght(min: 2, max: 30) |
| `cedula` - *obligatorio* | Formato de cédula |
| `nivel` - *obligatorio* | numérico |
| `id_facultad` - *obligatorio* | numérico |
| `id_carrera` - *obligatorio* | numérico |
| `foto` - *opcional* | File |

Los otros datos como el rol y las fechas son definidos de forma autamatica en el backend

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando los datos del usuario creados con un código de status *201*

**Importante**, el registro de usuario no genera un token de sesión, por lo tanto, una vez el usuario se registra debe hacerle iniciar sesión con su cuenta

```json
{
    "id": "...",
    "usuario": "...",
    "rol": "...",
    "created_at": "...",
    "updated_at": "...",
    ...
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#DAA330; color: white; padding: 2px 5px; border-radius: 50px;">PUT</span> /api/usuarios `AUTH ESTUD`

Actualiza los datos de un usuario, se hace en base a su token de sesión

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para realizar el UPDATE de los datos de este |

#### Body data (application/json)

| Data | Validaciones |
| ------------ | ------------ |
| `nombre` - *opcional* | Las mismas que en el post |
| `apellido` - *opcional* | Las mismas que en el post |
| `cedula` - *opcional* | Las mismas que en el post |
| `nivel` - *opcional* | Las mismas que en el post |
| `id_facultad` - *opcional* | Las mismas que en el post |
| `id_carrera` - *opcional* | Las mismas que en el post |
| `foto` - *opcional* | Las mismas que en el post |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando los datos del usuario actualizado con un código de status *200*

```json
{
    "id": "...",
    "usuario": "...",
    "rol": "...",
    "created_at": "...",
    "updated_at": "...",
    ...
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#DA4E30; color: white; padding: 2px 5px; border-radius: 50px;">DELETE</span> /api/usuarios/**{usuario id}** `AUTH ADMIN`

Elimina un usuario en base a su id, **sólo lo puede realizar un administrador**

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario admin, sólo los admin podran eliminar cuentas |

#### Params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `usuario id` - *obligatorio* | Es el id del usuario a eliminar | numérico |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando los datos del usuario eliminado con un código de status *200*

```json
{
    "id": "...",
    "usuario": "...",
    "rol": "...",
    "created_at": "...",
    "updated_at": "...",
    ...
}
```

Si algo sale mal, responde con un código de status *400*

---
---
## VISITANTES
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/visitantes/**{artículo id}** `AUTH ADMIN`

Retorna los usuarios que han visitado un artículo en específico, esto sólo lo puede visualizar un ADMIN, por lo tanto, se debe suministrar el token de sesión para validar que el usuario sea un ADMIN y el ID del artículo al cual se le quieren ver sus visitantes

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `artículo id` - *obligatorio* | Es el id del artículo a listar sus visitantes | numérico |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando un arreglo de Usuarios que han visitado el artículo juento con un código de status *200*

Si desean saber el número de visitas como un valor entero, háganlo desde el Frontend usando **length** 

```json
[
    {
        "id": "...",
        "usuario": "...",
        "nombre": "...",
        "apellido": "...",
        "cédúla": "...",
        "rol": "...",
        "nivel": "...",
        "facultad": "...",
        "carrera": "...",
        ...
    },
    ...
]
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/visitantes/**{artículo id}** `AUTH`

Registra en la base de datos, la visita de un usuario a un artículo del museo, esta acción sólo la puede realizar un usuario con una sesión activa, por lo tanto, se debe suministrar el token de sesión en un header y el id del artículo que visito en el path del endpoint

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `artículo id` - *obligatorio* | Es el id del artículo a realizarle una visita | numérico |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando el nuevo registro de visita en la base de datos junto con un código de status *201*

Si desean saber el número de visitas como un valor entero, háganlo desde el Frontend usando **length** 

```json
{
    "id_visitante": "...",
    "id_estudiante": "...",
    "articulo_id": "...",
    "fecha": "...",
}   
```

Si algo sale mal, responde con un código de status *400*

---
---
## ARTICULOS
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/articulos/all

Retorna todos los artículos de la base de datos

#### Query params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `query` - *opcional* | Realizar búsqueda de artículos por su nombre | texto |
| `categoria` - *opcional* | Realizar búsqueda de artículos por su id de categoria | numérico |
| `min` - *opcional* | año mínimo | numérico |
| `max` - *opcional* | año máximo | numérico |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando un arreglo con todos los artículos junto con un código de status *200*

Note que los objetos de tipo artículo que vienen en este arreglo no cuentan con los datos completos, esto se debe a que para listar todos estos artículos no hace falta utilizar todos sus datos y de esa forma no sobre cargamos la respuesta

```json
[
    {
        "id": "...",
        "nombre": "...",
        "categoria_id": "...",
        "created_at": "...",
        "updated_at": "...",
        "fotos": [
            { "id": "...", "url": "x.jpg" },
            { "id": "...", "url": "x.jpg" }
        ]
    },
    ...
]
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px;border-radius: 50px;">GET</span> /api/articulos/**{artículo id}**

Obtener un articulo en específico de la base de datos, a través de su ID

#### Params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `artículo id` - *obligatorio* | Es el id del artículo a buscar | numérico |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando el artículo con todos sus datos junto con un código de status *200*

Acá, al obtener un artículo en específico, si retornamos todos los datos 

```json
{
    "id": "...",
    "nombre": "...",
    "descripcion": "...",
    "categoria_id": "...",
    "created_at": "...",
    "updated_at": "...",
    "fotos": [
        { "id": "...", "url": "x.jpg" },
        { "id": "...", "url": "y.jpg" }
    ],
    "videos": [
        { "id": "...", "url": "x.mp4" }
    ],
    "audios": [
        { "id": "...", "url": "x.mp3" }
    ]
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/articulos `AUTH ADMIN`

Registrar un nuevo artículo en la base de datos, esta acción sólo la puede realizar un administrador, por lo tanto, se debe suministrar un token de sesión para validar que se trate de un administrador 

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Body data (application/json)

| Data | Validaciones |
| ------------ | ------------ |
| `nombre` - *obligatorio* | lenght(min: 2, max: 120) |
| `descripcion` - *obligatorio* | lenght(min: 2, max: 2048) |
| `categoria_id` - *obligatorio* | numérico |
| `ubicacion` - *obligatorio* | lenght(min: 2, max: 255) | 
| `dueno` - *obligatorio* | lenght(min: 2, max: 120) |
| `year` - *obligatorio* | numérico |
| `multimedios` - *opcional* | Es todo el conjunto de Files multimedios, utilizar **input multiple** |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando el nuevo artículo creado junto con un código de status *201*

```json
{
    "id": "...",
    "nombre": "...",
    "descripcion": "...",
    "categoria_id": "...",
    "created_at": "...",
    "updated_at": "...",
    "fotos": [
        { "id": "...", "url": "x.jpg" },
        { "id": "...", "url": "y.jpg" }
    ],
    "videos": [
        { "id": "...", "url": "x.mp4" }
    ],
    "audios": [
        { "id": "...", "url": "x.mp3" }
    ]
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#DAA330; color: white; padding: 2px 5px; border-radius: 50px;">PUT</span> /api/articulos/**{artículo id}** `AUTH ADMIN`

Actualizar un artículo ya existente en la base de datos, esta acción sólo la puede realizar un administrador, por lo tanto, se debe suministrar un token de sesión para validar que se trate de un administrador 

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Body data (application/json)

| Data | Validaciones |
| ------------ | ------------ |
| `nombre` - *opcional* | lenght(min: 2, max: 120) |
| `descripcion` - *opcional* | lenght(min: 2, max: 2048) |
| `categoria_id` - *opcional* | numérico |
| `ubicacion` - *opcional* | lenght(min: 2, max: 255) | 
| `dueno` - *opcional* | lenght(min: 2, max: 120) |
| `year` - *opcional* | numérico |
| `articulosBorrarId` - *opcional* | Array numérico, es un arreglo con los ids de los elementos multimedios del artículo |
| `multimedios` - *opcional* | Es todo el conjunto de Files multimedios, utilizar **input multiple** |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando el artículo ya con sus datos actualizados junto con un código de status *201*

```json
{
    "id": "...",
    "nombre": "...",
    "descripcion": "...",
    "categoria_id": "...",
    "created_at": "...",
    "updated_at": "...",
    "fotos": [
        { "id": "...", "url": "x.jpg" },
        { "id": "...", "url": "y.jpg" }
    ],
    "videos": [
        { "id": "...", "url": "x.mp4" }
    ],
    "audios": [
        { "id": "...", "url": "x.mp3" }
    ]
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#DA4E30; color: white; padding: 2px 5px; border-radius: 50px;">DELETE</span> /api/articulos/**{artículo id}** `AUTH ADMIN`

Permite realizar la eliminación de un artículo de la base de datos, esta acción sólo la puede realizar un administrador, por lo tanto, se debe suministrar un token de sesión para validar que se trate de un administrador

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Params

| Param | Descripción |
| ------------ | ------------ |
| `artículo id` - *obligatorio* | Es el id del artículo a eliminar |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando el artículo eliminado junto con un código de status *200*

```json
{
    "id": "...",
    "nombre": "...",
    "descripcion": "...",
    "categoria_id": "...",
    "created_at": "...",
    "updated_at": "...",
    "fotos": [
        { "id": "...", "url": "x.jpg" },
        { "id": "...", "url": "y.jpg" }
    ],
    "videos": [
        { "id": "...", "url": "x.mp4" }
    ],
    "audios": [
        { "id": "...", "url": "x.mp3" }
    ]
}
```

Si algo sale mal, responde con un código de status *400*

---
---
## COMENTARIOS
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/comentarios/**{artículo id}**

Obtener todos los comentarios de un artículo en base al id del artículo

#### Params

| Param | Descripción |
| ------------ | ------------ |
| `artículo id` - *obligatorio* | Es el id del artículo para obtener sus comentarios |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando un arreglo con los comentarios del artículo *200*

```json
[
    {
        "id": "...",
        "id_estudiante": "...",
        "nombre": "...",
        "apellido": "...",
        "foto": "...",
        "comentario": "...",
        "articulo_id": "..."
    },
    ...
]
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/comentarios/**{artículo id}** `AUTH ESTUD`

Agregar un comentario a un artículo en base a su id

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Params

| Param | Descripción |
| ------------ | ------------ |
| `artículo id` - *obligatorio* | Es el id del artículo para agregarle un nuevo comentario |

#### Body data (application/json)

| Data | Validaciones |
| ------------ | ------------ |
| `comentario` - *opcional* | lenght(min: 2, max: 150) |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando el nuevo comentario del artículo *200*

```json
{
    "id": "...",
    "id_estudiante": "...",
    "nombre": "...",
    "apellido": "...",
    "foto": "...",
    "comentario": "...",
    "articulo_id": "..."
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#DA4E30; color: white; padding: 2px 5px; border-radius: 50px;">DELETE</span> /api/comentarios/**{comentario id}** `AUTH ESTUD`

Permite realizar la eliminación de un comentario

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Params

| Param | Descripción |
| ------------ | ------------ |
| `comentario id` - *obligatorio* | Es el id del comentario para eliminarlo |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando el comentario eliminado con un código *200*

```json
{
    "id": "...",
    "id_estudiante": "...",
    "nombre": "...",
    "apellido": "...",
    "foto": "...",
    "comentario": "...",
    "articulo_id": "..."
}
```

Si algo sale mal, responde con un código de status *400*

---
---
## ARTICULOS
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/participantes/all

Obtener todos los participantes de del proyecto

#### Query params

| Param | Descripción | Validaciones |
| ------------ | ------------ | ------------ |
| `departamento` - *opcional* | filtrar por departamento ('API', 'BD', 'APP', 'WEB', 'QA') | texto |

#### Ejemplo de respuesta (application/json)

```json
[
    {
        "id_participante": 1,
        "nombre": "Flavio",
        "apellido": "Sánchez",
        "foto": null,
        "departamento": "API",
        "rol": "LIDER"
    },
    ...
]
```