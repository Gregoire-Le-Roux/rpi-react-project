import { useState, useEffect } from "react";
import { fetchBookDelete, fetchBooks } from "../../api/Book";
import ModalAddBook from './ModalAddBook';

function Book() 
{
    const [listBook, setListBook] = useState([]);
    const [modalShow, setModalShow] = useState(false);

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
        setModalShow(true);
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
            firstname: _firstnameAuthor
        }

        let listAdd = [...listBook];
        listAdd.push(NEW_BOOK);
        setListBook(listAdd);
    }

    return (
        <>
        <div>
            <h1>Liste des livres</h1>

            <button onClick={OpenModal}>Ajouter</button>

            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Pages</th>
                    <th>release year</th>
                    <th>Author</th>
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
                                    <td><button style={{backgroundColor: "#33cc33"}}>Modifier</button></td>
                                    <td> <button onClick={() => DeleteBook(book.id, index) } style={{backgroundColor: "#cc0000"}}>Supprimer</button></td>
                                </tr>
                            ))   
                    }
                    
                </tbody>
            </table>
        </div>

        <ModalAddBook
        show={modalShow}
        onHide={() => setModalShow(false)}
        postdata2parent={UpdateListBook}
        />

        </>
    );
}

export default Book;