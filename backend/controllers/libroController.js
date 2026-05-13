const Libro = require('../models/libro');

exports.obtenerLibros = async (req, res) => {
  const data = await Libro.findAll();
  res.json(data);
};

exports.crearLibro = async (req, res) => {
  const libro = await Libro.create(req.body);
  res.status(201).json(libro);
};

exports.actualizarLibro = async (req, res) => {
    try {
        await Libro.update(req.body, {
            where: { id: req.params.id }
        });

        res.json({ mensaje: "actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarLibro = async (req, res) => {
  await Libro.destroy({
    where: { id: req.params.id }
  });
  res.json({ mensaje: "ok" });
};