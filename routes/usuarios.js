const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Modelo Mongoose

// GET /usuarios → listar todos
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Trae todos los usuarios
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

// POST /usuarios → crear nuevo
router.post('/', async (req, res) => {
  const { nombre, edad, ciudad } = req.body;

  // Validación básica
  if (!nombre || !edad || !ciudad) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  const edadNum = parseInt(edad);
  if (isNaN(edadNum) || edadNum <= 0) {
    return res.status(400).json({ mensaje: 'Edad inválida' });
  }

  try {
    const nuevoUsuario = new Usuario({ nombre, edad: edadNum, ciudad });
    const guardado = await nuevoUsuario.save(); // Guarda en MongoDB
    res.status(201).json({ mensaje: 'Usuario guardado', usuario: guardado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar usuario' });
  }
});

module.exports = router;
