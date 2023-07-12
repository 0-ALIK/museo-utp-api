const { request, response } = require("express");
const conecction = require("../config/connection");
const querys = require("../helpers/consultas-helper");
const {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} = require("firebase/storage");
const storage = require("../config/fireStorage");

//popula los articulos con sus fotos para el getALL
//result -> articulos
const populateArticulosFotos = async (result) => {
    try {
    //result -> [articulo1, articulo2, articulo3, ...]
  const resultado = await Promise.all(
    //itera sobre todo los articulos
    result.map(async (articulo) => {
        //obtiene las fotos del articulo
      const [resultMultimedio, metadata2] = await conecction.query(
        querys.getArticuloFotos,
        [articulo.id]
      );
      //se agrega el campo foto al articulo y se le asigna un array vacio
      const articuloMultimedio = { ...articulo, fotos: [] };
      //se itera sobre toda las fotos del articulo y se agrega al array fotos del articulo
      resultMultimedio.map((articuloMul) =>
        articuloMultimedio.fotos.push({
          id: articuloMul.id_multimedio,
          url: articuloMul.url,
          tipo: articuloMul.tipo,
        })
      );//se retorna el articulo con sus fotos
      return articuloMultimedio;
    })
  );

  return resultado;
    } catch (error) {
        throw new Error(error);
    }
};

//popula un articulo con sus fotos, videos y audios
const populateArticuloMultimedios = async (result) => {
    try{
    //se obtiene todo sus multimedios
  const [resultMultimedio, metadata2] = await conecction.query(
    querys.getArticuloByIdMultimedios,
    [result[0].id]
  );
    //se agrega el campo fotos, videos y audios al articulo y se le asigna un array vacio
  const articulo = { ...result[0], fotos: [], videos: [], audios: [] };
  //se itera sobre todo los multimedios y se agrega al array correspondiente
  resultMultimedio.map((articuloMul) => {
    if (articuloMul.tipo === "imagen") articulo.fotos.push(articuloMul);
    if (articuloMul.tipo === "video") articulo.videos.push(articuloMul);
    if (articuloMul.tipo === "audio") articulo.audios.push(articuloMul);
  });
  return articulo;
} catch (error) {
    throw new Error(error);
}
};

//recibe los campos de un articulo y lo inserta en la base de datos y retorna el articulo insertado
const insertArticuloAndGetIt = async (nombre, descripcion, categoria_id) => {
    try{
  const [result, metadata] = await conecction.query(querys.insertArticulo, [
    nombre,
    descripcion,
    categoria_id,
  ]);
  const [id, met] = await conecction.query(querys.getInsertedId);
  const [result2, metadata2] = await conecction.query(querys.getArticuloById, [
    id[0].id,
  ]);
  return result2;
} catch (error) {
  throw new Error(error);
}
};

//recibe un array de multimedios y el id del articulo al que pertenecen y los inserta en la base de datos
const uploadMultimedios = async (multimedios, articulo_id) => {
    try{
  return Promise.all(
    multimedios.map(async (multimedio) => {
      let storageRef;
      let tipo;
      // se verifica el tipo de archivo y se asigna el path y su formato correspondiente
      if (
        multimedio.mimetype === "image/jpeg" ||
        multimedio.mimetype === "image/png" ||
        multimedio.mimetype === "image/jpg"
      ) {
        storageRef = ref(storage, `imagenes/${multimedio.name}`);
        tipo = "imagen";
      }
      if (multimedio.mimetype === "video/mp4") {
        storageRef = ref(storage, `videos/${multimedio.name}`);
        tipo = "video";
      }
      if (multimedio.mimetype === "audio/mpeg") {
        storageRef = ref(storage, `audios/${multimedio.name}`);
        tipo = "audio";
      }
      //se sube el archivo al storage en la nube
      const res = await uploadBytes(storageRef, multimedio.data, {
        contentType: multimedio.mimetype,
      });
      //se obtiene la url del archivo subido
      const url = await getDownloadURL(storageRef);
        //se inserta el URL en la base de datos
      const [result, metadata] = await conecction.query(
        querys.insertMultimedio,
        [url, tipo, articulo_id]
      );
    })
  );
} catch (error) {
    throw new Error(error);
}
};

//recibe los campos de un articulo y su id y lo actualiza en la base de datos
const updateArticuloById = async (nombre, descripcion, categoria_id, id) => {
    try {
  const [result, metadata] = await conecction.query(querys.editArticulo, [
    nombre,
    descripcion,
    categoria_id,
    id,
  ]);
  return result;
} catch (error) {
    throw new Error(error);
}
};

//recibe el id de un articulo y borra todos sus multimedios
const borrarMultimedios = async (id) => {
    try{
  const [urls, metadata] = await conecction.query(querys.getMultimediosUrl, [
    id,
  ]);
  urls.map(async (url) => {
    const urlRef = ref(storage, url.url);
    await deleteObject(urlRef);
  });
  await conecction.query(querys.deleteMultimedio, [id]);
} catch (error) {
    throw new Error(error);
}
};

module.exports = {
  populateArticulosFotos,
  populateArticuloMultimedios,
  insertArticuloAndGetIt,
  uploadMultimedios,
  updateArticuloById,
  borrarMultimedios,
};
