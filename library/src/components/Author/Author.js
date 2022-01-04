import { useState, useEffect } from 'react';
import { fetchAuthors } from '../../api/Author';
import ModalBooks from './ModalBooks';
import moment from 'moment'

  
function Author() {
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState();
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        fetchData();

        async function fetchData() {
            await fetchAuthors().then(res => { setAuthors(res.data) });
        }

    }, [])

    console.log(authors)

    const openModal = (author) => {
        setAuthor(author);
        setModalShow(true);
    }

    return (
        <>
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
                            <th>
                                Modifier
                            </th>
                            <th>
                                Supprimer
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
                                    <td><button onClick={() => openModal(author)}>Voir ({author.nbBook})</button></td>
                                    <td><button style={{backgroundColor: "#33cc33"}}>Modifier</button></td>
                                    <td><button style={{backgroundColor: "#cc0000"}}>Supprimer</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            
            <ModalBooks
                show={modalShow}
                onHide={() => setModalShow(false)}
                author={author}
            />
        </>
    );
}

export default Author;