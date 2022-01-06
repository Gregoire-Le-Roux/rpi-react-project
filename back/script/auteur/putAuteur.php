<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Auteur.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new Auteur();

    $diag->ModifierAuteur($json->name, $json->firstname, $json->dateOfBirth, $json->id);
?>