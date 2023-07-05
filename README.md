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
- Otros paquetes y librerías

## Documentación

* [Login](#login-autenticación)
* [Usuarios](#usuarios)
* [Carreras y facultades](#facultades-y-carreras)
* [Visitas](#visitantes)
* [Artículos](#articulos)


## LOGIN (Autenticación)
---
---

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/auth/login

Iniciar sesión, Mantener sesiones será importante para un usuario ya que esto permitirá tener un registro de los artículos que ha visitado 

Será incluso más útil para los administradores ya que en la **web administrativa** habrá aún más funcionalidades que requerirán de autenticación 

#### Body data (application/json)

| Data |
| ------------ |
| `nombre_usuario` - *obligatorio* |
| `password` - *obligatorio* |

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
---
## FACULTADES Y CARRERAS    
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/facultades/all

Obtener todas las facultades

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

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/carreras/all

Obtener todas las facultades

#### Ejemplo de respuesta (application/json)

```json
[
    {
        "id": "...",
        "nombre": "...",
        "facultad_id": "..."
    },
    ...
]
```

---
---
## USUARIOS
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/usuarios/all

Obtener todos los usuarios de la base de datos
  
#### Query params

| Param | Descripción |
| ------------ | ------------ |
| `limit` - *opcional* | Especifica el límite de resultados en la respuesta |
| `page` - *opcional* | Para la paginación |
| `query` - *opcional* | Hace que sólo hagan match los registros que conicidan con el query de búsqueda |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde con un arreglo de usuarios de tipo ESTUD junto con un código de status **200**

```json
{
    "cantidad": "...",
    "usuarios": [
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
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px;border-radius: 50px;">GET</span> /api/usuarios/**{usuario id}**

Obtener un usuario en específico de la base de datos a través de su ID

#### Params

| Param | Descripción |
| ------------ | ------------ |
| `usuario id` - *obligatorio* | Es el id del usuario a buscar |

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

| Data |
| ------------ |
| `usuario` - *obligatorio* |
| `password` - *obligatorio* |
| `nombre` - *obligatorio* |
| `apellido` - *obligatorio* |
| `cedula` - *obligatorio* |
| `nivel` - *obligatorio* |
| `id_facultad` - *obligatorio* |
| `id_carrera` - *obligatorio* |
| `foto` - *opcional* |

Los otros datos como el rol y las fechas son definidos de forma autamatica en el backend

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando los datos del usuario creados con un código de status *201*

**Importante**, el registro de usuario no genera un token de sesión, por lo tanto una vez el usuario se registra debe hacerle iniciar sesión con su cuenta

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

### <span style="background-color:#DAA330; color: white; padding: 2px 5px; border-radius: 50px;">PUT</span> /api/usuarios `AUTH`

Actualiza los datos de un usuario, se hace en base a su token de sesión

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Body data (application/json)

| Data |
| ------------ |
| `usuario` - *opcional* |
| `nombre` - *opcional* |
| `apellido` - *opcional* |
| `cedula` - *opcional* |
| `nivel` - *opcional* |
| `id_facultad` - *opcional* |
| `id_carrera` - *opcional* |
| `foto` - *opcional* |

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
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Params

| Param | Descripción |
| ------------ | ------------ |
| `usuario id` - *obligatorio* | Es el id del usuario a buscar |

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

| Param | Descripción |
| ------------ | ------------ |
| `artículo id` - *obligatorio* | Es el id del artículo a listar sus visitantes |

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
        "created_at": "...",
        "updated_at": "...",
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

| Param | Descripción |
| ------------ | ------------ |
| `artículo id` - *obligatorio* | Es el id del artículo a realizarle una visita |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando el nuevo registro de visita en la base de datos junto con un código de status *201*

Si desean saber el número de visitas como un valor entero, háganlo desde el Frontend usando **length** 

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
## ARTICULOS
---
---

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/artículo/all

Retorna todos los artículos de la base de datos

#### Query params

| Param | Descripción |
| ------------ | ------------ |
| `limit` - *opcional* | Especifica el límite de resultados en la respuesta |
| `page` - *opcional* | Para la paginación |
| `query` - *opcional* | Hace que sólo hagan match los registros que conicidan con el query de búsqueda |

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

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px;border-radius: 50px;">GET</span> /api/artículo/**{artículo id}**

Obtener un articulo en específico de la base de datos, a través de su ID

#### Params

| Param | Descripción |
| ------------ | ------------ |
| `artículo id` - *obligatorio* | Es el id del artículo a buscar |

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

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/artículo `AUTH ADMIN`

Registrar un nuevo artículo en la base de datos, esta acción sólo la puede realizar un administrador, por lo tanto, se debe suministrar un token de sesión para validar que se trate de un administrador 

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Body data (application/json)

| Data |
| ------------ |
| `nombre` - *obligatorio* |
| `descripcion` - *obligatorio* |
| `categoria_id` - *obligatorio* |
| Ademas de todos los archivos multimedios que tendrá este nuevo articulo (imagenes, videos y audios) |

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
        "x.jpg",
        "y.jpg"
    ],
    "videos": [
        "x.mp4"
    ],
    "audios": [
        "x.mp3"
    ]
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#DAA330; color: white; padding: 2px 5px; border-radius: 50px;">PUT</span> /api/artículo/**{artículo id}** `AUTH ADMIN`

Actualizar un artículo ya existente en la base de datos, esta acción sólo la puede realizar un administrador, por lo tanto, se debe suministrar un token de sesión para validar que se trate de un administrador 

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

#### Body data (application/json)

| Data |
| ------------ |
| `nombre` - *opcional* |
| `descripcion` - *opcional* |
| `categoria_id` - *opcional* |
| Ademas de todos los archivos multimedios que tendrá este nuevo articulo (imagenes, videos y audios) |

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
        "x.jpg",
        "y.jpg"
    ],
    "videos": [
        "x.mp4"
    ],
    "audios": [
        "x.mp3"
    ]
}
```

Si algo sale mal, responde con un código de status *400*

---

### <span style="background-color:#DA4E30; color: white; padding: 2px 5px; border-radius: 50px;">DELETE</span> /api/artículo/**{artículo id}** `AUTH ADMIN`

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
        "x.jpg",
        "y.jpg"
    ],
    "videos": [
        "x.mp4"
    ],
    "audios": [
        "x.mp3"
    ]
}
```

Si algo sale mal, responde con un código de status *400*