<?php
session_start();

if (isset($_SESSION['Nombre'])) {
    $array = array(
        'Nombre'    => $_SESSION['Nombre'],
        'Id'        => $_SESSION['ID'],
        'Correo'    => $_SESSION['Correo'],
        'Carrera'   => $_SESSION['Carrera'],
        'Grupo'     => $_SESSION['Grupo'],
        'Rango'     => $_SESSION['Rango']
    );
    echo json_encode($array);
} else {
    echo 'Variable de sesión no encontrada';
}
?>