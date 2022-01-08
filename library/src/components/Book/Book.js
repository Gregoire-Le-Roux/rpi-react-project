import { useState, useEffect } from "react";
import { fetchBookDelete, fetchBooks } from "../../api/Book";
import ModalAddBook from './ModalAddBook';
import ModalUpdateBook from './ModalUpdateBook';
import ModalDeleteBook from "./ModalDeleteBook";
import { Button, Table } from "react-bootstrap";
import style from './Book.module.css';

function Book() 
{
    const [listBook, setListBook] = useState([]);
    const [book2Update, setBook2Update] = useState();
    const [book2Delete, setBook2Delete] = useState();
    const [indexBook2Delete, setIndexBook2Delete] = useState();

    const [modalUpdateShow, setModalUpdateShow] = useState(false);
    const [modalAddShow, setModalAddShow] = useState(false);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);

    // executer au chargement de la page
    // appel les livres
    useEffect(
        () => 
        {
            fetchBooks().then(res => setListBook(res.data))
        }, []);
    
    function DeleteBook(_id, _index)
    {
        fetchBookDelete({ id: _id }).then(
            () => 
            {
                let listReturn = [...listBook];
                listReturn.splice(_index, 1);

                setListBook(listReturn);
            })
    }

    function OpenModal()
    {
        setModalAddShow(true);
    }

    function OpenModalUpdateBook(_book)
    {
        setBook2Update(_book);
        setModalUpdateShow(true);
    }

    function OpenModalDeleteBook(_book, _index)
    {
        setBook2Delete(_book);
        setIndexBook2Delete(_index);
        setModalDeleteShow(true);
    }

    function UpdateListBook(_newBookJsonString, _nameAuthor, _firstnameAuthor, _idLivre)
    {
        let jsonObj = JSON.parse(_newBookJsonString);

        const NEW_BOOK = 
        { 
            id: _idLivre,
            idAuteur: jsonObj.idAuteur,
            title: jsonObj.title, 
            nbPage: jsonObj.nbPage, 
            releaseDate: jsonObj.releaseDate,
            name: _nameAuthor,
            firstname: _firstnameAuthor,
            listeGenre: jsonObj.listeGenre
        }

        let listAdd = [...listBook];
        listAdd.push(NEW_BOOK);
        setListBook(listAdd);
    }

    return (
        <>
        <div className={style.container}>
            <div className={style.middle}>
                <h1>Liste des livres</h1>
                <Button variant="success" onClick={OpenModal}>Ajouter</Button>
            </div>
            <br/>

            <Table striped bordered>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Pages</th>
                    <th>Année de sortie</th>
                    <th>Auteur</th>
                    <th>Genre(s)</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
                </thead>

                <tbody>
                    {
                        listBook.map(
                            (book, index) =>
                            (
                                <tr key={index}>
                                    <td>{ book.title }</td>
                                    <td>{ book.nbPage }</td>
                                    <td>{ book.releaseDate }</td>
                                    <td>{ book.name + " " + book.firstname }</td>
                                    <td>
                                        {
                                            book.listeGenre.map(
                                                (genre, index) =>
                                                {
                                                    return index === 0 ? genre.name : ", " + genre.name
                                                })
                                        }
                                    </td>
                                    <td className={style.middle}>
                                        <Button variant="warning" onClick={() => OpenModalUpdateBook(book)}>
                                            Modifier
                                        </Button>
                                    </td>
                                    <td className={style.middle}>
                                        <Button variant="danger" onClick={() => OpenModalDeleteBook(book, index) }>
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            ))   
                    }
                    
                </tbody>
            </Table>
        </div>

        <ModalAddBook
        show={modalAddShow}
        onHide={() => setModalAddShow(false)}
        postdata2parent={UpdateListBook}
        />

        <ModalUpdateBook
        show={modalUpdateShow}
        onHide={() => setModalUpdateShow(false)}
        book={book2Update}
        />

        <ModalDeleteBook 
        show={modalDeleteShow} 
        onHide={() => setModalDeleteShow(false) } 
        book={book2Delete}
        indexBook={indexBook2Delete}
        postconfirm2parent={DeleteBook}
        />
        </>
    );
}

export default Book;