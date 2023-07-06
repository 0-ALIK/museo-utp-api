const { request, response } = require('express');
const conecction = require('../config/connection');
const querys = require('../helpers/consultas-helper');

const populateArticulosFotos = async (result) => {
    const resultado = await Promise.all(result.map(async (articulo) => {
        const [resultMultimedio, metadata2] = await conecction.query(querys.getArticuloFotos, [articulo.id]);
        const articuloMultimedio = {...articulo, fotos: []}
        resultMultimedio.map(articuloMul => articuloMultimedio.fotos.push({
            id: articuloMul.id_multimedio, 
            url: articuloMul.url, 
            tipo: articuloMul.tipo
        }))
        return articuloMultimedio;
    }));

    return resultado;
}

const populateArticuloMultimedios = async (result) => {
    const [resultMultimedio, metadata2] = await conecction.query(querys.getArticuloByIdMultimedios, [result[0].id]);
    const articulo = {...result, fotos: [], videos: [], audios: []}
    resultMultimedio.map(articuloMul => { 
       if(articuloMul.tipo === 'imagen') articulo.fotos.push(articuloMul)
       if(articuloMul.tipo === 'video') articulo.videos.push(articuloMul)
       if(articuloMul.tipo === 'audio') articulo.audios.push(articuloMul)
    }) 
    return articulo;
}

module.exports = {
    populateArticulosFotos,
    populateArticuloMultimedios
};