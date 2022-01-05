// Axios permet de faire des appels à une api
import axios from 'axios';

const api_author = process.env.REACT_APP_URL_API + "/auteur"

export const fetchAuthors = () => {
    return axios.get(api_author + "/getAuteur.php");
}

export const addAuthor = (author) => {
    return axios.post(api_author + "/addAuteur.php", JSON.stringify(author));
}

export const deleteAuthor = async (jsonId) => 
{
    const DATA = JSON.stringify(jsonId);
    return axios.post(api_author + "/deleteAuteur.php", DATA);
}