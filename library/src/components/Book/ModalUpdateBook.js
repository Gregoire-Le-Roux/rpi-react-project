import { Modal, Button } from 'react-bootstrap';
import FormUpdateBook from './formUpdateBook';

function ModalUpdateBook(props)
{

  return(
  <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modification d'un livre
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormUpdateBook book={props.book} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalUpdateBook;