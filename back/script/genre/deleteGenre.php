<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Genre.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new Genre();

    $diag->SupprimerGenre($json->id);
?>