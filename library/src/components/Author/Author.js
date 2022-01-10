import { useState, useEffect } from 'react';
import moment from 'moment'
import { fetchAuthors, addAuthor, deleteAuthor, modifyAuthor } from '../../api/Author';
import ModalAuthorBooks from './ModalAuthorBooks';
import ModalAddAuthor from './ModalAddAuthor';
import ModalModifyAuthor from './ModalModifyAuthor';
import ModalDeleteAuthor from './ModalDeleteAuthor';

  
function Author() {
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState();
    const [authorIndex, setAuthorIndex] = useState();
    const [modalShowAddAuthor, setModalShowAddAuthor] = useState(false);
    const [modalShowAuthorBook, setModalShowAuthorBook] = useState(false);
    const [modalShowModifyAuthor, setModalShowModifyAuthor] = useState(false);
    const [modalShowDeleteAuthor, setModalShowDeleteAuthor] = useState(false);

    //On appelle useEffect qu'au chargement de la page pour faire un side effect donc un appel api pour récupérer les 
    //auteurs existants
    useEffect(() => {
        //Dans le useEffect on ne peut pas directement faire de l'asynchrone, il est conseillé par React de définir
        //une fonction asynchrone et de l'appeler directement
        async function fetchData() {
            const res = await fetchAuthors(); 
            const data = res.data;
            setAuthors(data);
        }
        
        fetchData();
    }, [])

    const onAddAuthor = async (author) => {  

        const res = await addAuthor(author);
        let id = res.data
        let newAuthor = {
            id: id,
            name: author.name,
            firstname: author.firstname,
            dateOfBirth: author.dateOfBirth,
            nbBook: "0",
        }
        modifyAuthor(newAuthor);      
        let listAuthors = [...authors, newAuthor];
        listAuthors = sortAuthorsByName(listAuthors);
        setAuthors(listAuthors);
    }

    const onModifyAuthor = (author) => {        
        let listAuthors = [...authors];
        const index = listAuthors.findIndex((auth) => auth.id === author.id);
        listAuthors[index] = author;
        listAuthors = sortAuthorsByName(listAuthors);
        setAuthors(listAuthors);
    }

    const onDeleteAuthor = (id, index) => {
        deleteAuthor({ id: id }).then(() => {
            let listAuthors = [...authors];
            listAuthors.splice(index, 1);
            setAuthors(listAuthors);
        })
    }

    const openModalAddAuthor = () => {
        setModalShowAddAuthor(true);
    }

    const openModalAuthorBook = (author) => {
        setAuthor(author);
        setModalShowAuthorBook(true);
    }

    const openModalModifyAuthor = (author) => {
        setAuthor(author);
        setModalShowModifyAuthor(true);
    }

    const openModalDeleteAuthor = (author, index) => {
        setAuthor(author);
        setAuthorIndex(index);
        setModalShowDeleteAuthor(true);
    }


    const sortAuthorsByName = (authors) => {
        let sortAuthors = authors
        sortAuthors.sort((a, b) => {
            let fa = a.name.toLowerCase();
            let fb = b.name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        return sortAuthors
    }

    return (
        <>
            <button onClick={() => openModalAddAuthor(author)}>Ajouter un auteur</button>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Nom
                            </th>
                            <th>
                                Prénom
                            </th>
                            <th>
                                Date de naissance
                            </th>
                            <th>
                                Livre écrit
                            </th>
                            <th colSpan={2}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            authors.map((author, index) => (
                                <tr key={author.id}>
                                    <td>{author.name}</td>
                                    <td>{author.firstname}</td>
                                    <td>{moment(author.dateOfBirth).format("DD/MM/YYYY")}</td>
                                    <td><button onClick={() => openModalAuthorBook(author)}>Voir ({author.nbBook})</button></td>
                                    <td><button onClick={() => openModalModifyAuthor(author)} style={{backgroundColor: "#33cc33"}}>Modifier</button></td>
                                    <td><button onClick={() => openModalDeleteAuthor(author, index)} style={{backgroundColor: "#cc0000"}}>Supprimer</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            

            <ModalAddAuthor
                show={modalShowAddAuthor}
                onHide={() => setModalShowAddAuthor(false)}
                updateauthors={onAddAuthor}
            />

            <ModalAuthorBooks
                show={modalShowAuthorBook}
                onHide={() => setModalShowAuthorBook(false)}
                author={author}
            />

            <ModalModifyAuthor
                show={modalShowModifyAuthor}
                onHide={() => setModalShowModifyAuthor(false)}
                updateauthors={onModifyAuthor}
                author={author}
            />

            <ModalDeleteAuthor
                show={modalShowDeleteAuthor}
                onHide={() => setModalShowDeleteAuthor(false)}
                author={author}
                authorindex={authorIndex}
                deleteauthor={onDeleteAuthor}
            />
        </>
    );
}

export default Author;