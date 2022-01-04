// Axios permet de faire des appels à une api
import axios from 'axios';

const api_gender = process.env.REACT_APP_URL_API + "/genre"

export const fetchGenders = async () => {
    return new Promise((resolve, reject) => {
        axios.get(api_gender + "/getGenre.php")
            .then(res => {
                resolve(res);
            });
    })
}