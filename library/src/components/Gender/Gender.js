import GenderForm from "./Form";
import { useEffect, useState } from "react";
import { fetchGenders, deleteGender } from '../../api/Gender';

function Gender() {
    const [genders, setGenders] = useState([]);

    //useEffect s'execute à chaque rechargement de page
    useEffect(() => {
        /*Dans le useEffect on ne peut pas directement faire de l'asynchrone, il est conseillé par React de définir
        une fonction asynchrone et de l'appeler directement*/
        async function fetchData() {
            const res = await fetchGenders(); 
            const data = res.data;
            setGenders(data);
            console.log(data);
        }

        fetchData();
    }, [])

    function DeleteGender(_id, _index) {

        deleteGender({ id: _id }).then( () => {
        
                let listReturn = [...genders];
                listReturn.splice(_index, 1);

                setGenders(listReturn);
        })
        
    }

    const onAddGender = (newGender) => {      
        console.log(newGender);  
        let listGenders = [...genders];
        listGenders.push(newGender);
        setGenders(listGenders);
    }

    return (
        <div>
            <GenderForm updategenders={onAddGender} ></GenderForm>
            <table>
                    <thead>
                        <tr>
                            <th>
                                Nom
                            </th>
                            <th colSpan={2}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            genders.map((gender, index) => (
                                <tr key={gender.id}>
                                    <td>{gender.name}</td>
                                    <td><button onClick={() => console.log("click")} style={{backgroundColor: "#33cc33"}}>Modifier</button></td>
                                    <td><button onClick={() => DeleteGender(gender, index) } style={{backgroundColor: "#cc0000"}}>Supprimer</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    );
}

export default Gender;