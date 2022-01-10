// Axios permet de faire des appels à une api
import axios from 'axios';

const api_gender = process.env.REACT_APP_URL_API + "/genre"

export const fetchGenders = async () => {
    return axios.get(api_gender + "/getGenre.php");
}

export const addGender = (gender) => {
    const data = {
        name: gender
    }
    return axios.post(api_gender + "/addGenre.php", JSON.stringify(data));
}

export const updateGender = async (dataJson) => 
{
    const DATA = JSON.stringify(dataJson);
    return axios.post(api_gender + "/putGenre.php", DATA);
}

export const deleteGender = async (jsonId) => 
{
    const DATA = JSON.stringify(jsonId);
    return axios.post(api_gender + "/deleteGenre.php", DATA);
}