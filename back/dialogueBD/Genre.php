<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Genre
{
    public function ListerGenre()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT * FROM genre ORDER BY name";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();

        return $liste;
    }

    public function AjouterGenre($nom)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO genre (name) VALUES (?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom));

        $sql = "SELECT MAX(id) AS id FROM genre";
        $sth = $conn->prepare($sql);
        $sth->execute(array());

        $reponse = $sth->fetchObject();

        return $reponse->id;
    }

    public function SupprimerGenre($id)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM genre WHERE id = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
    }

    public function ModifierGenre($name, $id)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "UPDATE genre SET name = ? WHERE id = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($name, $id));
    }
}