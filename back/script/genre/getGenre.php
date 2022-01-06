<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Genre.php';

    $diag = new Genre();

    $liste = $diag->ListerGenre();

    echo json_encode($liste);
?>