import { useState } from "react";
import { addAuthor, modifyAuthor } from '../../api/Author';

export function AddAuthorForm(props) {
    const [author, setAuthor] = useState({
        name: "",
        firstname: "",
        dateOfBirth: "",
      })
    
    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setAuthor(author => ({
            ...author,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {        
        e.preventDefault();

        const res = await addAuthor(author);
        let id = res.data
        let newAuthor = {
            id: id,
            name: author.name,
            firstname: author.firstname,
            dateOfBirth: author.dateOfBirth,
            nbBook: "0",
        }
        props.updateauthors(newAuthor);
        props.onHide();
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Prénom:
                        <input type="text" name="firstname" value={author.title} onChange={handleChange} required></input>
                    </label>
                </div>
                <div>
                    <label>
                        Nom:
                        <input type="text" name="name" value={author.description} onChange={handleChange} required></input>
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
        setAuthor(author => ({
            ...author,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {        
        e.preventDefault();

        modifyAuthor(author);
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