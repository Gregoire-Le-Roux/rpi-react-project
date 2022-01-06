<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Livre
{
    public function ListerLivre()
    {
        $listeReturn = array();

        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT l.*, a.name, a.firstname FROM livre l JOIN auteur a ON l.idAuteur = a.id";

        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $listeLivre = $sth->fetchAll();

        foreach ($listeLivre as $ligne)
        {
            $sql = "SELECT id, name
                    FROM livre_genre lg JOIN genre g ON lg.idGenre = g.id
                    WHERE  idLivre = ?";

            $sth = $conn->prepare($sql);
            $sth->execute(array($ligne['id']));
            $listeGenre = $sth->fetchAll();

            array_push($listeReturn, array(
                "id" => $ligne["id"],
                "idAuteur" => $ligne["idAuteur"],
                "name" => $ligne["name"],
                "firstname" => $ligne["firstname"],
                "title" => $ligne["title"],
                "nbPage" => $ligne['nbPage'],
                "releaseDate" => $ligne['releaseDate'],
                "listeGenre" => $listeGenre
            ));
        }

        return $listeReturn;
    }

    public function ListerLivreAuteur($id)
    {
        $listeReturn = array();

        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT * FROM livre WHERE idAuteur = ?";

        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
        $listeLivre = $sth->fetchAll();

        foreach ($listeLivre as $ligne)
        {
            $sql = "SELECT g.name
                FROM livre l
                JOIN livre_genre lg ON l.id = lg.idLivre 
                JOIN genre g ON g.id = lg.idGenre
                WHERE idAuteur = ? AND idLivre = ?";

            $sth = $conn->prepare($sql);
            $sth->execute(array($ligne['idAuteur'], $ligne['id']));
            $listeGenre = $sth->fetchAll();

            array_push($listeReturn, array(
                "title" => $ligne["title"],
                "nbPage" => $ligne['nbPage'],
                "releaseDate" => $ligne['releaseDate'],
                "listeGenre" => $listeGenre
            ));
        }

        return $listeReturn;
    }

    public function AjouterLivre($titre, $nbPage, $anneePublication, $idAuteur)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO livre (title, nbPage, releaseDate, idAuteur) VALUES (?, ?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($titre, $nbPage, $anneePublication, $idAuteur));

        $sql = "SELECT MAX(id) AS id FROM livre";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $reponse = $sth->fetchObject();

        return $reponse->id;
    }

    public function AjouterLivreGenre($idLivre, $listeGenre)
    {
        $conn = ConnexionBDD::getConnexion();

        foreach ($listeGenre as $ligne) 
        {
            $sql = "INSERT INTO livre_genre (idLivre, idGenre) VALUES (?, ?)";
            $sth = $conn->prepare($sql);
            $sth->execute(array($idLivre, $ligne));
        }
    }

    public function ModifierLivre($titre, $nbPage, $anneePublication, $idAuteur, $idLivre, $listeGenre)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "UPDATE livre SET title = ?, nbPage = ?, releaseDate = ?, idAuteur = ? WHERE id = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($titre, $nbPage, $anneePublication, $idAuteur, $idLivre));

        $sql = "DELETE FROM livre_genre WHERE idLivre = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idLivre));

        foreach ($listeGenre as $ligne) 
        {
            $sql = "INSERT INTO livre_genre (idLivre, idGenre) VALUES (?, ?)";
            $sth = $conn->prepare($sql);
            $sth->execute(array($idLivre, $ligne->id));
        }
    }

    public function SupprimerLivre($id)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM livre WHERE id = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
    }
}