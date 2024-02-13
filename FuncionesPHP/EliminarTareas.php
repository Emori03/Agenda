<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['datosArray'])) {
        // Decodificar el JSON para obtener el array
        $datosArray = json_decode($_POST['datosArray'], true);

        try {
            // Crear un array de marcadores de posición (?)
            $placeholders = implode(',', array_fill(0, count($datosArray), '?'));

            // Construir la consulta SQL
            $sql = "DELETE FROM relaciontareausuario WHERE TareaId  IN ($placeholders)";

            // Preparar la consulta
            $stmt = $pdo->prepare($sql);

            // Asignar valores a los marcadores de posición
            foreach ($datosArray as $key => $id) {
                $stmt->bindValue(($key + 1), $id, PDO::PARAM_INT);
            }

            // Ejecutar la consulta
            $stmt->execute();

            // Construir la consulta SQL
            $sqlSecundario = "DELETE FROM tareas WHERE TareaId  IN ($placeholders)";

            // Preparar la consulta
            $stmtSecundario = $pdo->prepare($sqlSecundario);

            // Asignar valores a los marcadores de posición
            foreach ($datosArray as $key => $id) {
                $stmtSecundario->bindValue(($key + 1), $id, PDO::PARAM_INT);
            }

            // Ejecutar la consulta
            $stmtSecundario->execute();
                
            echo "Datos eliminados correctamente";
        } catch (PDOException $e) {
            die("Error al insertar en la base de datos: " . $e->getMessage());
        }
    } else {
        echo "No se recibió ningún array.";
    }
} else {
    // Si no es una solicitud POST, responde con un mensaje de error
    header('HTTP/1.1 405 Method Not Allowed');
    echo 'Método no permitido';
}
?>