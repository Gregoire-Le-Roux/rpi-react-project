import { Modal, Button } from 'react-bootstrap';
import AuthorForm from './Form';


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
          <AuthorForm onHide={props.onHide} updateauthors={props.updateauthors}></AuthorForm>          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalAddAuthor;