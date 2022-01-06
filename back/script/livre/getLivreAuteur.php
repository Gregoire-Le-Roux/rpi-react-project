<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Livre.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new Livre();

    $liste = $diag->ListerLivreAuteur($json->id);

    echo json_encode($liste);
?>