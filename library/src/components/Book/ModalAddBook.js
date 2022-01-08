import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { fetchAuthors } from '../../api/Author';
import { fetchBookAdd } from '../../api/Book';
import { fetchGenders } from '../../api/Gender';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';

function ModalAddBook(props)
{
    // hook custom pour recupere les valeur d'un formulaire sous forme de JSON
    // register, handleSubmit => autre nom ne marchera pas
    const { register, handleSubmit } = useForm();
    const [listAuthor, setListAuthor] = useState([]);
    const [listGender, setListGender] = useState([]);
    const [listGender2add, setListGender2add] = useState([]);

    // executer au chargement de la page
    // appel la liste des auteurs
    useEffect(
    () => 
    {
      fetchAuthors().then(res => setListAuthor(res.data))
      fetchGenders().then(res => setListGender(res.data))
    }, [])

    function AddBook(_dataForm)
    {
      // ajout de la liste genre au JSON
      _dataForm.listeGenre = listGender2add

     fetchBookAdd(_dataForm).then(
        (idLivre) =>
        {
          // renvoie dans le parent les infos du livres
          let author = listAuthor.find(author => author.id === _dataForm.idAuteur);
          props.postdata2parent(JSON.stringify(_dataForm), author['name'], author.firstname, idLivre);
        }
      )
    }

    function UpdateListGender2Add(event, _gender, _index)
    {
      let liste = [...listGender2add];

      event.target.checked === true ? liste.push({ id: event.target.value, name: _gender.name }) : liste.splice(_index, 1);
      setListGender2add(liste);
    }

    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajout d'un livre
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form>

            {/* titre */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titre</Form.Label>
              <Form.Control {...register("title")} type="text" maxLength="200" required />
            </Form.Group>

            {/* Nombre de pages */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de pages</Form.Label>
              <Form.Control {...register("nbPage")} type="number" min="1" step="1" required />
            </Form.Group>

            {/* Année de publication */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Année de publication</Form.Label>
              <Form.Control {...register("releaseDate")}  type="number" step="1" required />
            </Form.Group>

            {/* auteur */}
            <Form.Label>Auteur</Form.Label>
            <Form.Select {...register("idAuteur")} required>
            { 
                listAuthor.map(
                  (author, index) => 
                  (
                    <option key={index} value={ author.id }>{ author.name + " " + author.firstname }</option>
                  ))
              }
            </Form.Select>

            {/* liste des genres */}
            <br/>
              <h3>Liste des genres</h3>
            <br/>

            <Row>
              {
                listGender.map(
                  (gender, index) =>
                (
                  <Col xs="12" lg="3" md="4" sm="4" key={index} className="mb-3">
                    <Form.Check label={gender.name} type="checkbox" value={ gender.id } onClick={(event) => UpdateListGender2Add(event, gender, index)} />
                  </Col>
                )) 
              }
            </Row>

            <Button variant="success" onClick={handleSubmit(AddBook)}>Ajouter</Button>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ModalAddBook;
