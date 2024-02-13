<?php
require_once 'conexion.php';
session_start();

$usuario = $_POST['username'];
$contrasena = $_POST['password'];

try {
    $sql = "SELECT UsuarioId, NombreUsuario, ContrasenaUsuario FROM usuarios WHERE NombreUsuario = :usuario AND ContrasenaUsuario = :contrasena";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':contrasena', $contrasena);
    $stmt->execute();
    $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if($stmt->rowCount() > 0){
        foreach ($datos as $fila) {
            $_SESSION['ID'] = $fila['UsuarioId'];
            $_SESSION['Nombre'] = $fila['NombreUsuario'];
        }
        echo($_SESSION['ID']);
        echo('true');
    } else {
        echo('false');
    }
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>