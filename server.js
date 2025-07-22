// servidor express básico
const express = require('express');
const path = require('path');
const app = express();

// Cargo mis rutas de usuarios
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/usuarios', require('./routes/usuarios'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Mi API de usuarios funciona!');
});

// Arranco en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});
