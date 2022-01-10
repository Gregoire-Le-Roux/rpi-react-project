import { useState } from "react";

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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Prénom:
                        <input type="text" name="firstname" value={author.firstname} onChange={handleChange} required></input>
                    </label>
                </div>
                <div>
                    <label>
                        Nom:
                        <input type="text" name="name" value={author.name} onChange={handleChange} required></input>
                    </label>
                </div>
                <div>
                    <label>
                        Date de naissance:
                        <input type="date" name="dateOfBirth" value={author.dateOfBirth} onChange={handleChange} required></input>
                    </label>
                </div>
                <button style={{backgroundColor: "#33cc33"}}>Ajouter</button>
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Prénom:
                        <input type="text" name="firstname" value={author.firstname} onChange={handleChange} required></input>
                    </label>
                </div>
                <div>
                    <label>
                        Nom:
                        <input type="text" name="name" value={author.name} onChange={handleChange} required></input>
                    </label>
                </div>
                <div>
                    <label>
                        Date de naissance:
                        <input type="date" name="dateOfBirth" value={author.dateOfBirth} onChange={handleChange} required></input>
                    </label>
                </div>
                <button style={{backgroundColor: "#33cc33"}}>Modifier</button>
            </form>
        </div>
    );
}