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

export const fetchBooksAuthor = async (authorId) => {
    let id = JSON.stringify(authorId);
    return new Promise((resolve, reject) => {
        axios.post(api_book + "/getLivreAuteur.php", id)
            .then(res => {
                resolve(res);
            });
    })
}