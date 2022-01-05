import { Modal, Button } from 'react-bootstrap';
import { ModifyAuthorForm } from './Form';


function ModalModifyAuthor(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier l'auteur {props.author !== undefined ? props.author.firstname + " " + props.author.name : "aucun"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModifyAuthorForm onHide={props.onHide} author={props.author} updateauthors={props.updateauthors}></ModifyAuthorForm>          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalModifyAuthor;