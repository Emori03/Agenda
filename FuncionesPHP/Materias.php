<?php
require_once 'conexion.php';

try {
    // Consulta para obtener todas las materias
    $stmt = $pdo->query('SELECT MateriaId, NombreMateria, ProfesorMateria, TareasMateria, AbreviacionMateria FROM materias');
    $materias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    echo json_encode($materias);
} catch (PDOException $e) {
    // Manejar errores de conexión o consulta
    echo "Error de conexión: " . $e->getMessage();
}
?>
