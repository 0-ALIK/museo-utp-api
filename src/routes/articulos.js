const { Router } = require('express');
const { getAll, getArticle, deleteArticle, editArticle, createArticle } = require('../controllers/articulos');

const router = Router();

router.get('/all', getAll);

router.post('/', createArticle);
//creo que seria mejor si en vez de mandar get articulos/all para obtener todo
//usaramos get articulos/ ya se sobre entiende que obtenemos articulos con esa peticion
//ademas acortamos un poco el codigo
//  router.get('/all', getAll); router.post('/', createArticle); --> router.route('/').get(getAll)).post('/', createArticle);

//api/articulos/:id
router
.route('/:id')
.get(getArticle)
.put(editArticle)
.delete(deleteArticle);

module.exports = router;