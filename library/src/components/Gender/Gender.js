import GenderForm from "./Form";
import { useEffect, useState } from "react";
import { fetchGenders, deleteGender, updateGender } from '../../api/Gender';

function Gender(props) {
    const [genders, setGenders] = useState([]);
    const [updateGenders, setUpdateGenders] = useState("");

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

    const clickModify = async () => {
    
        const res = await updateGender(genders);
        let id = res.data
        let renameGender = {
            id: id,
            name: genders.rename
        }
        onAddGender(renameGender);
        let genderInput = document.getElementById("genderRename");
        genderInput.value = ""

    };

    function genderUpdate(e) {
        let value = e.target.value
        setUpdateGenders(value)
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
                                    <td><button onClick={() => DeleteGender(gender.id, index) } style={{backgroundColor: "#cc0000"}}>Supprimer</button></td>
                                    <td><input type="text" id="genderRename" value={gender.rename} onChange={genderUpdate} placeholder="Exemple: Drama à la place de Fantastique" required></input></td>
                                    <td><button onClick={() => clickModify(gender.id, gender.rename) } style={{backgroundColor: "#33cc33"}}>Modifier</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    );
}

export default Gender;