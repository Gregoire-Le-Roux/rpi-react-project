import { Modal, Button } from 'react-bootstrap';
import { AddAuthorForm } from './Form';


function ModalAddAuthor(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter un auteur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddAuthorForm onHide={props.onHide} updateauthors={props.updateauthors}></AddAuthorForm>          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalAddAuthor;