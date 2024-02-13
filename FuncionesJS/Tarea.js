// Funcion para validar y enviar el formulario
$(document).ready(function () {
    $("#tareaForm").submit(function (event) {
        event.preventDefault();

        var materia = $("#materia").val();
        var tarea = $("#tarea").val();
        var tipo = $("#tipo").val();
        var fecha = $("#fecha").val();
        var descripcion = $("#descripcion").val();

        var fechaSeleccionada = new Date(fecha);
        var fechaActual = new Date();

        if (materia == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Te falta poner la materia!",
            });
        } else if (tarea == '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Te falta poner el nombre de la tarea!",
            });
        } else if (tipo == 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Te falta el tipo de la tarea!",
            });
        } else if (descripcion == '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Te falta un descripcion!",
            });
        } else if (fechaSeleccionada <= fechaActual) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡La fecha no puede ser del pasado!",
            });
        } else{
            $.ajax({
                type: "POST",
                url: "./FuncionesPHP/Tarea.php",
                data: {
                    materia: materia,
                    tarea: tarea,
                    tipo: tipo,
                    fecha: fecha,
                    descripcion: descripcion
                },
                success: function (response) {
                    console.log(response);
                    cerrarModal();
                },
                error: function (error) {
                    console.log("Error en la solicitud AJAX: ", error);
                }
            });
        }
    });
});