<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Livre.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new Livre();

    $diag->ModifierLivre($json->title, $json->nbPage, $json->releaseDate, $json->idAuteur, $json->id, $json->listeGenre);
?>