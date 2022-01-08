import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { fetchAuthors } from '../../api/Author';
import { fetchBookUpdate } from '../../api/Book';
import { fetchGenders } from '../../api/Gender';
import { Form, Button, Row, Col } from 'react-bootstrap';

function FormUpdateBook(props)
{
    // livre a modifier
    const [book, setBook] = useState({id: "", title: "", releaseDate: "", nbPage: "", name: "", idAuteur: "", firstname: "", listeGenre: [{ id: "", naeme: "" }]});
    
    // hook custom pour recupere les valeur d'un formulaire sous forme de JSON
    // register, handleSubmit, reset => autre nom ne marchera pas
    const { register, handleSubmit, reset } = useForm();
    const [listAuthor, setListAuthor] = useState([]);
    const [listGender, setListGender] = useState([]);

    // executer au chargement de la page
    // appel la liste des auteurs et genre
    useEffect(
        () => 
        {
            if(props.book !== undefined)
            {
                setBook(props.book)

                // reset => init les données par defaut. Pour ne pas avoir de donnée vide (alors que l'input a une valeur defaut) lors de la recup du form
                reset(props.book)
                fetchAuthors().then(res => setListAuthor(res.data))
                fetchGenders().then(res => setListGender(res.data))
            }
        }, [])
    
    function UpdateBook(_dataForm)
    {
        _dataForm.listeGenre = book.listeGenre;
        fetchBookUpdate(_dataForm);
    }

    function IsInGenderBook(_idGender)
    {
        const INDEX = book.listeGenre.findIndex(gender => gender.id === _idGender)
        return INDEX !== -1;
    }

    function UpdateListGender(_event, _gender, _index)
    {
        let bookClone = book;
        _event.target.checked === true ? bookClone.listeGenre.push(_gender) : bookClone.listeGenre.splice(_index, 1);

        setBook(bookClone);
    }

    return (
      <form onSubmit={handleSubmit(UpdateBook)}>

        {/* id livre */}
        <input {...register("id")} type="hidden" value={book.id} />

        {/* titre */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Titre</Form.Label>
          <Form.Control {...register("title")} type="text" maxLength="200" defaultValue={book.title} required />
        </Form.Group>

        {/* Nombre de pages */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nombre de pages</Form.Label>
          <Form.Control {...register("nbPage")} type="number" min="1" step="1" defaultValue={book.nbPage} required />
        </Form.Group>

        {/* Année de publication */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Année de publication</Form.Label>
          <Form.Control {...register("releaseDate")}  type="number" step="1" defaultValue={book.releaseDate} required />
        </Form.Group>

        {/* auteur */}
        <Form.Label>Auteur</Form.Label>
        <Form.Select {...register("idAuteur")} defaultValue={book.idAuteur} required>
        { 
            listAuthor.map(
              (author, index) => 
              (
                <option key={index} value={ author.id }>{ author.name + " " + author.firstname }</option>
              ))
          }
        </Form.Select>

          <br/>
          <h3>Liste des genres</h3>
          <br/>
        {/* liste des genres */}
          <Row>
          {
            listGender.map(
              (gender, index) =>
            (
              <Col xs="12" lg="3" md="4" sm="4" key={index} className="mb-3">
                <Form.Check defaultChecked={IsInGenderBook(gender.id)} onClick={(event) => UpdateListGender(event, gender, index)} id={index} type="checkbox" value={ gender.id } label={gender.name} />
              </Col>
            ))
            
          }
          </Row>

        <Button variant="success">Mise à jour</Button>
      </form>
    )
}

export default FormUpdateBook;
