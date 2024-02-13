$(document).ready(function() {
    $("#login-form").submit(function(event) {
        event.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

        if (username == '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Te falto algo!",
              });
        } else if (password == '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Te falto algo!",
              });
        } else {
            $.ajax({
                type: "POST",
                url: "./FuncionesPHP/index.php",
                data: {
                    username: username,
                    password: password
                },
                success: function(response) {
                    console.log(response);
                    window.location.href = "./principal.html";
                },
                error: function(error) {
                    console.log("Error en la solicitud AJAX: ", error);
                }
            });
        }
    });
});
