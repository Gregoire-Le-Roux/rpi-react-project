import { useState, useEffect } from 'react';
import moment from 'moment'
import { fetchAuthors } from '../../api/Author';
import ModalAuthorBooks from './ModalAuthorBooks';
import ModalAddAuthor from './ModalAddAuthor';

  
function Author() {
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState();
    const [modalShowAuthorBook, setModalShowAuthorBook] = useState(false);
    const [modalShowAddAuthor, setModalShowAddAuthor] = useState(false);

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

    // console.log(authors)

    const openModalAddAuthor = () => {
        setModalShowAddAuthor(true);
    }

    const openModalAuthorBook = (author) => {
        setAuthor(author);
        setModalShowAuthorBook(true);
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
                            authors.map(author => (
                                <tr key={author.id}>
                                    <td>{author.name}</td>
                                    <td>{author.firstname}</td>
                                    <td>{moment(author.dateOfBirth).format("DD/MM/YYYY")}</td>
                                    <td><button onClick={() => openModalAuthorBook(author)}>Voir ({author.nbBook})</button></td>
                                    <td><button style={{backgroundColor: "#33cc33"}}>Modifier</button></td>
                                    <td><button style={{backgroundColor: "#cc0000"}}>Supprimer</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            
            <ModalAuthorBooks
                show={modalShowAuthorBook}
                onHide={() => setModalShowAuthorBook(false)}
                author={author}
            />

            <ModalAddAuthor
                show={modalShowAddAuthor}
                onHide={() => setModalShowAddAuthor(false)}
                authors={authors}
                setauthors={setAuthors}
            />
        </>
    );
}

export default Author;