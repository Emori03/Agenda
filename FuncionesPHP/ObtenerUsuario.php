<?php
session_start();

if (isset($_SESSION['Nombre'])) {
    echo $_SESSION['Nombre'];
} else {
    echo 'Variable de sesión no encontrada';
}
?>