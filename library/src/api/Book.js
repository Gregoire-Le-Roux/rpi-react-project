// Axios permet de faire des appels à une api
import axios from 'axios';

const api_book = process.env.REACT_APP_URL_API + "/livre"

export const fetchBooks = async () => 
{
    return axios.get(api_book + "/getLivre.php");
}

export const fetchBooksAuthor = async (author) => 
{
    let id = JSON.stringify({id: author.id});
    return axios.post(api_book + "/getLivreAuteur.php", id);
}

export const fetchBookDelete = async (jsonId) => 
{
    const DATA = JSON.stringify(jsonId);
    return axios.post(api_book + "/deleteLivre.php", DATA);
}

export const fetchBookAdd = async (dataJson) => 
{
    const DATA = JSON.stringify(dataJson);
    return axios.post(api_book + "/addLivre.php", DATA);
}