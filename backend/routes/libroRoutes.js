const router = require('express').Router();
const c = require('../controllers/libroController');

router.get('/libros', c.obtenerLibros);
router.post('/libros', c.crearLibro);
router.put('/libros/:id', c.actualizarLibro);
router.delete('/libros/:id', c.eliminarLibro);

module.exports = router;