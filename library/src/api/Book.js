// Axios permet de faire des appels à une api
import axios from 'axios';

const api_book = process.env.REACT_APP_URL_API + "/livre"

export const fetchBooks = async () => {
    return new Promise((resolve, reject) => {
        axios.get(api_book + "/getLivre.php")
            .then(res => {
                resolve(res);
            });
    })
}

export const fetchBooksAuthor = async () => {
    return new Promise((resolve, reject) => {
        axios.get(api_book + "/getLivreAuteur.php")
            .then(res => {
                resolve(res);
            });
    })
}