<?php
require_once 'conexion.php';

try {
    $mes = isset($_GET['mes']) ? $_GET['mes'] : null;

    // Consulta para obtener todas las materias
    $stmt = $pdo->prepare('SELECT t.TareaId Id, m.AbreviacionMateria Abreviacion, t.FechaEntregatarea Fecha FROM tareas t INNER JOIN materias m ON m.MateriaId = t.MateriaId WHERE MONTH(t.FechaEntregatarea) = :mes');
    $stmt->bindParam(':mes', $mes);
    $stmt->execute();
    $materias = array();

    while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $materias[] = $fila;
    }

    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    echo json_encode($materias);
} catch (PDOException $e) {
    // Manejar errores de conexión o consulta
    echo "Error de conexión: " . $e->getMessage();
}
?>