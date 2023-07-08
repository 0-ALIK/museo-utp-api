const { Router } = require('express');
const { getAll, getArticle, deleteArticle, editArticle, createArticle } = require('../controllers/articulos');

const router = Router();

router.get('/all', getAll);

router.post('/', createArticle);

router.get('/:id', getArticle)
router.put('/:id', editArticle)
router.delete('/:id', deleteArticle)

module.exports = router;