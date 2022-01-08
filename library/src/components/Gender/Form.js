import { useState } from "react";
import { addGender } from "../../api/Gender";
import { Button, Form } from 'react-bootstrap';

function GenderForm (props) {
    const [gender, setGender] = useState("")


    const SubmitClick = async (event) => {
        event.preventDefault();
    
        const res = await addGender(gender);
        let id = res.data
        let newGender = {
            id: id,
            name: gender
        }
        props.updategenders(newGender);
        let genderInput = document.getElementById("genderName");
        genderInput.value = ""

    };

    function genderChange(e) {
        let value = e.target.value
        setGender(value)
    }

    return (
        <form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" id="genderName" value={gender} onChange={genderChange} placeholder="Exemple: Fantastique" required />
            </Form.Group>
            <br />
            <Button type="submit" onClick={SubmitClick} >Ajouter</Button>
        </form>
    );
}
export default GenderForm