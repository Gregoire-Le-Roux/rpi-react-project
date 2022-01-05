import { useState } from "react";
import { addAuthor } from '../../api/Author';

function AuthorForm(props) {
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
        let newAuthors = [...props.authors, newAuthor];
        props.setauthors(newAuthors);
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

export default AuthorForm;