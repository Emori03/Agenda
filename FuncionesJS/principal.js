// Funcion del NavBar
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var toggleBtn = document.getElementById('toggleBtn');

    toggleBtn.addEventListener('click', function () {
        if (sidebar.style.width === '100px') {
            sidebar.style.width = '0';
        } else {
            sidebar.style.width = '100px';
        }
    });

    cargarModulo();

});

// Función para cargar el módulo
function cargarModulo() {
    $.ajax({
        type: "GET",
        url: "./Modulos/Tareas.html", // Reemplaza con la URL correcta
        dataType: "html",
        success: function(data) {
            $("#contenido").html(data);
            construirTablaTareas();
        },
        error: function(error) {
            console.error("Error en la solicitud AJAX:", error);
        }
    });
}

// Funcion para cargar modulos
$(document).ready(function () {
    var contentDiv = $('#contenido');

    // Manejar clic en enlace dentro de la lista
    $('#sidebar ul').on('click', 'li a', function (event) {
        event.preventDefault();
        var moduleUrl = $(this).data('modulo');

        if (moduleUrl == './Modulos/Calendario.html') {
            contentDiv.load(moduleUrl, function (response, status, xhr) {
                mostrarCalendario();
                if (status == 'error') {
                    console.log('Error al cargar el módulo:', xhr.status, xhr.statusText);
                }
            });
        } else if (moduleUrl == './Modulos/Materias.html') {
            contentDiv.load(moduleUrl, function (response, status, xhr) {
                construirTablaMaterias();
                if (status == 'error') {
                    console.log('Error al cargar el módulo:', xhr.status, xhr.statusText);
                }
            });
        } else if (moduleUrl == './Modulos/Tareas.html') {
            contentDiv.load(moduleUrl, function (response, status, xhr) {
                construirTablaTareas();
                if (status == 'error') {
                    console.log('Error al cargar el módulo:', xhr.status, xhr.statusText);
                }
            });
        } else {
            // Cargar módulo en el div de contenido
            contentDiv.load(moduleUrl, function (response, status, xhr) {
                if (status == 'error') {
                    console.log('Error al cargar el módulo:', xhr.status, xhr.statusText);
                }
            });
        }
    });

    $.ajax({
        type: 'GET',
        url: './FuncionesPHP/ObtenerUsuario.php',
        success: function(response) {
            console.log('Valor de la variable de sesión:', response);

            document.getElementById("usuario").textContent = response;

        },
        error: function(error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
});

// Funcion para construir la tabla de tareas
function construirTablaTareas() {
    var contenedor = document.getElementById("tareas");
    contenedor.innerHTML = '';

    var tabla = document.createElement("table");
    tabla.style.borderCollapse = "collapse";

    var fila = document.createElement("tr");

    var accion = document.createElement("th");
    accion.style.border = "1px solid black";
    accion.textContent = "Acción";
    fila.appendChild(accion);

    var tarea = document.createElement("th");
    tarea.style.border = "1px solid black";
    tarea.textContent = "Tarea";
    fila.appendChild(tarea);

    var materia = document.createElement("th");
    materia.style.border = "1px solid black";
    materia.textContent = "Materia";
    fila.appendChild(materia);

    var tipo = document.createElement("th");
    tipo.style.border = "1px solid black";
    tipo.textContent = "Tipo";
    fila.appendChild(tipo);

    var descripcion = document.createElement("th");
    descripcion.style.border = "1px solid black";
    descripcion.textContent = "Descripción";
    fila.appendChild(descripcion);

    tabla.appendChild(fila);

    $.ajax({
        type: "GET",
        url: "./FuncionesPHP/Tareas.php", // Reemplaza con la URL correcta
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                fila = document.createElement("tr");
        
                var accion = document.createElement("td");
                accion.style.border = "1px solid black";
                var checkbox = document.createElement("input");
                checkbox.id = data[i].ID;
                checkbox.type = "checkbox";
                if (data[i].Estatus == '0') {
                    checkbox.onclick = function() {
                        marcarTareaHecha(this);
                    };
                    checkbox.checked  = false;
                } else {
                    checkbox.onclick = function() {
                        marcarTareaDeshecha(this);
                    };
                    checkbox.checked  = true;
                }
                accion.appendChild(checkbox);
        
                fila.appendChild(accion);
        
                var tarea = document.createElement("td");
                tarea.style.border = "1px solid black";
                tarea.textContent = data[i].Nombre;
                fila.appendChild(tarea);
        
                var celdaImagen = document.createElement("td");
                celdaImagen.style.border = "1px solid black";
                var imagen = document.createElement("img");
                imagen.src = "./Imagenes/" + data[i].Abreviacion + ".png";
                celdaImagen.appendChild(imagen);
        
                fila.appendChild(celdaImagen);
        
                var tipo = document.createElement("td");
                tipo.style.border = "1px solid black";
                tipo.textContent = data[i].Tipo;
                fila.appendChild(tipo);
        
                var descripcion = document.createElement("td");
                descripcion.style.border = "1px solid black";
                descripcion.textContent = data[i].Descripcion;
                fila.appendChild(descripcion);
        
                tabla.appendChild(fila);
            }
        
            // Añadir la tabla al contenedor
            contenedor.appendChild(tabla);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error en la solicitud AJAX:", textStatus, errorThrown);
        }
    });
}

// Funcion para marcar las tareas
function marcarTareaHecha(IdTarea) {
    var TareaId = IdTarea.id;
    if (TareaId) {
        $.ajax({
            type: "POST",
            url: "./FuncionesPHP/MarcarTareaHecha.php",
            data: {
                TareaId: TareaId
            },
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log("Error en la solicitud AJAX: ", error);
            }
        });
    }
}
function marcarTareaDeshecha(IdTarea) {
    console.log("Elemento: ", TareaId);
    var TareaId = IdTarea.id;
    if (TareaId) {
        $.ajax({
            type: "POST",
            url: "./FuncionesPHP/MarcarTareaDeshecha.php",
            data: {
                TareaId: TareaId
            },
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log("Error en la solicitud AJAX: ", error);
            }
        });
    }
}

// Funcion para construir la tabla de materias
function construirTablaMaterias() {
    var contenedor = document.getElementById("materias");
    contenedor.innerHTML = '';
    
    var tabla = document.createElement("table");
    tabla.style.borderCollapse = "collapse";
    
    var fila = document.createElement("tr");
    
    var img = document.createElement("th");
    img.style.border = "1px solid black";
    img.textContent = "Icono";
    fila.appendChild(img);

    var materia = document.createElement("th");
    materia.style.border = "1px solid black";
    materia.textContent = "Materia";
    fila.appendChild(materia);

    var maestro = document.createElement("th");
    maestro.style.border = "1px solid black";
    maestro.textContent = "Maestro";
    fila.appendChild(maestro);

    var tareas = document.createElement("th");
    tareas.style.border = "1px solid black";
    tareas.textContent = "Tareas";
    fila.appendChild(tareas);

    tabla.appendChild(fila);

    $.ajax({
        type: "GET",
        url: "./FuncionesPHP/Materias.php", // Reemplaza con la URL correcta
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                fila = document.createElement("tr");
    
                var celdaImagen = document.createElement("td");
                celdaImagen.style.border = "1px solid black";
                var imagen = document.createElement("img");
                imagen.src = "./Imagenes/" + data[i].AbreviacionMateria + ".png"; // Reemplaza esto con la ruta correcta de tu imagen
                celdaImagen.appendChild(imagen);
    
                fila.appendChild(celdaImagen);
    
                var materia = document.createElement("td");
                materia.style.border = "1px solid black";
                materia.textContent = data[i].NombreMateria;
                fila.appendChild(materia);
    
                var maestro = document.createElement("td");
                maestro.style.border = "1px solid black";
                maestro.textContent = data[i].ProfesorMateria;
                fila.appendChild(maestro);
    
                var tareas = document.createElement("td");
                tareas.className = "tareasMateria";
                tareas.id = data[i].MateriaId;
                tareas.onclick = function() {
                    abrirModalTareas(this);
                };
                tareas.style.border = "1px solid black";
                tareas.textContent = data[i].TareasMateria;
                fila.appendChild(tareas);
    
                tabla.appendChild(fila);
            }
    
            // Añadir la tabla al contenedor
            contenedor.appendChild(tabla);
        },
        error: function(error) {
            console.error("Error en la solicitud AJAX:", error);
        }
    });
}

// Funcion para construir el calendario
function construirCalendario(Mes) {
    var fechaActual = new Date();
    var año = fechaActual.getFullYear();
    var diaActual = fechaActual.getDate();
    console.log("Dia de hoy: ", diaActual, fechaActual)

    var primerDia = new Date(año, Mes, 1);
    var ultimoDia = new Date(año, Mes + 1, 0);

    var diasEnMes = ultimoDia.getDate();
    var primerDiaSemana = primerDia.getDay(); // 0 = Domingo, 1 = Lunes, ...

    var nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    var calendarioHTML = '<table id="' + Mes + '">';
    // calendarioHTML += '<caption>' + nombreMeses[mes] + '</caption>';
    calendarioHTML += '<button id="anterior" onclick="mesAnterior(' + (Mes - 1) + ')">Anterior</button><caption>' + nombreMeses[Mes] + '</caption><button id="siguiente" onclick="mesSiguiente(' + (Mes + 1) + ')">Siguiente</button>';
    calendarioHTML += '<thead><tr><th>Domingo</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th><th>Sábado</th></tr></thead>';
    calendarioHTML += '<tbody>';

    var contadorDias = 1;

    for (var i = 0; i < 6; i++) {
        calendarioHTML += '<tr>';

        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < primerDiaSemana) {
                calendarioHTML += '<td></td>';
            } else if (contadorDias <= diasEnMes) {
                let diaFormateado = contadorDias < 10 ? '0' + contadorDias : '' + contadorDias;
                let mesFormateado = (Mes + 1) < 10 ? '0' + (Mes + 1) : '' + (Mes + 1);
                if (diaActual == diaFormateado) {
                    calendarioHTML += '<td class="dia hoy" id="' + año + '-' + mesFormateado + '-' + diaFormateado + '" onclick="abrirModalTareas(this)">' + contadorDias + '</td>';
                } else if (diaActual > diaFormateado) {
                    calendarioHTML += '<td class="dia antes" id="' + año + '-' + mesFormateado + '-' + diaFormateado + '">' + contadorDias + '</td>';
                } else if (diaActual < diaFormateado) {
                    calendarioHTML += '<td class="dia despues" id="' + año + '-' + mesFormateado + '-' + diaFormateado + '" onclick="abrirModalTareas(this)">' + contadorDias + '</td>';
                }
                contadorDias++;
            } else {
                calendarioHTML += '<td></td>';
            }
        }

        calendarioHTML += '</tr>';
    }

    calendarioHTML += '</tbody>';
    calendarioHTML += '</table>';

    $('#calendario').html(calendarioHTML);
}
function mostrarCalendario() {
    var fechaActual = new Date();
    var mes = fechaActual.getMonth();
    
    construirCalendario(mes);
    obtenerTareas(mes);
}
// Funcion para mostrar el mes siguiente
function mesAnterior(Mes) {
    if (Mes >= 0 ) {
        construirCalendario(Mes);
        obtenerTareas(Mes);
    }
}
function mesSiguiente(Mes) {
    if (Mes <= 12 ) {
        construirCalendario(Mes);
        obtenerTareas(Mes);
    }
}
// Funcion para cragar las tareas
function obtenerTareas(Mes) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var tareas = JSON.parse(xhr.responseText);
            for (var i = 0; i < tareas.length; i++) {
                var tareasDia = '<br><img id="' + tareas[i].Id + '" src="./Imagenes/' + tareas[i].Abreviacion + '.png" onclick="abrirModalTarea(this)">';
                document.getElementById(tareas[i].Fecha).innerHTML += tareasDia;
              }
        }
    };
    xhr.open("GET", "./FuncionesPHP/Calendario.php?mes=" + (Mes + 1), true);
    xhr.send();
}

// Funcion para abrir modal de la tarea
function abrirModalTareas(elementoId) {
    $("#modalContainer").load("./Modulos/Tarea.html", function () {
        $("#fondoOscuro").fadeIn();
        $("#modal").fadeIn();
        if (/^\d+$/.test(elementoId.id)) {
            $("#materia").val(elementoId.id);
            $("#materia").prop("disabled", true);
        } else if(esFormatoFechaYYMMDD(elementoId.id)) {
            console.log("Entro a la condicion de fecha");
            $("#fecha").val(elementoId.id);
            $("#fecha").prop("disabled", true);
        }
    });
}
function abrirModalLista() {
    $("#modalContainer").load("./Modulos/EliminarTarea.html", function () {
        $("#fondoOscuro").fadeIn();
        $("#modal").fadeIn();

        construirListaTareas();
    });
}
function abrirModalTarea(tarea) {
    event.stopPropagation();
    $("#modalContainer").load("./Modulos/ActualizarTarea.html", function () {
        $("#fondoOscuro").fadeIn();
        $("#modal").fadeIn();

        const TareaId = tarea.id;

        $.ajax({
            type: "GET",
            url: "./FuncionesPHP/ObtenerTarea.php",
            data: {
                TareaId: TareaId
            },
            dataType: "json",
            success: function(data) {
                console.log(data)
                    $("#materia").val(data[0].MateriaId);
                    $("#tarea").val(data[0].NombreTarea);
                    $("#tipo").val(data[0].TipoId);
                    $("#fecha").val(data[0].FechaEntregaTarea);
                    $("#descripcion").val(data[0].Descripcion);
            },
            error: function(error) {
                console.error("Error en la solicitud AJAX:", error);
            }
        });
    });
}

function cerrarModal() {
    $("#fondoOscuro").fadeOut();
    $("#modal").fadeOut();
    if($('#calendario').length) {
        var contenedor = document.getElementById("calendario");

        var tabla = contenedor.querySelector("#table");
        obtenerTareas(tabla.id);
    } else if ($('#materias').length) {
        construirTablaMaterias();
    } else if ($('#tareas').length) {
        construirTablaTareas();
    }
}

function construirListaTareas() {
    var contenedor = document.getElementById("listaTareas");

    var tabla = document.createElement("table");

    var fila = document.createElement("tr");
    fila.className = 'encabezados';

    var accion = document.createElement("th");
    accion.style.border = "1px solid black";
    accion.textContent = "Acción";
    fila.appendChild(accion);

    var tarea = document.createElement("th");
    tarea.style.border = "1px solid black";
    tarea.textContent = "Tarea";
    fila.appendChild(tarea);

    tabla.appendChild(fila);

    $.ajax({
        type: "GET",
        url: "./FuncionesPHP/Tareas.php", // Reemplaza con la URL correcta
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                fila = document.createElement("tr");
        
                var accion = document.createElement("td");
                accion.style.border = "1px solid black";
                var checkbox = document.createElement("input");
                checkbox.className = 'checkEliminar';
                checkbox.id = data[i].ID;
                checkbox.type = "checkbox";
                accion.appendChild(checkbox);
        
                fila.appendChild(accion);
        
                var tarea = document.createElement("td");
                tarea.style.border = "1px solid black";
                tarea.textContent = data[i].Nombre + " - " + data[i].Abreviacion;
                fila.appendChild(tarea);
                
                tabla.appendChild(fila);
            }
        
            // Añadir la tabla al contenedor
            contenedor.appendChild(tabla);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error en la solicitud AJAX:", textStatus, errorThrown);
        }
    });
}

function esFormatoFechaYYMMDD(fecha) {
    console.log("Entro a la condicion");
    // Expresión regular para el formato de fecha yy-mm-dd
    var formatoFechaRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Verificar si la fecha coincide con el formato esperado
    return formatoFechaRegex.test(fecha);
}

function obtenerIds() {
    // Obtener un array de IDs de checkboxes
    var idsCheckboxes = [];
    $('.checkEliminar:checked').each(function() {
        idsCheckboxes.push(this.id);
    });

    $.ajax({
        type: "POST",
        url: "./FuncionesPHP/EliminarTareas.php",
        data: { datosArray: JSON.stringify(idsCheckboxes) },
        success: function(response) {
            console.log(response);
            cerrarModal();
            location.reload();
        },
        error: function(error) {
            console.log("Error en la solicitud AJAX: ", error);
        }
    });
    // Imprimir los IDs en la consola (puedes realizar otras acciones aquí)
    console.log('IDs de checkboxes seleccionados:', idsCheckboxes);
}
function obtenerTarea(TareaId) {
    $.ajax({
        type: "GET",
        url: "./FuncionesPHP/ObtenerTarea.php",
        data: {
            TareaId: TareaId
        },
        dataType: "json",
        success: function(data) {
            return data;
        },
        error: function(error) {
            console.error("Error en la solicitud AJAX:", error);
        }
    });
}