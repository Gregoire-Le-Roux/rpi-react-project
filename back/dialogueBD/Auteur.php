<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Auteur
{
    public function ListerAuteur()
    {
        $listeReturn = array();

        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT * FROM auteur ORDER BY name";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $listeAuteur = $sth->fetchAll();

        foreach ($listeAuteur as $ligne) 
        {
            $sql = "SELECT COUNT(*) AS nombre FROM livre WHERE idAuteur = ?";
            $sth = $conn->prepare($sql);
            $sth->execute(array($ligne['id']));
            $nb = $sth->fetchObject();

            array_push($listeReturn, array(
                "id" => $ligne['id'],
                "name" => $ligne['name'],
                "firstname" => $ligne['firstname'],
                "dateOfBirth" => $ligne['dateOfBirth'],
                "nbBook" => $nb->nombre
            ));
        }

        return $listeReturn;
    }

    public function ModifierAuteur($nom, $prenom, $dateNaissance, $id)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "UPDATE auteur SET name = ?, firstname = ?, dateOfBirth = ? WHERE id = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom, $prenom, $dateNaissance, $id));
    }

    public function AjouterAuteur($nom, $prenom, $dateNaissance)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO auteur (name, firstname, dateOfBirth) VALUES (?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom, $prenom, $dateNaissance));

        $sql = "SELECT MAX(id) AS id FROM auteur";
        $sth = $conn->prepare($sql);
        $sth->execute(array());

        $reponse = $sth->fetchObject();

        return $reponse->id;
    }

    // livres et livre_genre sont supprimer en cascade
    public function SupprimerAuteur($id)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM auteur WHERE id = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
    }
}