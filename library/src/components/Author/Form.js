import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export function AddAuthorForm(props) {
    const [author, setAuthor] = useState({
        name: "",
        firstname: "",
        dateOfBirth: "",
      })
    
    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        if(name === "name") value = value.toUpperCase();
        else if(name === "firstname") value = value.charAt(0).toUpperCase() + value.slice(1);
        console.log(value);
        setAuthor(author => ({
            ...author,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {        
        e.preventDefault();

        props.updateauthors(author);
        props.onHide();
    }

    return(
        <div>
            <form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Prénom:</Form.Label>
                    <Form.Control type="text" name="firstname" value={author.firstname} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nom:</Form.Label>
                    <Form.Control type="text" name="name" value={author.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Date de naissance:</Form.Label>
                    <Form.Control type="date" name="dateOfBirth" value={author.dateOfBirth} onChange={handleChange} required />
                </Form.Group>

                <Button variant="success" onClick={handleSubmit} >Ajouter</Button>
            </form>
        </div>
    );
}

export function ModifyAuthorForm(props) {
    const [author, setAuthor] = useState(props.author)
    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        if(name === "name") value = value.toUpperCase();
        else if(name === "firstname") value = value.charAt(0).toUpperCase() + value.slice(1);
        setAuthor(author => ({
            ...author,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {        
        e.preventDefault();

        props.updateauthors(author);
        props.onHide();
    }
    return(
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Prénom:</Form.Label>
                    <Form.Control type="text" name="firstname" value={author.firstname} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nom:</Form.Label>
                    <Form.Control type="text" name="name" value={author.name} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Date de naissance:</Form.Label>
                    <Form.Control type="date" name="dateOfBirth" value={author.dateOfBirth} onChange={handleChange} required/>
                </Form.Group>
                <Button variant="success" onClick={handleSubmit}>Modifier</Button>
            </Form>
        </div>
    );
}