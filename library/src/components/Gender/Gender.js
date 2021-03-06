import { GenderForm } from "./Form";
import { useEffect, useState } from "react";
import { fetchGenders, addGender, deleteGender, updateGender } from '../../api/Gender';
import ModalModifyGender from "./ModalModifyGender";
import ModalDeleteGender from "./ModalDeleteGender";
import { Table, Button } from 'react-bootstrap';

function Gender(props) {
    const [genders, setGenders] = useState([]);
    const [gender, setGender] = useState("");
    const [genderIndex, setGenderIndex] = useState();
    const [modalShowModifyGender, setModalShowModifyGender] = useState(false);
    const [modalShowDeleteGender, setModalShowDeleteGender] = useState(false);

    //useEffect s'execute à chaque rechargement de page
    useEffect( async () => {
        /*Dans le useEffect on ne peut pas directement faire de l'asynchrone, il est conseillé par React de définir
        une fonction asynchrone et de l'appeler directement*/
        async function fetchData () {
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

    const onAddGender = async (gender) => {
        const res = await addGender(gender);
        let id = res.data
        let newGender = {
            id: id,
            name: gender
        }
        let listGenders = [...genders];
        listGenders.push(newGender);
        setGenders(listGenders);
    }

    const genderUpdate = (gender) => {
    
        updateGender(gender);
        let listGenders = [...genders];
        const index = listGenders.findIndex((gend) => gend.id === gender.id);
        listGenders[index] = gender;
        setGenders(listGenders);

    };

    const openModalModifyGender = (gender) => {
        setGender(gender);
        setModalShowModifyGender(true);
    }

    const openModalDeleteGender = (gender, index) => {
        setGender(gender);
        setGenderIndex(index);
        setModalShowDeleteGender(true);
    }

    return (
        <>
            <div>
                <GenderForm updategenders={onAddGender} ></GenderForm>
                <Table>
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
                                        <td><Button variant='warning' onClick={() => openModalModifyGender(gender) }>Modifier</Button></td>
                                        <td><Button variant='danger' onClick={() => openModalDeleteGender(gender, index) }>Supprimer</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
            </div>

            <ModalModifyGender
                show={modalShowModifyGender}
                onHide={() => setModalShowModifyGender(false)}
                genderupdate={genderUpdate}
                gender={gender}
            />

            <ModalDeleteGender
                show={modalShowDeleteGender}
                onHide={() => setModalShowDeleteGender(false)}
                gender={gender}
                genderindex={genderIndex}
                deletegender={DeleteGender}
            />
        </>
    );
}

export default Gender;