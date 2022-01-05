import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { fetchAuthors } from '../../api/Author';
import { fetchBookAdd } from '../../api/Book';

function ModalAddBook(props)
{
    // hook custom pour recupere les valeur d'un formulaire sous forme de JSON
    // register, handleSubmit => autre nom ne marchera pas
    const { register, handleSubmit } = useForm();
    const [listAuthor, setListAuthor] = useState([]);

    // executer au chargement de la page
    // appel la liste des auteurs
    useEffect(
    () => 
    {
      fetchAuthors().then(res => setListAuthor(res.data))
    }, [])

    function AddBook(_dataForm)
    {
     fetchBookAdd(_dataForm).then(
        (idLivre) =>
        {
          // API renvoie ID du livre ajouté
          // renvoie dans le parent les infos du livres
          let author = listAuthor.find(author => author.id === _dataForm.idAuteur);
          props.postdata2parent(JSON.stringify(_dataForm), author['name'], author.firstname, idLivre);
        }
      )
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

          <form onSubmit={handleSubmit(AddBook)}>
            <label htmlFor="title">Titre</label><br/>
            <input id="title" {...register("title")} type="text" maxLength="200" required />
            <br/><br/>

            <label htmlFor="nbPage">Nombre de pages</label><br/>
            <input id="nbPage" {...register("nbPage")} type="number" min="1" step="1" required />
            <br/><br/>

            <label htmlFor="releaseDate">Année de publication</label><br/>
            <input id="releaseDate" {...register("releaseDate")}  type="number" step="1" required />
            <br/><br/>

            <label htmlFor="idAuthor">Auteur</label><br/>
            <select id="idAuthor" {...register("idAuteur")} required>
              { 
                listAuthor.map(
                  (author, index) => 
                  (
                    <option key={index} value={ author.id }>{ author.name + " " + author.firstname }</option>
                  ))
              }
            </select>

            <button style={{ backgroundColor: "green" }}>Ajouter</button>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ModalAddBook;
