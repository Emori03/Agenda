<?php
require_once 'conexion.php';

$tareaId = $_GET['TareaId'];

try {
    $sql = 'SELECT NombreTarea, MateriaId, TipoId, FechaCreadaTarea, FechaEntregaTarea, Descripcion FROM tareas WHERE TareaId = :tarea';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':tarea', $tareaId);
    $stmt->execute();
    $tarea = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    echo json_encode($tarea);
} catch (PDOException $e) {
    // Manejar errores de conexión o consulta
    echo "Error de conexión: " . $e->getMessage();
}
?>