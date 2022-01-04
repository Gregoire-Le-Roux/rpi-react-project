import { useState, useEffect } from 'react';
import { fetchAuthors } from '../../api/Author';
import { Modal, Button } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
function Author() {
    const [authors, setAuthors] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        fetchData();

        async function fetchData() {
            await fetchAuthors().then(res => { setAuthors(res.data) });
        }

    }, [])

    console.log(authors)

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>
                            Nom
                        </td>
                        <td>
                            Prénom
                        </td>
                        <td>
                            Date de naissance
                        </td>
                        <td>
                            Livres écrits
                        </td>
                        <td>
                            Modifier
                        </td>
                        <td>
                            Supprimer
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors.map(author => (
                            <tr key={author.id}>
                                <td>{author.name}</td>
                                <td>{author.firstname}</td>
                                <td>{author.dateOfBirth}</td>
                                <td><button onClick={() => setModalShow(true)}>Voir ({author.nbBook})</button></td>
                                <td><button style={{background: "#33cc33"}}>Modifier</button></td>
                                <td><button style={{background: "#cc0000"}}>Supprimer</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}

export default Author;