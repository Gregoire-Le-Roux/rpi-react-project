<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Livre.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new Livre();

    $id = $diag->AjouterLivre($json->title, $json->nbPage, $json->releaseDate, $json->idAuteur);
    $diag->AjouterLivreGenre($id, $json->listeGenre);

    echo json_encode($id);
?>