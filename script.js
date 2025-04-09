let contadorFilas = 1; // Contador inicial

// Evento delegado para detectar la tecla Enter en los campos de número de serie
document.getElementById('tablaCuerpo').addEventListener('keydown', function(event) {
    if (event.target.name === "ns[]" && event.key === "Enter") {
        event.preventDefault(); // Evita el comportamiento predeterminado de Enter
        agregarFila(); // Agrega una nueva fila
        const filas = document.querySelectorAll('#tablaCuerpo tr');
        const nuevaFila = filas[filas.length - 1]; // Obtiene la última fila creada
        const nuevoCampoNs = nuevaFila.cells[0].querySelector('input'); // Campo de número de serie
        nuevoCampoNs.focus(); // Coloca el cursor en el nuevo campo
    }
});


// Nueva función para solicitar la cantidad de filas a agregar
function solicitarCantidadFilas() {
    const cantidad = prompt("¿Cuántas filas deseas agregar?"); // Cuadro de diálogo para solicitar la cantidad

    if (cantidad !== null && !isNaN(cantidad) && cantidad > 0) {
        agregarVariasFilas(parseInt(cantidad)); // Llama a la función que agrega varias filas
    } else {
        alert("Por favor, ingrese un número válido.");
    }
}

// Nueva función para agregar varias filas según lo especificado por el usuario
function agregarVariasFilas(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        agregarFila(); // Llama a la función que agrega una fila
    }
}

// Modificada función para agregar una sola fila
function agregarFila() {
    const tablaCuerpo = document.getElementById('tablaCuerpo');
    const nuevaFila = document.createElement('tr');

    nuevaFila.innerHTML = `
        <td><input type="text" name="ns[]" ></td>
        <td><input type="text" name="modelo[]" ></td>
        <td><input type="text" name="acce[]" ></td>
        <td><p id="comentarios2" contenteditable="true"></p></td>
        <td><input type="text" name="tipo[]" ></td>
    `;

    tablaCuerpo.appendChild(nuevaFila);
    contadorFilas++; // Incrementa el contador
    actualizarCantidadFilas(); // Actualiza la visualización de cantidad de filas
}

// Función para eliminar una fila
function eliminarFila(boton) {
    const fila = boton.parentElement.parentElement; // Obtiene la fila que contiene el botón
    fila.remove(); // Elimina la fila
    contadorFilas--; // Decrementa el contador
    actualizarCantidadFilas(); // Actualiza la visualización de cantidad de filas
}

// Función para actualizar el contador de filas
function actualizarCantidadFilas() {
    document.getElementById('cantidadFilas').innerText = `Cantidad: ${contadorFilas}`;
}


document.getElementById('fecha').addEventListener('change', function() {
    const fechaSeleccionada = this.value; // Obtiene el valor directamente del input
    const [year, month, day] = fechaSeleccionada.split('-'); // Divide la fecha en año, mes y día
    const folio = `RMA-${year}${month}${day}`; // Generar el folio en formato SMI-YYYYMMDD
    document.getElementById('num-soporte').value = folio; // Asigna el folio al input correspondiente
});

function mostrarInputOtro() {
    const clienteSelect = document.getElementById('cliente');
    const clienteOtroInput = document.getElementById('clienteOtro');

    if (clienteSelect.value === "Otro") {
        clienteOtroInput.style.display = "block"; // Muestra el input
    } else {
        clienteOtroInput.style.display = "none"; // Oculta el input si no es "Otro"
        clienteOtroInput.value = ""; // Limpia el valor del input
    }
}

function mostrarInputOtroNombre() {
    const nombreSelect = document.getElementById('nombre');
    const nombreOtroInput = document.getElementById('nombreOtro');

    if (nombreSelect.value === "Otro") {
        nombreOtroInput.style.display = "block"; // Muestra el input
    } else {
        nombreOtroInput.style.display = "none"; // Oculta el input si no es "Otro"
        nombreOtroInput.value = ""; // Limpia el valor del input
    }
}

function mostrarInputOtroEmail() {
    const emailSelect = document.getElementById('email');
    const emailOtroInput = document.getElementById('emailOtro');

    if (emailSelect.value === "Otro") {
        emailOtroInput.style.display = "block"; // Muestra el input
    } else {
        emailOtroInput.style.display = "none"; // Oculta el input si no es "Otro"
        emailOtroInput.value = ""; // Limpia el valor del input
    }
}

// Evento para manejar el pegado solo en el campo de número de serie
document.getElementById('tablaCuerpo').addEventListener('paste', function(event) {
    const input = event.target; // El input que está recibiendo el pegado
    const esCampoNumeroSerie = input.name === "ns[]"; // Verifica si es el campo de número de serie

    if (esCampoNumeroSerie) {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('Text');
        const filas = pastedData.split('\n').filter(fila => fila.trim() !== ""); // Elimina filas vacías

        // Si estás pegando varias filas, evita sobreescribir otras columnas
        filas.forEach((fila, index) => {
            const datosFila = fila.split('\t'); // Divide la fila por tabuladores
            const numeroSeriePegado = datosFila[0] || ''; // Obtiene solo el número de serie

            // Si ya hay una fila existente, actualiza solo el número de serie
            if (index < tablaCuerpo.children.length) {
                const filaExistente = tablaCuerpo.children[index];
                filaExistente.cells[0].querySelector('input').value = numeroSeriePegado; // Solo modifica el campo ns[]
            } else {
                // Si no hay más filas, agrega una nueva con el número de serie
                agregarFilaConDatos([numeroSeriePegado, '', '']);
            }
        });

        event.preventDefault(); // Evita el comportamiento predeterminado de pegar
    }
});


// Función para limpiar la tabla (eliminar todas las filas)
function limpiarTabla() {
    const tablaCuerpo = document.getElementById('tablaCuerpo');
    while (tablaCuerpo.firstChild) {
        tablaCuerpo.removeChild(tablaCuerpo.firstChild);
    }
    contadorFilas = 0; // Reiniciar el contador de filas
    actualizarCantidadFilas(); // Actualiza la visualización de cantidad de filas
}

// Función para agregar una fila con datos
function agregarFilaConDatos(datos) {
    const tablaCuerpo = document.getElementById('tablaCuerpo');
    const nuevaFila = document.createElement('tr');

    nuevaFila.innerHTML = `
        <td><input type="text" name="ns[]" value="${datos[0] || ''}"></td>
        <td><input type="text" name="modelo[]" value="${datos[1] || ''}"></td>
        <td><input type="text" value="Entrega de equipo" name="descripcion[]"></td>
        <td><button class="eliminar-btn" onclick="eliminarFila(this)">X</button></td>
    `;

    tablaCuerpo.appendChild(nuevaFila);
    contadorFilas++; // Incrementa el contador
    actualizarCantidadFilas(); // Actualiza la visualización de cantidad de filas
}

// Asegúrate de que esta función siga siendo parte del código
function collectData() {
    const data = {
        cliente: document.getElementById('cliente').value,
        atencion: document.getElementById('atencion').value,
        depto: document.getElementById('depto').value,
        email: document.getElementById('email').value,
        tel: document.getElementById('tel').value,
        fecha: document.getElementById('fecha').value,
        numSoporte: document.getElementById('num-soporte').value,
        contacto: document.getElementById('contacto').value,
        productos: []
    };

    // Verificar campos obligatorios (ejemplo)
    if (!data.cliente) {
        alert("El campo 'Cliente' es obligatorio.");
        return; // Detiene la función si la validación falla
    }

    // Recorrer todas las filas de la tabla para obtener los datos
    const filas = document.querySelectorAll('#tablaCuerpo tr');
    filas.forEach(fila => {
        const ns = fila.cells[0].querySelector('input').value;
        const modelo = fila.cells[1].querySelector('input').value;
        const descripcion = fila.cells[2].querySelector('input').value;

        // Validar cada fila de producto (ejemplo)
        if (ns && modelo && descripcion) {
            data.productos.push({ ns, modelo, descripcion });
        } else {
            alert("Por favor, complete todos los campos de producto.");
            return;
        }
    });

    console.log(JSON.stringify(data));  // Aquí puedes enviar o manejar el JSON
}
