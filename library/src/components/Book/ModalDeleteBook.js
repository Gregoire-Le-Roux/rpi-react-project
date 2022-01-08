import { Modal, Button } from 'react-bootstrap';

function ModalDeleteBook(props) 
{
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Êtes-vous sûr de vouloir supprimer le livre {props.book !== undefined ? props.book.title : " "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <Button onClick={() => {props.postconfirm2parent(props.book.id, props.indexBook); props.onHide();}} variant="danger">Supprimer</Button>{' '}
                <Button onClick={() => props.onHide() }>Annuler</Button>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

export default ModalDeleteBook;