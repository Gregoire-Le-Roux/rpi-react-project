<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Auteur.php';

    $diag = new Auteur();

    $liste = $diag->ListerAuteur();

    echo json_encode($liste);
?>