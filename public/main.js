document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  const mensaje = document.getElementById('mensaje');
  const listaUsuarios = document.getElementById('listaUsuarios');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const ciudad = document.getElementById('ciudad').value;

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, edad, ciudad })
      });

      const data = await res.json();
      mensaje.textContent = data.mensaje || 'Error';
      mensaje.style.color = 'green';

      form.reset();
      cargarUsuarios();
    } catch (err) {
      mensaje.textContent = 'Error al conectar con el servidor';
      mensaje.style.color = 'red';
    }
  });

  async function cargarUsuarios() {
    listaUsuarios.innerHTML = '';

    try {
      const res = await fetch('/api/usuarios');
      const usuarios = await res.json();

      if (usuarios.length === 0) {
        listaUsuarios.textContent = 'No hay usuarios registrados.';
        return;
      }

      const ul = document.createElement('ul');
      usuarios.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `${u.nombre} (${u.edad} años) - ${u.ciudad}`;
        ul.appendChild(li);
      });
      listaUsuarios.appendChild(ul);
    } catch (err) {
      listaUsuarios.textContent = 'Error al cargar los usuarios.';
    }
  }

  cargarUsuarios();
});
