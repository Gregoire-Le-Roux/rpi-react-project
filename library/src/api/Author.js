// Axios permet de faire des appels à une api
import axios from 'axios';

const api_author = process.env.REACT_APP_URL_API + "/auteur"

export const fetchAuthors = async () => {
    return new Promise((resolve, reject) => {
        axios.get(api_author + "/getAuteur.php")
            .then(res => {
                resolve(res);
            });
    })
}