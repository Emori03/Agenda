<?php
session_start();
require_once 'conexion.php';

try {
    // Consulta para obtener todas las materias
    $sql = 'SELECT t.TareaId ID, t.NombreTarea Nombre, m.NombreMateria Materia, m.AbreviacionMateria Abreviacion, s.NombreTipo Tipo, t.Descripcion Descripcion, r.Estado Estatus FROM tareas t INNER JOIN materias m ON t.MateriaId = m.MateriaId INNER JOIN relaciontareausuario r ON t.TareaId = r.TareaId AND r.UsuarioId = :usuarioId INNER JOIN tipos s ON t.TipoId = s.TipoId';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':usuarioId', $_SESSION['ID']);
    $stmt->execute();
    $materias = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    echo json_encode($materias);
} catch (PDOException $e) {
    // Manejar errores de conexión o consulta
    echo "Error de conexión: " . $e->getMessage();
}
?>
