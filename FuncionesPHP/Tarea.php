<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $ID = $_POST['tareaId'];
    $materia = $_POST['materia'];
    $tarea = $_POST['tarea'];
    $tipo = $_POST['tipo'];
    $fecha = $_POST['fecha'];
    $descripcion = $_POST['descripcion'];

    try {
        if ($ID != "") {
            $sql = "UPDATE tareas SET NombreTarea=:nombre, MateriaId=:materia, TipoId=:tipo, FechaEntregaTarea=:fechaEntrega, Descripcion=:descripcion WHERE TareaId=:tareaId";
            $statement = $pdo->prepare($sql);
            $statement->bindParam(':tareaId', $ID);
            $statement->bindParam(':nombre', $tarea);
            $statement->bindParam(':materia', $materia);
            $statement->bindParam(':tipo', $tipo);
            $statement->bindParam(':fechaEntrega', $fecha);
            $statement->bindParam(':descripcion', $descripcion);
            $statement->execute();
            $tareaId = $pdo->lastInsertId();
            echo "Datos actualizados correctamente";
        } else {
            $sql = "INSERT INTO tareas (NombreTarea, MateriaId, TipoId, FechaEntregaTarea, Descripcion)
            VALUES (:nombre, :materia, :tipo, :fechaEntrega, :descripcion)";
            $statement = $pdo->prepare($sql);
            $statement->bindParam(':nombre', $tarea);
            $statement->bindParam(':materia', $materia);
            $statement->bindParam(':tipo', $tipo);
            $statement->bindParam(':fechaEntrega', $fecha);
            $statement->bindParam(':descripcion', $descripcion);
            $statement->execute();
            $tareaId = $pdo->lastInsertId();
    
            $sqlSecundario = "UPDATE materias SET TareasMateria = (TareasMateria + 1) WHERE MateriaID = :materia";
            $statementSecundario = $pdo->prepare($sqlSecundario);
            $statementSecundario->bindParam(':materia', $materia);
            $statementSecundario->execute();
    
            $sqlTerciario = "INSERT INTO relaciontareausuario(UsuarioId, TareaId, Estado) SELECT UsuarioId, :tareaId, 0 FROM usuarios;";
            $statementTerciario = $pdo->prepare($sqlTerciario);
            $statementTerciario->bindParam(':tareaId', $tareaId);
            $statementTerciario->execute();
            echo "Datos insertados correctamente";
        }
            
    } catch (PDOException $e) {
        die("Error al insertar en la base de datos: " . $e->getMessage());
    }
} else {
    // Si no es una solicitud POST, responde con un mensaje de error
    header('HTTP/1.1 405 Method Not Allowed');
    echo 'Método no permitido';
}
?>