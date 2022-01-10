import { Modal, Button } from 'react-bootstrap';


function ModalDeleteGender(props) {
  console.log(props)
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Êtes-vous sûr de vouloir supprimer le genre : {props.gender !== undefined ? props.gender.name : "aucun genre"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <Button onClick={() => {props.deletegender(props.gender.id, props.genderindex); props.onHide();}} variant="danger">Supprimer</Button>{' '}
                <Button onClick={() => props.onHide() }>Annuler</Button>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

export default ModalDeleteGender;