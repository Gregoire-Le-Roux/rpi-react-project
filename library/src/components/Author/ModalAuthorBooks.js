import { useState, useEffect } from 'react';
import { fetchBooksAuthor } from '../../api/Book';
import { Modal, Button } from 'react-bootstrap';


function ModalAuthorBooks(props) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if(props.author !== undefined) {
            fetchData();
        }

        async function fetchData() {
            await fetchBooksAuthor(props.author).then(res => { setBooks(res.data) });
        }

    }, [props.author])

    console.log(books);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Liste des livres écrits par {props.author !== undefined ? props.author.firstname + " " + props.author.name : "aucun auteur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {books.map((book, index) => (
                <div key={index}>
                    <h4>{book.title}</h4>
                    <p>
                        Date de sortie : {book.releaseDate}
                    </p>
                    <p>
                        Nombre de pages : {book.nbPage}
                    </p>
                    <p>
                        Genres : {book.listeGenre.map((genre, index) => {
                            return (
                                index !== 1 ? genre.name : ", " + genre.name                                
                            )
                        })}
                    </p>
                </div>
            ))}
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalAuthorBooks;