<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Livre.php';

    $diag = new Livre();

    $liste = $diag->ListerLivre();

    echo json_encode($liste);
?>