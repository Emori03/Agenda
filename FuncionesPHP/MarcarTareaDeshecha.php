<?php
session_start();
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tarea = $_POST['TareaId'];

    try {
        // Consulta para obtener todas las materias
        $sql = 'UPDATE relaciontareausuario SET Estado = 0 WHERE TareaId = :tareaId AND UsuarioId = :usuarioId';
        $statement = $pdo->prepare($sql);
        $statement->bindParam(':tareaId', $tarea);
        $statement->bindParam(':usuarioId', $_SESSION['ID']);
        $statement->execute();

        echo('Datos actualizados');
    } catch (PDOException $e) {
        // Manejar errores de conexión o consulta
        echo "Error de conexión: " . $e->getMessage();
    }
} else {
    // Si no es una solicitud POST, responde con un mensaje de error
    header('HTTP/1.1 405 Method Not Allowed');
    echo 'Método no permitido';
}
?>