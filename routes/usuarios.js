// rutas para usuarios (nivel principiante)
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Apunta al JSON donde guardo los datos
const filePath = path.join(__dirname, '../data/registros.json');

// Cargo registros existentes o creo uno nuevo si no está
let registros = [];
if (fs.existsSync(filePath)) {
  const contenido = fs.readFileSync(filePath, 'utf8');
  registros = contenido ? JSON.parse(contenido) : [];
} else {
  fs.writeFileSync(filePath, JSON.stringify(registros, null, 2));
}

// GET /usuarios → devuelvo listado
router.get('/', (req, res) => {
  res.json(registros);
});

// POST /usuarios → agrego un nuevo registro
router.post('/', (req, res) => {
  const { nombre, edad, ciudad } = req.body;

  // Validación simple
  if (!nombre || !edad || !ciudad) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }
  const edadNum = parseInt(edad, 10);
  if (isNaN(edadNum) || edadNum <= 0) {
    return res.status(400).json({ mensaje: 'Edad inválida' });
  }

  // Agrego al arreglo y guardo
  registros.push({ nombre, edad: edadNum, ciudad });
  fs.writeFileSync(filePath, JSON.stringify(registros, null, 2));

  // Respondo con mensaje
  res.json({ mensaje: 'Usuario registrado con éxito' });
});

module.exports = router;
