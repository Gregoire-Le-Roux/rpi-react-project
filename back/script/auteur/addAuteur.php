<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Auteur.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new Auteur();

    $id = $diag->AjouterAuteur($json->name, $json->firstname, $json->dateOfBirth);

    echo json_encode($id);
?>