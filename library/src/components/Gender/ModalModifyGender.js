import { Modal, Button } from 'react-bootstrap';
import { ModifyGenderForm } from './Form';


function ModalModifyGender(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier le genre : {props.gender !== undefined ? props.gender.name : "aucun"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModifyGenderForm onHide={props.onHide} gender={props.gender} genderupdate={props.genderupdate}></ModifyGenderForm>          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalModifyGender;