// script formulario
document.getElementById('formulario').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const ciudad = document.getElementById('ciudad').value;
    
    // enviar datos al  servidor
    try {
        const respuesta = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                edad: edad,
                ciudad: ciudad
            })
        });
        
        const resultado = await respuesta.text();
        document.getElementById('mensaje').innerHTML = resultado;
        
        // limpiar formulario
        document.getElementById('formulario').reset();
        
    } catch (error) {
        document.getElementById('mensaje').innerHTML = 'Error: ' + error;
    }
});