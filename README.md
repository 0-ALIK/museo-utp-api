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

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/auth/login

Iniciar sesión

#### Body data (application/json)

| Data |
| ------------ |
| `usuario` - *obligatorio* |
| `password` - *obligatorio* |

#### Ejemplo de respuesta (application/json)

Si todo sale bien, responde enviando los datos del usuario logueado junto con su token de sesión además de un código de status *200*

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

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/usuarios/all

Obtener todos los usuarios de la base de datos
  
#### Query params

| Param | Descripción |
| ------------ | ------------ |
| `limit` - *opcional* | Especifica el límite de resultados en la respuesta |
| `query` - *opcional* | Hace que sólo hagan match los registros que conicidan con el query de búsqueda |

#### Ejemplo de respuesta (application/json)

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

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px;border-radius: 50px;">GET</span> /api/usuarios/**{usuario id}**

Obtener un usuario en especifico de la base de datos a través de su ID

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

### <span style="background-color:#DA4E30; color: white; padding: 2px 5px; border-radius: 50px;">DELETE</span> /api/usuarios/**{usuario id}** `AUTH`

Elimina un usuario en base a su id, sólo lo puede realizar un administrador

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

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/visitantes/**{articulo id}** `AUTH`

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/visitantes/**{articulo id}** `AUTH`

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px; border-radius: 50px;">GET</span> /api/articulo/all

hola

### <span style="background-color:#30DAA3; color: white; padding: 2px 5px;border-radius: 50px;">GET</span> /api/articulo/**{articulo id}**

hola

### <span style="background-color:#67DA30; color: white; padding: 2px 5px; border-radius: 50px;">POST</span> /api/articulo `AUTH`

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

### <span style="background-color:#DAA330; color: white; padding: 2px 5px; border-radius: 50px;">PUT</span> /api/articulo/**{articulo id}** `AUTH`

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |

### <span style="background-color:#DA4E30; color: white; padding: 2px 5px; border-radius: 50px;">DELETE</span> /api/articulo/**{articulo id}** `AUTH`

#### Headers

| Header | Descripción |
| ------------ | ------------ |
| `x-token` - *obligatorio* | Es el token de sesión de usuario, se requiere para poder tener acceso a ciertos recursos o realizar ciertas acciones |