import { Modal, Button } from 'react-bootstrap';


function ModalDeleteAuthor(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Êtes-vous sûr de vouloir supprimer l'auteur {props.author !== undefined ? props.author.firstname + " " + props.author.name : "aucun auteur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <Button onClick={() => {props.deleteauthor(props.author.id, props.authorindex); props.onHide();}} variant="danger">Supprimer</Button>
                <Button onClick={() => props.onHide() }>Annuler</Button>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

export default ModalDeleteAuthor;