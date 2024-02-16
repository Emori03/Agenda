<?php
session_start();
require_once 'conexion.php';

try {
    // Consulta para obtener todas las materias
    $sql = 'SELECT m.MateriaId MateriaId, m.NombreMateria NombreMateria, m.ProfesorMateria ProfesorMateria, m.TareasMateria TareasMateria, m.AbreviacionMateria AbreviacionMateria FROM materias m INNER JOIN grupos g ON m.Cuatrimestre = g.Cuatrimestre AND g.GrupoId = :grupo';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':grupo', $_SESSION['Grupo']);
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
