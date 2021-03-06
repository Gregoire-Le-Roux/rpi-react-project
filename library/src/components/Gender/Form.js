import { useState } from "react";
import { Button, Form } from 'react-bootstrap';

export function GenderForm (props) {
    const [gender, setGender] = useState("")


    const SubmitClick = (event) => {
        event.preventDefault();
    
        props.updategenders(gender);
        setGender("");
    };

    function genderChange(e) {
        let value = e.target.value
        value = value.charAt(0).toUpperCase() + value.slice(1);
        setGender(value);
    }

    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" value={gender} onChange={genderChange} placeholder="Exemple: Fantastique" required />
            <br />
            <Button type="submit" onClick={SubmitClick}>Ajouter</Button>
        </Form.Group>
    );
}


export function ModifyGenderForm(props) {
    const [gender, setGender] = useState(props.gender)
    
    const handleChange = (e) => {
        let value = e.target.value;
        value = value.charAt(0).toUpperCase() + value.slice(1);
        let name = e.target.name;
        setGender(gender => ({
            ...gender,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {        
        e.preventDefault();

        props.genderupdate(gender);
        props.onHide();
    }
    return(
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nom:</Form.Label>                        
                    <Form.Control type="text" name="name" value={gender.name} onChange={handleChange} required />
                </Form.Group>
                <Button variant="success" onClick={handleSubmit}>Modifier</Button>
            </Form>
        </div>
    );
}