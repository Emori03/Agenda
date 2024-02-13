<?php
    require_once './FuncionesPHP/conexion.php';

    $materia = 2;
    $tarea = 'Ejemplo 15';
    $tipo = 1;
    $fecha = '2024-02-02';
    $descripcion = 'Descripcion+larga+para+ver+el+comportamiento+de+las+cosas';

        try {
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

            $sqlTerciario = "INSERT INTO relaciontareausuario(UsuarioId, TareaId, Estado) SELECT UsuarioId = UsuarioId, :tareaId, 0 FROM usuarios;";
            $statementTerciario = $pdo->prepare($sqlTerciario);
            $statementTerciario->bindParam(':tareaId', $tareaId);
            $statementTerciario->execute();
            
            echo "Datos insertados correctamente";
        } catch (PDOException $e) {
            die("Error al insertar en la base de datos: " . $e->getMessage());
        }
?>