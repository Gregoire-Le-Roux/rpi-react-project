import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { fetchAuthors } from '../../api/Author';
import { fetchBookUpdate } from '../../api/Book';
import { fetchGenders } from '../../api/Gender';

function FormUpdateBook(props)
{
    // livre a modifier
    const [book, setBook] = useState({title: "", releaseDate: "", nbPage: "", name: "", idAuteur: "", id: "", firstname: "", listeGenre: []});
    
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
        const INDEX = book.listeGenre.findIndex(gender => gender === _idGender)
        return INDEX !== -1;
    }

    function UpdateListGender(_event, _idGender, _index)
    {
        let bookClone = book;
        _event.target.checked === true ? bookClone.listeGenre.push(_idGender) : bookClone.listeGenre.splice(_index, 1);

        setBook(bookClone);
    }

    return (
        <form onSubmit={handleSubmit(UpdateBook)}>

        {/* titre */}
        <label htmlFor="title">Titre</label><br/>
        <input id="title" {...register("title")} type="text" maxLength="200" defaultValue={book.title} required />
        <br/><br/>

        {/* Nombre de pages */}
        <label htmlFor="nbPage">Nombre de pages</label><br/>
        <input id="nbPage" {...register("nbPage")} type="number" min="1" step="1" defaultValue={book.nbPage} required />
        <br/><br/>

        {/* Année de publication */}
        <label htmlFor="releaseDate">Année de publication</label><br/>
        <input id="releaseDate" {...register("releaseDate")}  type="number" step="1" defaultValue={book.releaseDate} required />
        <br/><br/>

        {/* auteur */}
        <label htmlFor="idAuthor">Auteur</label><br/>
        <select id="idAuthor" {...register("idAuteur")} defaultValue={book.idAuteur} required>
          { 
            listAuthor.map(
              (author, index) => 
              (
                <option key={index} value={ author.id }>{ author.name + " " + author.firstname }</option>
              ))
          }
        </select>

        {/* liste des genres */}
        <ul>
          {
            listGender.map(
              (gender, index) =>
            (
              <li key={index}>
                <input defaultChecked={IsInGenderBook(gender.id)} onClick={(event) => UpdateListGender(event, gender.id, index)} id={index} type="checkbox" value={ gender.id } />
                <label htmlFor={index}>{ gender.name }</label>
              </li>
            ))
            
          }
          
        </ul>

        <button style={{ backgroundColor: "green" }}>Mise à jour</button>
      </form>
    )
}

export default FormUpdateBook;
