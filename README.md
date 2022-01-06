# Gestion de livres d'une bibliothèque
Fait par Grégoire, Nicolas et Yohann

Notre projet consiste à gérer les livres, les genres et les auteurs.
Nous utilisons une API PHP native et un serveur MySQL (très simple) faites par Nicolas.
(API en ligne restera en ligne)

## Livre, auteur
<ul>
    <li>Lister</li>
    <li>Ajouter</li>
    <li>Modifier</li>
    <li>Supprimer</li>
<ul>

## Genre
<ul>
    <li>Lister</li>
    <li>Ajouter</li>
    <li>Modifier</li>
<ul>

# Hook custom form (useForm)
installation: npm i react-hook-form
Récupère les données d'un formulaire sous forme de JSON.
Les fonctions qui ont été utilisé dans le projet ci-dessous sont propres au hook.

## register (liste clé / valeur)
defini une association clé / valeur dans l'input, select

## handleSubmit
construction du JSON en fonction de register au moment où l'évènement submit est declanché

## reset
Initialise les valeurs par defaut. 
Pour ne pas avoir de donnée vide (alors que l'input a une valeur par defaut) lors de la recup du form.

# React Bootstrap (framework CSS)
Installation npm i react-bootstrap bootstrap@5.1.3
Nous utilisons en grande partie react-bootstrap qui est mieu adapté à react.

# Router
Installation npm i react-router-dom
Sert à "naviguer" sur le site
A definir dans App.js

``` HTML
<Routes>
    <Route path="auteur" element={<Author />} />
</Routes>
```
balise Routes => contient toutes les balises Route
path => nom de la route a mettre dans URL 

<ul>
    <li>path="/" => route par defaut</li>
    <li>path="*" => route qui n'est pas defini (à placer à la fin des Route)</li>
</ul>

element => nom du component à afficher