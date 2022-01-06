CREATE TABLE auteur
(
    id int AUTO_INCREMENT,
    name varchar(200) not null,
     firstname varchar(100) not null,
     dateOfBirth date not null,

     primary key (id)
);

CREATE TABLE livre
(
    id int AUTO_INCREMENT,
    idAuteur int not null,
    title varchar(200) not null,
    nbPage int not null,
    releaseDate varchar(4),

    primary key (id),
    foreign key (idAuteur) references auteur (id) ON DELETE CASCADE
);

CREATE TABLE genre
(
    id int AUTO_INCREMENT,
    name varchar(100),

    primary key (id)
);

CREATE TABLE livre_genre
(
    idLivre int not null,
    idGenre int not null,

    primary key (idLivre, idGenre),
    foreign key (idLivre) references livre (id) ON DELETE CASCADE,
    foreign key (idGenre) references genre (id)
);

INSERT INTO genre (id, name) VALUEs (1, "Sci-fi"), (2, "thriller"), (3, "comics"), (4, "fantastique"), (5, "policier"), (6, "horreur"), (7, "roman");

INSERT INTO auteur (id, name, firstname, dateOfBirth) 
VALUES (1, "King", "Stephane", "1947-09-21"), (2, "Wells", "Herbert George", "1866-09-21"), (3, "Christie", "Agatha", "1890-09-15");

INSERT INTO livre (id, idAuteur, title, nbPage, releaseDate) VALUES 
(1, 2, "La guerre des mondes", 324, "1898"), (2, 1, "La ligne verte", 503, "1996"), (3, 3, "Le crime de l'Orient Express", 224, "1934");

INSERT INTO livre_genre (idLivre, idGenre) VALUES (1, 1), (1, 4), (2, 6), (3, 5), (3, 2);